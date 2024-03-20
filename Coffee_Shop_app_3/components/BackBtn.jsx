import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors,Sizes } from '../constants';

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbtn}>
         <Ionicons
            name='chevron-back-circle'
            size={33}
            color={Colors.primary}
         />
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
    backbtn: {
        marginHorizontal: 10,
        alignItems: "center",
        position: "absolute",
        zIndex: 999,
        top: Sizes.large-10
    }
})