import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import styles from './heading.style';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Heading = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>New Rivals</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ProductsList")}>
                <Ionicons name='grid' size={24} color={Colors.primary}></Ionicons>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Heading