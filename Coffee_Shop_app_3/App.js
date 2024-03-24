import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';
import BottomtabNavigation from './navigation/BottomtabNavigation';
import { Cart, NewRivals, ProductDetails , LoginPage, Orders, Favourites, Location,  VideoShowing, OpenCamera } from './screens';
import Signuppage from './screens/Signuppage';


const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();


export default function App() {
  const [fonntsLoaded] = useFonts({
    regular: require("./assets/fonts/OpenSans-Regular.ttf"),
    medium: require("./assets/fonts/OpenSans-Medium.ttf"),
    light: require("./assets/fonts/OpenSans-Light.ttf"),
    bold: require("./assets/fonts/OpenSans-Bold.ttf"),
    semibold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    extrabold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
  })

  const onLayoutRootView  = useCallback(async() => {
    if(fonntsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fonntsLoaded] );
  if(!fonntsLoaded){
    return null;
  }

  return (
   <NavigationContainer>
    <Stack.Navigator>


      <Stack.Screen 
      name='Bottom Navigation'
      component={BottomtabNavigation}
      options={{headerShown:false}}>
      </Stack.Screen>


      <Stack.Screen 
      name='Cart'
      component={Cart}
      options={{headerShown:false}}>
      </Stack.Screen>


      <Stack.Screen 
      name='ProductDetails'
      component={ProductDetails}
      options={{headerShown:false}}>
      </Stack.Screen>


      <Stack.Screen 
      name='ProductsList'
      component={NewRivals}
      options={{headerShown:false}}>
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
      name='Login'
      component={LoginPage}
      options={{headerShown:false}}>
      </Stack.Screen>


      <Stack.Screen 
      name='Orders'
      component={Orders}
      options={{headerShown:false}}>
      </Stack.Screen>


      <Stack.Screen 
      name='Favourites'
      component={Favourites}
      options={{headerShown:false}}>
      </Stack.Screen>

    
      <Stack.Screen 
      name='Signup'
      component={Signuppage}
      options={{headerShown:false}}>
      </Stack.Screen>


    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    fontFamily: "semibold",
    fontSize: 20,
  }
});
