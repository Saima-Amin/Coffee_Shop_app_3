import { TextInput, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '../constants';



const Search = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons 
           name='camera-outline'
           size={Sizes.XLarge}
           style={styles.searchIcon} 
           ></Ionicons>

        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=''
            onPressIn={() => {}}
            placeholder='what are you looking for?'
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name='search' size={24} color={Colors.offwhite}></Feather>

          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Search

