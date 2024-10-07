import { TextInput, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '../constants';



const Search = () => {
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

  return (
    <SafeAreaView>


      {/* SEARCH COMPONENT */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            onPressIn={() => { }}
            placeholder='what are you looking for?'
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name='search' size={24} color={Colors.offwhite}></Feather>

          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL COMPONENT */}
      <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
      >

      </Modal>

    </SafeAreaView>
  )
}

export default Search;

