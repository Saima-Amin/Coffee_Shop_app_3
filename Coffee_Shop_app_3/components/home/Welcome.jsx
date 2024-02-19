import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import styles from './welcome.style';
import { Colors, Sizes } from '../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Welcome = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(Colors.black, Sizes.xSmall)}>
                    {" "}
                    Find The Most
                </Text>
                <Text style={styles.welcomeTxt(Colors.primary, 0)}>
                    {" "}
                    Luxurious Coffee Beans
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name='search' size={24} style={styles.searchIcon}></Feather>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=''
                        onPressIn={() => navigator.navigate("Search")}
                        placeholder='what are you looking for?'
                    ></TextInput>
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='camera-outline' size={Sizes.XLarge} color={Colors.offwhite}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}

export default Welcome;