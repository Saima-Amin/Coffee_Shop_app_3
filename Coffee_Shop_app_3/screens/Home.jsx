import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import ProductRow from '../components/products/ProductRow';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <View style={styles.appBarWrapper}>
                    <View style={styles.appBar}>
                        <TouchableOpacity onPress={() => navigation.navigate("Location")}>
                            <Ionicons name='location-outline' size={24}></Ionicons>
                        </TouchableOpacity>

                        <Text style={styles.location}>Chittagong</Text>

                        <View style={{ alignItems: "flex-end" }}>
                            <View style={styles.cartCount}>
                                <Text style={styles.cartNumber}> 8 </Text>
                            </View>
                            <TouchableOpacity onPress={() => console.log("Button pressed")}>
                                <Fontisto name='shopping-bag' size={24}></Fontisto>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <ScrollView>
                    <Welcome></Welcome>
                    <Carousel></Carousel>
                    <Heading></Heading>
                    <ProductRow></ProductRow>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Home;

