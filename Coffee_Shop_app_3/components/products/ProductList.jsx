import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import styles from './productList.style'
import useFetch from '../../hook/useFetch'
import { Colors, Sizes } from '../../constants'
import ProductCardView from './ProductCardView'


const ProductList = () => {

    const {data, isLoading, error} = useFetch();

if(isLoading){
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={Sizes.large} color={Colors.primary}></ActivityIndicator>
        </View>
    );

}

return (
    <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item}) => (<ProductCardView item={item}></ProductCardView>)}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        ></FlatList>
    </View>
)
  
}

export default ProductList;

