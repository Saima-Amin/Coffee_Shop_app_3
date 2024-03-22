import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import { Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants';



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



    const isValidForm = () => {
        Alert.alert(
          "Invalid Form",
          "Please Provide all required fields",
          [
            {
              text: "Cancel", onPress: () => {}
            },
            {
              text: "Continue", onPress: () => {}
            },
            {defaultIndex: 1}
          ]
        )
      }
    

     const login = async (values) => {
        setLoader(true);
        console.log(values);
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
                                           onFocus={()=> {setFieldTouched('email')}}
                                           onBlur={()=>{setFieldTouched('email','')}}
                                           value={values.email}
                                           onChangeText={handleChange('email')}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           style={{flex: 1}}
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
                                           onFocus={()=> {setFieldTouched('password')}}
                                           onBlur={()=>{setFieldTouched('password','')}}
                                           value={values.password}
                                           onChangeText={handleChange('password')}
                                           autoCapitalize="none"
                                           autoCorrect={false}
                                           style={{flex: 1}}
                                        />

                                        <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
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



                                <Button loader={loader} title={"L O G I N"} onPress={isValid ? handleSubmit :  isValidForm} isValid={isValid}></Button>

                                <Text style={styles.registration} onPress={()=> {navigation.navigate('Signup')}}>Register</Text>
                            </View>
                        )}



                    </Formik>



                </View>
            </SafeAreaView>
        </ScrollView>
    )
}





export default LoginPage;

