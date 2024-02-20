import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import styles from './heading.style';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

const Heading = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>New Rivals</Text>
            <TouchableOpacity>
                <Ionicons name='grid' size={24} color={Colors.primary}></Ionicons>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Heading