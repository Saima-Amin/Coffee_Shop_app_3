import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from './Rating';
import AddReview from './AddReview';
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
             <Text style={{ fontFamily: "bold", fontSize: 38 ,color: '#3A3D42' }}>See What Our Clients Say!</Text>
                    {/* <Text style={{ fontFamily: "serif", fontSize: 20, marginBottom: 8,color: '#3A3D42' }}>Want to be more confirmed about our services? Let's see what our customers' say about our services, so that we can assure you more!</Text> */}
                    {/* this is for adding reviews */}
                    <View style={{borderBottomWidth: 1,  borderBottomColor: '#AB8C56',borderTopWidth: 1, borderTopColor: '#AB8C56' }}>
                        <AddReview></AddReview>
                    </View>
            
        </SafeAreaView>
    );
};

export default Review;

const styles = StyleSheet.create({
    reviewContainer: {
        fontFamily: "regular"
    }
});
