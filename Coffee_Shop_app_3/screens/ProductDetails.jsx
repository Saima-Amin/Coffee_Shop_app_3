import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react';
import { Fontisto, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import styles from './productDetails.style';
import { Colors, Sizes } from '../constants';
import { useRoute } from '@react-navigation/native';




const ProductDetails = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const [count, setCount] = useState(1)



    console.log(item.imageUrl);
    const increment = () => {
        setCount(count + 1)
    }


    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }





    return (
        <View style={styles.container}>

            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' size={30}></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name='heart' size={30} color={Colors.primary}></Ionicons>
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                onError={() => console.log("Error loading image")}
            ></Image>

            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>

                {/* Star Rating */}
                <View style={styles.ratingRow}>
                    <View style={styles.rating}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Ionicons
                                key={index}
                                name='star'
                                size={20}
                                color="gold"
                            ></Ionicons>
                        ))}
                        <Text style={styles.ratingText}>   (4.9)</Text>
                    </View>


                    <View style={styles.rating}>
                        <TouchableOpacity onPress={() => increment()}>
                            <SimpleLineIcons
                                name='plus' size={20}
                            ></SimpleLineIcons>
                        </TouchableOpacity>

                        <Text style={styles.ratingText}>  {count}  </Text>

                        <TouchableOpacity onPress={() => decrement()}>
                            <SimpleLineIcons
                                name='minus' size={20}
                            ></SimpleLineIcons>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Descriptipn section */}
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.desText}>{item.description}</Text>
                </View>

                <View style={{ marginBottom: Sizes.small, marginHorizontal: Sizes.small }}>
                    <View style={styles.location}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Ionicons name='location-outline' size={20}></Ionicons>
                            <Text> {item.productLocation}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <MaterialCommunityIcons name='truck-delivery-outline' size={20}></MaterialCommunityIcons>
                            <Text> Free Delivery</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.cartRow}>
                    <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
                        <Text style={styles.cartTitle}>BUY NOW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={styles.addcart}>
                        <Fontisto name='shopping-bag' size={22} color={Colors.lightwhite}></Fontisto>
                    </TouchableOpacity>
                </View>



            </View>
        </View>
    )
}



export default ProductDetails;

