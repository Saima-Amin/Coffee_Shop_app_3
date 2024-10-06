import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from './Rating';
import AddReview from './AddReview';
import { Colors } from '../constants';
import { doc, updateDoc, getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Review = () => {
    const [email, setEmail] = useState("");
    const [reviews, setReviews] = useState([]);
    const [showComments, setShowComments] = useState({});
    const [commentTexts, setCommentTexts] = useState({});
    const [user, setUser] = useState(null);

    const db = getFirestore(); // Initialize Firestore
    const auth = getAuth(); // Initialize Firebase Authentication

    useEffect(() => {
        // Get current authenticated user
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setEmail(currentUser.email);
        } else {
            console.log("No user is signed in.");
        }

        // Real-time listener for reviews
        const unsubscribe = onSnapshot(collection(db, 'reviews'), (querySnapshot) => {
            const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReviews(reviewsData);
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
    }, []);

    const toggleComments = (index) => {
        setShowComments(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleComment = async (reviewId, comments) => {
        try {
            const reviewDocRef = doc(db, "reviews", reviewId);
            const updatedData = { comments: comments };
            await updateDoc(reviewDocRef, updatedData);
            ToastAndroid.show('Your comment was posted', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handlePostComment = (review, newComment, index) => {
        // Add the new comment to the review in the local state
        const updatedComments = [
            ...(review.comments || []),
            { email: user.email, commentText: newComment }
        ];
    
        // Update Firestore with the new comments
        handleComment(review.id, updatedComments);
    
        // Clear the input field after posting comment
        setCommentTexts(prevState => ({
            ...prevState,
            [index]: '', // Clear the input for the specific review
        }));
    };

    const handleLike = async (review) => {
        try {
            const reviewDocRef = doc(db, "reviews", review.id);
            let likedEmail = review.likedEmail || [];
            let dislikedEmail = review.dislikedEmail || [];

            if (dislikedEmail.includes(user.email)) {
                dislikedEmail = dislikedEmail.filter(email => email !== user.email);
            }

            if (!likedEmail.includes(user.email)) {
                likedEmail = [...likedEmail, user.email];
                ToastAndroid.show('You liked this review', ToastAndroid.SHORT);
            } else {
                likedEmail = likedEmail.filter(email => email !== user.email);
                ToastAndroid.show('You unliked this review', ToastAndroid.SHORT);
            }

            const updatedData = { likedEmail, dislikedEmail };
            await updateDoc(reviewDocRef, updatedData);
        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    const handleDislike = async (review) => {
        try {
            const reviewDocRef = doc(db, "reviews", review.id);
            let likedEmail = review.likedEmail || [];
            let dislikedEmail = review.dislikedEmail || [];

            if (likedEmail.includes(user.email)) {
                likedEmail = likedEmail.filter(email => email !== user.email);
            }

            if (!dislikedEmail.includes(user.email)) {
                dislikedEmail = [...dislikedEmail, user.email];
                ToastAndroid.show('You disliked this review', ToastAndroid.SHORT);
            } else {
                dislikedEmail = dislikedEmail.filter(email => email !== user.email);
                ToastAndroid.show('You removed dislike reaction', ToastAndroid.SHORT);
            }

            const updatedData = { likedEmail, dislikedEmail };
            await updateDoc(reviewDocRef, updatedData);
        } catch (error) {
            console.error('Error disliking review:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.reviewContainer}>
                    <Rating />
                </View>
                <Text style={{ fontFamily: "bold", fontSize: 35, color: '#3A3D42' }}>Discover What Our Clients Are Saying!</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#AB8C56', borderTopWidth: 1, borderTopColor: '#AB8C56' }}>
                    <AddReview />
                </View>

                {reviews.map((review, index) => (
                    <View key={index}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>"{review.reviewtext}", </Text>
                            <Text>says {review.email}</Text>
                            <Text>{new Date(review.createdAt.seconds * 1000).toLocaleString()}</Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <TouchableOpacity style={styles.button} onPress={() => handleLike(review)}>
                                    <Text style={styles.buttonText}>
                                        {review.likedEmail?.length || 0} 
                                        <MaterialCommunityIcons name={review.likedEmail?.includes(user.email) ? "cards-heart" : "cards-heart-outline"} size={15} color="#ffff" />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleDislike(review)}>
                                    <Text style={styles.buttonText}>
                                        {review.dislikedEmail?.length || 0} 
                                        <MaterialCommunityIcons name={review.dislikedEmail?.includes(user.email) ? "heart-off" : "heart-off-outline"} size={15} color="#ffff" />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => toggleComments(index)}>
                                    <Text style={styles.buttonText}>
                                        {review.comments?.length || 0} 
                                        <MaterialCommunityIcons name="comment-multiple-outline" size={15} color= "#ffff" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {showComments[index] && (
                            <View>
                                {review.comments?.map((comment, commentIndex) => (
                                    <View key={commentIndex} style={{ marginLeft: 20, marginTop: 10 }}>
                                        <Text>{comment.commentText}</Text>
                                        <Text style={{ fontStyle: 'regular', color: '#AB8C56' }}>Commented by: {comment.email}</Text>
                                    </View>
                                ))}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  marginBottom: 10, marginTop: 10 }}>
                                    <TextInput
                                        placeholder="Want to ask or tell something more?"
                                        value={commentTexts[index] || ''}
                                        onChangeText={text => setCommentTexts(prevState => ({ ...prevState, [index]: text }))}
                                        style={styles.input}
                                    />
                                    <TouchableOpacity style={[styles.button, { flex: 0.2, padding: 14 }]} onPress={() => handlePostComment(review, commentTexts[index] || '', index)}>
                                        <Text style={styles.buttonText}>Post</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <View>Text</View> */}
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Review;

const styles = StyleSheet.create({
    container:{
        marginBottom: 50
    },
    reviewContainer: {
        fontFamily: "regular",
    },
    contentContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#AB8C56',
        borderRadius: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: "regular",
        color: Colors.offwhite,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#AB8C56',
        borderRadius: 10,
        padding: 10,
        flex: 1,
    }
});
