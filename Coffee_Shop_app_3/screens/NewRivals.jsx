import { TouchableOpacity , View, Text } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import styles from './newRivals.style';

const NewRivals = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.upperRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back-circle' size={30} color={Colors.lightwhite}></Ionicons>
                    </TouchableOpacity>

                    <Text style={styles.heading}> Products </Text>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default NewRivals;