import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from './Rating';
import { Colors } from '../constants';
import { firebase } from '../firebase/firebase.config';

const Review = () => {
    console.log("Here review page: " + firebase.auth().currentUser.uid);
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState([]);

    useEffect(() => {
        // Fetch user's email
        const fetchUserEmail = async () => {
            const snapshot = await firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid).get();
            if (snapshot.exists) {
                // console.log(snapshot.data().email);
                setEmail(snapshot.data().email);
            }
        };

        // Fetch ratings
        const fetchRatings = async () => {
            try {
                const querySnapshot = await firebase.firestore().collection('reviews').get();
                const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRating(reviews);
                console.log(reviews)
            } catch (error) {
                console.error('Error getting documents: ', error);
            }
        };

        fetchUserEmail();
        fetchRatings();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <SafeAreaView>
            <View style={styles.reviewContainer}>
                <Rating />
            </View>
            {rating.length > 0 ? (
                rating.map((item) => (
                    <View key={item.id}>
                        {/* <Text>{item.email}</Text> */}
                    </View>
                ))
            ) : (
                <Text>Loading...</Text>
            )}
            
        </SafeAreaView>
    );
};

export default Review;

const styles = StyleSheet.create({
    reviewContainer: {
        fontFamily: "regular"
    }
});
