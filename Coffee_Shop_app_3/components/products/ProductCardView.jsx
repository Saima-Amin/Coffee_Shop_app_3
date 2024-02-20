import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react';
import styles from './productCardView.style';

const ProductCardView = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                  source={{uri: "https://i.ibb.co/MPTfY84/Adobe-Stock-194828703-Preview.jpg"}}
                  style={styles.image}
                ></Image>
            </View>

            <View style={styles.details}>
                 <Text style={styles.title}>Product</Text>
            </View>

        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ProductCardView;

