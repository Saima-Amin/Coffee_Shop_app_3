import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, updateDoc, doc, getDocs, query, where, addDoc, } from 'firebase/firestore';
import { Colors, Sizes } from '../constants';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db, app, firebase } from './../firebase/firebase.config'
import { useNavigation } from '@react-navigation/native';
// import { db } from '../firebase'; // Ensure firebase instance is imported correctly

const Rating = ({ navigation }) => {
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(); // Mock user data for testing
    const navigation2 = useNavigation();  // Add navigation here



    useEffect(() => {

        const fetchUserEmail = async () => {
            const snapshot = await firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid).get();
            if (snapshot.exists) {
                console.log(snapshot.data().email);
                const email = snapshot.data().email;
                setEmail(email);
                console.log("ratug page email",email)
                // Fetch ratings after email is retrieved
                fetchRatings(email);
            }
        };

        const fetchRatings = async (email) => {
            try {
                const ratingsCollection = collection(db, 'rating');
                const ratingSnapshot = await getDocs(ratingsCollection);
                const ratingList = ratingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
                // Check if every document has a rate property and handle missing values gracefully
                const validRatings = ratingList.filter(rating => rating.hasOwnProperty('rate'));
                setRatings(validRatings);
        
                console.log("Valid rating list in rating page", validRatings);
        
                // Calculate the average rating only with valid ratings
                const totalRating = validRatings.reduce((acc, curr) => acc + curr.rate, 0);
                const avg = validRatings.length > 0 ? totalRating / validRatings.length : 0;
                setAverageRating(avg);
        
                // Find the current user's rating, if it exists
                const userRating = validRatings.find(rating => rating.email === email);
                if (userRating) {
                    setUserRating(userRating.rate);
                    console.log(`User's Rating:`, userRating.rate);
                }
            } catch (error) {
                console.error("Error fetching ratings: ", error);
            }
        };
        fetchUserEmail();
        // fetchRatings(email);
    }, []);

 
    
    const handleRating = async (rating) => {
        console.log("email before if",email)
        if (email) {
            if (hasRated) {
                Alert.alert(
                    'Already Rated',
                    'You have already rated the app. Do you want to change your rating?',
                    [
                        {
                            text: 'No',
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: async () => {
                                try {
                                    const ratingQuery = query(collection(db, 'rating'), where('email', '==', email));
                                    const ratingSnapshot = await getDocs(ratingQuery);
                                    if (!ratingSnapshot.empty) {
                                        const ratingDoc = ratingSnapshot.docs[0];
                                        await updateDoc(doc(db, 'rating', ratingDoc.id), { rate: rating });
                                        Alert.alert('Rating Updated', 'Your rating has been updated successfully.');
    
                                        // Update local state
                                        const updatedRatings = ratings.map(item =>
                                            item.email === email ? { ...item, rate: rating } : item
                                        );
                                        setRatings(updatedRatings);
    
                                        // Recalculate average
                                        const totalRating = updatedRatings.reduce((acc, curr) => acc + curr.rate, 0);
                                        const avg = updatedRatings.length > 0 ? totalRating / updatedRatings.length : 0;
                                        setAverageRating(avg);
    
                                        setUserRating(rating);
                                    } else {
                                        console.error('Rating document not found.');
                                    }
                                } catch (error) {
                                    console.error('Error updating rating:', error);
                                }
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                try {
                    await addDoc(collection(db, 'rating'), { email, rate: rating });
                    setHasRated(true);
                    setUserRating(rating);
    
                    // Update local state
                    const updatedRatings = [...ratings, { email, rate: rating }];
                    setRatings(updatedRatings);
    
                    // Recalculate average
                    const totalRating = updatedRatings.reduce((acc, curr) => acc + curr.rate, 0);
                    const avg = updatedRatings.length > 0 ? totalRating / updatedRatings.length : 0;
                    setAverageRating(avg);
    
                    Alert.alert('Your Rating Counted', 'Your rating has been counted.', [{ text: 'OK' }], { cancelable: false });
                } catch (error) {
                    console.error('Error adding rating:', error);
                }
            }
        } else {
            console.error('Email is required to submit a rating.');
        }
    };
    

    const renderStars = () => {
        const filledStars = Math.floor(averageRating);
        const partialStar = averageRating - filledStars;
        const starArray = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= filledStars) {
                starArray.push(
                    <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                        <MaterialIcons name={'star'} size={50} color={'#AB8C56'} />
                    </TouchableOpacity>
                );
            } else if (i === filledStars + 1 && partialStar > 0) {
                starArray.push(
                    <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                        <MaterialIcons name={'star-half'} size={50} color={'#AB8C56'} />
                    </TouchableOpacity>
                );
            } else {
                starArray.push(
                    <TouchableOpacity key={i} onPress={() => handleRating(i)}>
                        <MaterialIcons name={'star-border'} size={50} color={'#AB8C56'} />
                    </TouchableOpacity>
                );
            }
        }
        return <View style={styles.starsContainer}>{starArray}</View>;
    };

    return (
        <SafeAreaView>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() =>  navigation && navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' size={30} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
    <Text style={styles.headerText}>Enjoy the app? Rate us!</Text>
    <Text style={styles.title}>Average Rating: {averageRating.toFixed(1)} out of 5</Text>

    {!hasRated && (
        <TouchableOpacity onPress={() => handleRating(0)}>
            <Text style={styles.rateText}>You haven't rated yet. Do you want to rate?</Text>
        </TouchableOpacity>
    )}
    <View style={styles.starsContainer}>{renderStars()}</View>

    {userRating !== null && <Text style={styles.userRatingText}>Your Rating: {userRating}</Text>}

    <Text style={styles.ratingCount}>Total Ratings: {ratings.length}</Text>

    {/* New Button */}
    <TouchableOpacity style={styles.reportButton} onPress={() => navigation2.navigate('Rating Summary')}>
        <Text style={styles.reportButtonText}>View Rating Report</Text>
    </TouchableOpacity>
</View>

        </SafeAreaView>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 15
    },
    upperRow: {
        color: '#AB8C56',
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        // position: "absolute",
        top: Sizes.large,
        left: -Sizes.small,
        width: Sizes.width -22,
        zIndex: 999
    },
    headerText: {
        fontFamily: "bold",
        fontSize: 30,
        color: '#3A3D42',
        textAlign: 'center',
    },
    title: {
        fontFamily: "regular",
        color: '#3A3D42',
        fontSize: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 5,
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
    reportButton: {
        marginTop: 10,
        backgroundColor: '#AB8C56',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '60%',
    },
    reportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'bold',
    },    
});
