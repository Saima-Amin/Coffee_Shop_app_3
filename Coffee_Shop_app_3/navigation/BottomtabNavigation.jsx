import { View, Text } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Search, Profile, Review} from "../screens"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Tab = createBottomTabNavigator();

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
                            color={focused ? Colors.primary : Colors.gray2}></Ionicons>
                    }
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={"search-sharp"}
                            size={26}
                            color={focused ? Colors.primary : Colors.gray2}>
                        </Ionicons>
                    }
                }}
            />
            <Tab.Screen
                name="Review"
                component={Review}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={"chatbubble-outline"}
                            size={26}
                            color={focused ? Colors.primary : Colors.gray2}>
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
                            color={focused ? Colors.primary : Colors.gray2}></Ionicons>
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomtabNavigation