import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'


const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)


// For Logout Process
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: () => console.log("logout pressed")
        },
        {defaultIndex: 1}
      ]
    )
  }

  // For clear cache
  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel clear cache")
        },
        {
          text: "Continue", onPress: () => console.log("clear cache pressed")
        },
        {defaultIndex: 1}
      ]
    )
  }

  
  // For delete account
  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel deleting account")
        },
        {
          text: "Continue", onPress: () => console.log("delete account pressed")
        },
        {defaultIndex: 1}
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.gray}></StatusBar>

        <View style={{ width: '100%' }}>
          <Image
            source={require('../assets/images/2148808573.jpg')}
            style={styles.cover}
          ></Image>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/2148808573.jpg')}
            style={styles.profile}
          ></Image>
          <Text style={styles.name}>
            {userLogin === true ? "Andrew" : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N  </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>dfdfbfdhrtbdd.com </Text>
            </View>
          )
          }


          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.manuWrapper}>
              {/* favourites button */}
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.manuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>

              {/* orders button */}
              <TouchableOpacity onPress={() =>  navigation.navigate('Orders')}>
                <View style={styles.manuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              {/* cart button */}
              <TouchableOpacity onPress={() =>  navigation.navigate('Cart')}>
                <View style={styles.manuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              {/* clear cache button */}
              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.manuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="caches"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>

              {/* delete user button */}
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.manuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

             {/* logout button */}
              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.manuItem(0.2)}>
                  <AntDesign
                    name="logout"
                    color={Colors.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>



            </View>
          )
          }


        </View>

      </View>
    </View>
  )
}

export default Profile;