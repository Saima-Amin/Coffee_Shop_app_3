import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { Colors } from '../../constants';

const Carousel = () => {
    const slides = [
        'https://i.ibb.co/w4nr2VT/background1.jpg',
        'https://i.ibb.co/PjkXB1p/background2.jpg',
        'https://i.ibb.co/NnJtrdP/Adobe-Stock-105907729-Preview.jpg'
    ]
  return (
    <View style={styles.carouselContainer}>
        <SliderBox images={slides}
        dotColor={Colors.primary}
        inactiveDotColor={Colors.secondary}
        ImageComponentStyle={{borderRadius: 15, width: '92%',marginTop: 15 }}
        autoplay
        circleLoop
        ></SliderBox>
    </View>
  )
}

export default Carousel;

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'center'
    }
});