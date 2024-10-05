import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, updateDoc, doc, getDocs, onSnapshot, where, addDoc, query } from 'firebase/firestore';
import Rating from './Rating';
import { Sizes,Colors } from '../constants';
import { firebase } from '../firebase/firebase.config';


const Review = () => {
    console.log("Here review page" + firebase.auth().currentUser.uid);

    <SafeAreaView>
        <View style={styles.reviewContainer}>
            <Rating></Rating>
        </View>
       <View>
       <Text style={{color:"black"}}>hbdsjhuhiaskjdjkakjjh</Text>
       </View>
    </SafeAreaView>
};

export default Review;

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: Colors.primary,
        fontFamily: "regular"
        // margin: 10,
        // padding: 20,
    }
});

