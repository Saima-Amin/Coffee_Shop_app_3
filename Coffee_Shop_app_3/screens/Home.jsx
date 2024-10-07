import { StyleSheet, ScrollView, Text, View, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import ProductRow from '../components/products/ProductRow';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [userLogin, setUserLogin] = useState(false);
    const navigation = useNavigation();

    // Animation Value
    const floatAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        checkExistingUser();
        startFloatingAnimation(); // Start the floating animation on mount
    }, []);

    const checkExistingUser = async () => {
        console.log("OKk");
        console.log("Here " + firebase.auth().currentUser.uid);
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid).get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setUserLogin(true);
              console.log(snapshot.data());
              setUserData(snapshot.data());
            } else {
              console.log('User does not exist');
            }
          });
    };

    // Floating animation function
    const startFloatingAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    delay:3000,
                    toValue: -600,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <View style={styles.appBarWrapper}>
                    <View style={styles.appBar}>
                        <TouchableOpacity onPress={() => navigation.navigate("Location")}>
                            <Ionicons name='location-outline' size={24}></Ionicons>
                        </TouchableOpacity>

                        <Text style={styles.location}>{userData ? userData.location : "Chittagong"}</Text>

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

                    <View style={styles.videoContainer}>
                        <Text style={{fontFamily:"regular", fontSize: 20}}>Process of Making Coffee Beans. </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("VideoShowing")}>
                            <Ionicons name='videocam' size={26} color={Colors.primary}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <Heading></Heading>
                    <ProductRow></ProductRow>
                </ScrollView>

                {/* Floating Ball Animation */}
                <Animated.View style={[
                    styles.floatingBall,
                    { transform: [{ translateY: floatAnim }] }  // Link animation to translateY
                ]}>
                </Animated.View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Home;
