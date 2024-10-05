import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, updateDoc, doc, getDocs, onSnapshot, where, addDoc, query } from 'firebase/firestore';
import { Colors, Sizes } from '../constants';
import { Ionicons } from '@expo/vector-icons';


const Rating = ({ navigation }) => {
    // console.log("user in review page",user);
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [userRating, setUserRating] = useState(null); // Added state for user's rating

    useEffect(() => {
        // if (user) {
        const fetchData = async () => {
            try {
                const ratingQuery = query(collection(db, 'rating'), where('email', '==', user.email));
                const querySnapshot = await getDocs(ratingQuery);
                if (querySnapshot.size > 0) {
                    setHasRated(true);
                    setUserRating(querySnapshot.docs[0].data().rate); // Set user's rating
                }
            } catch (error) {
                console.error('Error checking user rating:', error);
            }
        };

        fetchData();
        // }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'rating'));
                const allRatings = querySnapshot.docs.map(doc => doc.data().rate);
                setRatings(allRatings);
                const totalRating = allRatings.reduce((acc, curr) => acc + curr, 0);
                const avg = totalRating / allRatings.length || 0;
                setAverageRating(avg);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <SafeAreaView>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' size={30}></Ionicons>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={{ fontFamily: "bold", fontSize: 30, color: '#3A3D42' }}>Enjoy the app? Rate us!</Text>
                <View >

                    <Text style={styles.title}>Average Rating: {averageRating.toFixed(1)} out of 5</Text>

                    <TouchableOpacity>
                        <Text style={styles.rateText}>You haven't rated yet. Do you want to rate?</Text>
                    </TouchableOpacity>

                    {/* // Display user's rating if available */}
                    <Text style={styles.userRatingText}>Your Rating: 4</Text>

                    {/* <View style={styles.starsContainer}>rendar star</View> */}
                    <Text style={styles.ratingCount}>Total Ratings: ratings length</Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        //   marginVertical: 10,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 20
    },
    upperRow: {
        color: Colors.primary,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: Sizes.XLarge,
        left: -Sizes.small,
        width: Sizes.width - 22,
        zIndex: 999
    },
    title: {
        fontFamily: "regular",
        color: '#3A3D42',
        fontSize: 20,
        marginBottom: 5,
    },
    starsContainer: {
        fontFamily: "regular",
        flexDirection: 'row',
    },
    ratingCount: {
        fontFamily: "regular",
        marginTop: 5,
        fontSize: 16,
    },
    rateText: {
        fontFamily: "regular",
        color: '#AB8C56',
        textDecorationLine: 'underline',
        marginBottom: 0,
    },
    userRatingText: {
        fontFamily: "regular",
        color: '#3A3D42',
        fontSize: 16,
        marginTop: 5,
    },
});