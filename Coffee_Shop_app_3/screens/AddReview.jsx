import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { collection, updateDoc, doc, getDocs, query, where, addDoc, } from 'firebase/firestore';
import { db, app, firebase } from './../firebase/firebase.config';
import { Colors } from '../constants';


const AddReview = () => {
    const [ reviewText, setReviewText] = useState('');
    const [ email, setEmail] = useState('');
    console.log("Add review page.....")

    useEffect(() => {

        const fetchUserEmail = async () => {
            const snapshot = await firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid).get();
            if (snapshot.exists) {
                console.log(snapshot.data().email);
                const email = snapshot.data().email;
                setEmail(email);
                console.log("addreview page email",email)
                // Fetch ratings after email is retrieved
                fetchRatings(email);
            }
        };


        fetchUserEmail();
        // fetchRatings();
    }, []);
    



    const handleAddReviews = async() => {
        try {
            const currentDate = new Date(); // Get current date and time
            // const formattedDate = currentDate.toLocaleString(); // Convert to human-readable format
            const newReview = { 
              comments: [],
              email: email,
              reviewtext: reviewText,
              likedEmail: [],
              dislikedEmail : [],
              createdAt: currentDate // Include posting time and date
            };
            console.log("new Review: ",newReview);
            const docRef = await addDoc(collection(db, 'reviews'), newReview);
            // console.log('Document written with ID: ', docRef.id);
            setReviewText(''); 
            ToastAndroid.show('Your review was posted! Thanks for staying with us!', ToastAndroid.SHORT);
        } catch (e) {
            console.error('Error adding document add review page: ', e);
        }
    };

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: "regular", fontSize: 15 }}>Feel free to give any suggestions or complaints! We will heartily try to solve it!</Text>
            <View style={{ height:100, display:'flex', flexDirection: 'row', justifyContent: 'center', gap:2 , alignItems: 'center', marginBottom: 10, }}>
              <View style={{ flex: 0.8 }}>
                <TextInput
                  style={[styles.input,  { height: 71 }]} 
                  placeholder="Write your suggestions or complaints"
                  value={reviewText}
                  multiline={true}
                  onChangeText={text => setReviewText(text)}
                />
              </View>
              <TouchableOpacity onPress={handleAddReviews} style={[styles.button, { flex: 0.2 }]}>
                <Text style={styles.buttonText}>Post a review!</Text>
              </TouchableOpacity>
            </View> 
        </View>
    );
};

export default AddReview;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#F1F2F6",
      padding: 20,
      marginBottom: 10,
    },
    contentContainer: {
      marginTop:10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    button: {
      // marginTop:10,
      backgroundColor: Colors.primary,
      padding: 13,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: Colors.offwhite,
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      // marginBottom:10,
      backgroundColor:'#F1F2F6',
      borderWidth: 2,
      borderColor: Colors.primary,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
  });