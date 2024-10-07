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
import { firebase } from "../firebase/firebase.config";

const LoginPage = ({ navigation }) => {
  const [obsecureText, setObsecureText] = useState(false);

  const loginUser = async (email, password) => {
    try {
      console.log(email,password);
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };
  
  const login = async (values) => {
    loginUser(values.email,values.password);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 15 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/loginbg2.jpg')}
            style={styles.cover}
          />
          <Text style={styles.title}>Coffee Beans</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, touched, handleSubmit, values, errors, setFieldTouched }) => (
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
                        name={obsecureText ? "eye-off-outline" : "eye-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button title={"L O G I N"} onPress={handleSubmit} />
                <Text style={styles.registration} onPress={() => { navigation.navigate('Signup') }}>Register</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default LoginPage;
