import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import ProductRow from '../components/products/ProductRow';
import { useNavigation } from '@react-navigation/native';
import VideoShowing from "./VideoShowing"
import { Colors } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        checkExistingUser();
      },[]);
    
    
      const checkExistingUser = async () => {
        console.log("OKk");
        console.log("Here "+firebase.auth().currentUser.uid);
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
      }
    


    const navigation = useNavigation();
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
                        <Text style={{fontFamily:"regular", fontSize: 14}}>Process of Making Coffee Beans. </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("VideoShowing")}>
                            <Ionicons name='videocam' size={24} color={Colors.primary}></Ionicons>
                        </TouchableOpacity>
                    </View>


                    <Heading></Heading>
                    <ProductRow></ProductRow>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Home;

