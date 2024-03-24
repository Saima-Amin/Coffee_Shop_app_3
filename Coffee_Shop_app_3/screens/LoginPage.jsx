import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import { Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants';
import axios from 'axios';
import useAxiosPublic from '../hook/useAxiosSecure';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get network interfaces
// require module
import { NetworkInfo } from "react-native-network-info";
var temp="hi"
NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log(ipv4Address);
  });
   
console.log(temp)

// { import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
//  import app from '../firebase/firebase.config';
//  import { initializeApp } from 'firebase/app';
//  import {getAuth } from 'firebase/app';


// const firebaseConfig = {
//     apiKey: "AIzaSyDIxpGmcOuqxbwWQ6fHffdcN7jG359c9OE",
//     authDomain: "coffee-shop-firebase-f1b64.firebaseapp.com",
//     projectId: "coffee-shop-firebase-f1b64",
//     storageBucket: "coffee-shop-firebase-f1b64.appspot.com",
//     messagingSenderId: "567053090727",
//     appId: "1:567053090727:web:e87b560b605092a95fc082",
//     measurementId: "G-M8RHM2VXE5"
//   };
// }
  


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
});



const LoginPage = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

    const axiosSecure = useAxiosPublic();



    const isValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please Provide all required fields",
            [
                {
                    text: "Cancel", onPress: () => { }
                },
                {
                    text: "Continue", onPress: () => { }
                },
                { defaultIndex: 1 }
            ]
        )
    }


    const login = async (values) => {
        setLoader(true);
        console.log(values);

        try {
            const endpoint = "http:// /api/login"
            const data = values;
            console.log("data:")
            console.log(data)
           

            const response = await axios.post(endpoint, data)
            console.log("here")
            console.log("response:")
            console.log(response)
            
            if (response.status === 200) {
                setLoader(false)
                // console.log(response.data)
                setResponseData(response.data)
                // console.log(`user${responseData._id}`)
                await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData)) 
                // await AsyncStorage.getItem('')
                await AsyncStorage.setItem('id', JSON.stringify(responseData._id))

                navigation.replace('Bottom Navigation')
               

            } else {
                Alert.alert(
                    "Error logging in",
                    "Please Provide valid credentials",
                    [
                        {
                            text: "Cancel", onPress: () => { }
                        },
                        {
                            text: "Continue", onPress: () => { }
                        },
                        { defaultIndex: 1 }
                    ]
                )
            }
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Error",
                "oops, find an error.. try again",
                [
                    {
                        text: "Cancel", onPress: () => { }
                    },
                    {
                        text: "Continue", onPress: () => { }
                    },
                    { defaultIndex: 1 }
                ]
            )
        }finally{
            setLoader(false);
        }
    }





    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 15 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()}></BackBtn>
                    <Image
                        source={require('../assets/images/loginbg2.jpg')}
                        style={styles.cover}
                    />

                    <Text style={styles.title}>Coffee Beans</Text>


                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => login(values)}
                    >
                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>

                                {/* FOR EMAIL INPUT FIELD */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.inputWrapper(touched.email ? Colors.primary : Colors.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='email-outline'
                                            size={20}
                                            color={Colors.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Enter Email"
                                            onFocus={() => { setFieldTouched('email') }}
                                            onBlur={() => { setFieldTouched('email', '') }}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                        <Text style={styles.errorMessage}>{errors.email}</Text>
                                    )}
                                </View>


                                {/* FOR PASSWORD INPUT FIELD */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputWrapper(touched.password ? Colors.primary : Colors.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='lock-outline'
                                            size={20}
                                            color={Colors.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            secureTextEntry={obsecureText}
                                            placeholder="Password"
                                            onFocus={() => { setFieldTouched('password') }}
                                            onBlur={() => { setFieldTouched('password', '') }}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />

                                        <TouchableOpacity onPress={() => { setObsecureText(!obsecureText) }}>
                                            <MaterialCommunityIcons
                                                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                                size={18}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                        <Text style={styles.errorMessage}>{errors.password}</Text>
                                    )}
                                </View>



                                <Button loader={loader} title={"L O G I N"} onPress={isValid ? handleSubmit : isValidForm} isValid={isValid}></Button>

                                <Text style={styles.registration} onPress={() => { navigation.navigate('Signup') }}>Register</Text>
                            </View>
                        )}



                    </Formik>



                </View>
            </SafeAreaView>
        </ScrollView>
    )
}





export default LoginPage;

