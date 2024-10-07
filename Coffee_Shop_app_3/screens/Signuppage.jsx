import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import { Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Sizes } from '../constants';
import { firebase } from "../firebase/firebase.config";



const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    email: Yup.string().email('Provide a valid email address')
        .required('Required'),
    location: Yup.string()
        .min('Provide a valid location')
        .required('Required'),
    username: Yup.string()
        .min('Provide a valid username')
        .required('Required'),
});



const Signuppage = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };



    const isValidForm = ({ navigation }) => {
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

    registerUser = async (email, password, location, username) => {
        /* if (username.trim() !== '') {
           checkUsernameAvailability();
         }else setIsUsernameAvailable(false);
         if(isUsernameAvailable===false) {
           alert('Enter unique user name');
           return;
         }  */
        console.log(email);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .auth()
                    .currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: "https://coffeeshopapp-39dbf.firebaseapp.com",
                    })
                    .then(() => {
                        alert("Verification email sent");
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
                    .then(() => {
                        console.log("3");
                        firebase
                            .firestore()
                            .collection("users")
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                username: username,
                                _id: firebase.auth().currentUser.uid,
                                email: email,
                                location: location,
                            });
                        console.log("4");
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });

        navigation.goBack();
    };


    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 15 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()}></BackBtn>
                    <Image
                        source={require('../assets/images/loginbg2.jpg')}
                        style={{
                            height: Sizes.height / 3,
                            width: '100%',
                            resizeMode: "cover",
                            marginBottom: Sizes.xxLarge - 15
                        }}
                    />

                    <Text style={styles.title}>Coffee Beans</Text>


                    <Formik
                        initialValues={{ email: "", password: "", location: "", username: "" }}
                        //  validationSchema={validationSchema}
                        onSubmit={(values) => registerUser(values.email, values.password, values.location, values.username)}

                    >
                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>


                                {/* FOR USERNAME INPUT FIELD */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>User Name</Text>
                                    <View style={styles.inputWrapper(touched.username ? Colors.primary : Colors.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={Colors.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Enter username"
                                            onFocus={() => { setFieldTouched('username') }}
                                            onBlur={() => { setFieldTouched('username', '') }}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.username && errors.username && (
                                        <Text style={styles.errorMessage}>{errors.username}</Text>
                                    )}
                                </View>

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

                                {/* FOR LOCATION INPUT FIELD */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.inputWrapper(touched.location ? Colors.primary : Colors.offwhite)}>
                                        <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={Colors.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Enter location"
                                            onFocus={() => { setFieldTouched('location') }}
                                            onBlur={() => { setFieldTouched('location', '') }}
                                            value={values.location}
                                            onChangeText={handleChange('location')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.location && errors.location && (
                                        <Text style={styles.errorMessage}>{errors.location}</Text>
                                    )}
                                </View>

                                {/* Date of Birth Picker */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Date of Birth</Text>
                                    <View style={[styles.inputWrapper, {
                                        backgroundColor: Colors.lightwhite,
                                        height: 50,
                                        borderRadius: 12,
                                        flexDirection: "row",
                                        paddingHorizontal: 15,
                                        alignItems: "center"
                                    }]}>
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.datePicker, {flexDirection:'row',gap: 8}]}>
                                            <Ionicons
                                                name='calendar-outline'
                                                size={20}
                                                color={Colors.gray}
                                                style={styles.iconStyle}
                                            />
                                            <Text style={[styles.dateText, {color: Colors.gray}]}>
                                                {date.toDateString()}
                                            </Text>
                                        </TouchableOpacity>

                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onDateChange}
                                            />
                                        )}
                                    </View>
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
                                                name={obsecureText ? "eye-off-outline" : "eye-outline"}
                                                size={18}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                        <Text style={styles.errorMessage}>{errors.password}</Text>
                                    )}
                                </View>



                                <Button title={"S I G N U P"} onPress={handleSubmit} ></Button>

                                {/* <Text style={styles.registration} onPress={()=> {navigation.navigate('')}}>Register</Text> */}
                            </View>
                        )}



                    </Formik>



                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Signuppage;