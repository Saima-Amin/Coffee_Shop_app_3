import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react';
import styles from './productCardView.style';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';




const ProductCardView = () => {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                  source={{uri: "https://i.ibb.co/MPTfY84/Adobe-Stock-194828703-Preview.jpg"}}
                  style={styles.image}
                ></Image>
            </View>

            <View style={styles.details}>
                 <Text style={styles.title} numberOfLines={1}>Product</Text>
                 <Text style={styles.supplier} numberOfLines={1}>Product</Text>
                 <Text style={styles.price}>$1234</Text>
            </View>

            <TouchableOpacity style={styles.addBtn}>
                <Ionicons name='add-circle' size={35} color={Colors.primary}></Ionicons>
            </TouchableOpacity>


        </View>
      </TouchableOpacity>
    </View>
  )
}



export default ProductCardView;

