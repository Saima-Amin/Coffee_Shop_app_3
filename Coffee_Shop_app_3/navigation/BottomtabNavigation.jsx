import { View, Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {Home, Search, Profile, Review } from "../screens"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BarChartDemo from '../screens/BarChartDemo';
import CountryInfo from '../screens/CountryInfo';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const screenOptions = {
    tabBarShowLabel: false, // Corrected typo
    headerShown: false,
    tabBarHideOnKeyboard: true, // Moved outside tabBarStyle
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60
    }
}

function ReviewStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Review"
          component={Review}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rating Summary"
          component={BarChartDemo}
        />
      </Stack.Navigator>
    );
  }

  function SearchStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CountryInfo"
          component={CountryInfo}
        />
      </Stack.Navigator>
    );
  }

const BottomtabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? "home" : "home-outline"}
                            size={26}
                            color={focused ? "#7F5539" : Colors.gray2}></Ionicons>
                    }
                }}
            />
            <Tab.Screen
                name="SearchStackNavigator"
                component={SearchStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={"search-sharp"}
                            size={26}
                            color={focused ? "#7F5539" : Colors.gray2}>
                        </Ionicons>
                    }
                }}
            />
            <Tab.Screen
                name="ReviewStackNavigator"
                component={ReviewStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"}
                            // name={"chatbubble-outline"}
                            size={26}
                            color={focused ? "#7F5539" : Colors.gray2}>
                        </Ionicons>
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? "person" : "person-outline"}
                            size={26}
                            color={focused ? "#7F5539" : Colors.gray2}></Ionicons>
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomtabNavigation