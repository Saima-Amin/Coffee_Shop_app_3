import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import styles from './productList.style'
import useFetch from '../../hook/useFetch'


const ProductList = () => {

    const {data,isLoading, error} = useFetch();

if(isLoading){
    return (
        <View>
            <ActivityIndicator></ActivityIndicator>
        </View>
      )
}
  
}

export default ProductList;

