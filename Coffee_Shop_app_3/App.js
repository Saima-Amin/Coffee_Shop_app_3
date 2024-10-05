import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState, useEffect } from 'react';
import BottomtabNavigation from './navigation/BottomtabNavigation';
import { Cart, NewRivals, ProductDetails, LoginPage, Orders, Favourites, Location, VideoShowing, OpenCamera, Review, Rating, AddReview } from './screens';
import Signuppage from './screens/Signuppage';
import { firebase } from './firebase/firebase.config';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/OpenSans-Regular.ttf"),
    medium: require("./assets/fonts/OpenSans-Medium.ttf"),
    light: require("./assets/fonts/OpenSans-Light.ttf"),
    bold: require("./assets/fonts/OpenSans-Bold.ttf"),
    semibold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    extrabold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  });
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(userr) {
    console.log("User state changed:", userr); // Note the comma instead of concatenation
    setUser(userr);
    console.log("Current user:", userr ? userr.uid : "Not logged in"); // Log the uid if user exists, otherwise indicate not logged in
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    console.log("Updated user:", user);
    if (user) {
      // The user variable is not empty (it has a value)
      console.log("User variable is not empty:", user);
    } else {
      // The user variable is empty (it does not have a value)
      console.log("User variable is empty");
    }

  }, [user]); // This ensures that the useEffect runs whenever the user state variable changes

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || initializing) {
    return null;
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen
            name='Bottom Navigation'
            component={BottomtabNavigation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='ProductsList'
            component={NewRivals}
            options={{ headerShown: false }}>
          </Stack.Screen>


          <Stack.Screen
          name='ProductDetails'
          component={ProductDetails}
          options={{ headerShown: false }}>
        </Stack.Screen>


        <Stack.Screen 
        name='Location'
        component={Location}
        options={{headerShown:false}}>
        </Stack.Screen>


        <Stack.Screen 
        name='VideoShowing'
        component={VideoShowing}
        options={{headerShown:false}}>
        </Stack.Screen>


        <Stack.Screen 
        name='OpenCamera'
        component={OpenCamera}
        options={{headerShown:false}}>
        </Stack.Screen>


        <Stack.Screen 
        name='Favourites'
        component={Favourites}
        options={{headerShown:false}}>
        </Stack.Screen>

        <Stack.Screen 
        name='Review'
        component={Review}
        options={{headerShown:false}}>
        </Stack.Screen>


        <Stack.Screen 
        name='Rating'
        component={Rating}
        options={{headerShown:false}}>
        </Stack.Screen>


        <Stack.Screen 
        name='AddReview'
        component={AddReview}
        options={{headerShown:false}}>
        </Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // The user variable is empty (it does not have a value)
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Signup'
            component={Signuppage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}
