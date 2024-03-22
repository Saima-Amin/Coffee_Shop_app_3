import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as LOCATE from 'expo-location';
import MapView from 'react-native-maps';
import { Colors, Sizes } from '../constants';
import { BackBtn } from '../components';


const Location = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState();

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await LOCATE.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await LOCATE.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(currentLocation);

        };
        getPermission();
    }, []);

    let text = 'waiting...'
    if (errorMsg) {
        text(errorMsg);
    }
    else if (location) {
        text = JSON.stringify(location);
    }




    return (
        <View style={styles.container}>
            <BackBtn style={{top: Sizes.xxLarge}} onPress={() => navigation.goBack()}></BackBtn>

            <MapView
                showsMyLocationButton={true}
                showsUserLocation={true}
                style={styles.map}
            />

        </View>
    )



}



export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop:15,
        // alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})