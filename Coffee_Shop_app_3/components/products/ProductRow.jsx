import { FlatList, Text, View } from 'react-native';
import React from 'react';
import styles from './productRow.style';

const ProductRow = () => {
    const products = [1, 2, 3, 4]
  return (
    <FlatList
     data={products}
     renderItem={({item}) => (<Text>Product</Text>)}
    ></FlatList>
  )
}

export default ProductRow;

