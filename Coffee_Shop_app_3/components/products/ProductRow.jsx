import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import React from 'react';
import styles from './productRow.style';
import { Colors, Sizes } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/useFetch';
import { useNavigation } from '@react-navigation/native';
// import { AxiosError } from 'axios';





const ProductRow = () => {
    const { data, isLoading, error } = useFetch();
    const navigation = useNavigation();
    // const products = [1, 2, 3, 4];

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size={Sizes.xxLarge} color={Colors.primary}></ActivityIndicator>
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductCardView item={item} navigation={navigation}></ProductCardView>}
                    horizontal
                    contentContainerStyle={{ columnGap: Sizes.xSmall }}
                ></FlatList>
            )}
        </View>
    )
}



export default ProductRow;

