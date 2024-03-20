import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import  BackBtn from '../components/BackBtn';
import styles from './login.style';
import { Button } from '../components';

const LoginPage = ({navigation}) => {
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        email: '',
        password: ''
    });




  return (
    <ScrollView>
        <SafeAreaView style={{marginHorizontal: 15}}>
            <View>
                <BackBtn onPress={() => navigation.goBack()}></BackBtn>
                <Image
                    source={require('../assets/images/loginbg2.jpg')}
                    style={styles.cover}
                />

                <Text style={styles.title}>Coffee Beans</Text>

                

                <Button title={"L O G I N"}onPress={() => {}}></Button>
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}





export default LoginPage;

