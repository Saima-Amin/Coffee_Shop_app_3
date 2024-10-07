import { ActivityIndicator, FlatList, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './productRow.style';
import { Colors, Sizes } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/useFetch';
import { useNavigation } from '@react-navigation/native';

const ProductRow = () => {
    const { data, isLoading, error } = useFetch();
    const navigation = useNavigation();
    
    const [animatedValues, setAnimatedValues] = useState([]); // State for animated values

    useEffect(() => {
        if (data && data.length) {
            // Initialize animated values for each item after data is fetched
            const initialAnimatedValues = data.map(() => new Animated.Value(0));
            setAnimatedValues(initialAnimatedValues);
            animateItems(initialAnimatedValues);  // Trigger animation
        }
    }, [data]);

    // Function to handle the staggered fade-in animation
    const animateItems = (values) => {
        const animations = values.map((animatedValue, index) => {
            return Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                delay: index * 200,  // Stagger by 200ms
                useNativeDriver: true,
            });
        });

        // Start all animations together with staggered delays
        Animated.stagger(200, animations).start();
    };

    // Render product card with staggered fade-in effect
    const renderAnimatedItem = ({ item, index }) => {
        if (!animatedValues[index]) return null; // Prevent accessing undefined animation values
        
        const animatedStyle = {
            opacity: animatedValues[index],
            transform: [
                {
                    translateY: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],  // Fade in while sliding up
                    }),
                },
            ],
        };

        return (
            <Animated.View style={animatedStyle}>
                <ProductCardView item={item} navigation={navigation} />
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size={Sizes.xxLarge} color={Colors.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <FlatList
                    // key={id}
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={renderAnimatedItem}  // Use animated renderItem
                    horizontal
                    contentContainerStyle={{ columnGap: Sizes.xSmall }}
                />
            )}
        </View>
    );
};

export default ProductRow;
