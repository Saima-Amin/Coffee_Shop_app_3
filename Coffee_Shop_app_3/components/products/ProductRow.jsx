import { FlatList, Text, View } from 'react-native';
import React from 'react';
import styles from './productRow.style';
import { Sizes } from '../../constants';
import ProductCardView from './ProductCardView';

const ProductRow = () => {
    const products = [1, 2, 3, 4];
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCardView></ProductCardView>}
                horizontal
                contentContainerStyle={{ columnGap: Sizes.medium }}
            ></FlatList>
        </View>
    )
}

export default ProductRow;

