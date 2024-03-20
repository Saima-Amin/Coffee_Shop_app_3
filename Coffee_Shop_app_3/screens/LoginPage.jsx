import { ScrollView, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

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
        <SafeAreaView style={{marginHorizontal: 20}}>
            <View>

            </View>
        </SafeAreaView>
    </ScrollView>
  )
}





export default LoginPage

