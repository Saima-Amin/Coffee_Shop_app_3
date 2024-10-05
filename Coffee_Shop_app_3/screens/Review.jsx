import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Review = () => {
    // console.log("user in review page",user);
    return (
        
           <SafeAreaView>
             <View>
             <Text style={{ fontFamily: "serif", fontSize: 40, fontWeight: 'bold',color: '#3A3D42' }}>Enjoy the app? Rate us!</Text>
              <View style={styles.container}>
               
               <Text style={styles.title}>Average Rating: 3.5 out of 5</Text>
               
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

export default Review;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      color:'#3A3D42',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    starsContainer: {
      flexDirection: 'row',
    },
    ratingCount: {
      marginTop: 10,
      fontSize: 16,
    },
    rateText: {
      color: '#AB8C56',
      textDecorationLine: 'underline',
      marginBottom: 5,
    },
    userRatingText: {
      color : '#3A3D42',
      fontSize: 16,
      marginTop: 10,
    },
  });