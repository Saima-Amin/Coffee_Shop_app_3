import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';
import BottomtabNavigation from './navigation/BottomtabNavigation';
import { Cart } from './screens';


const Stack = createNativeStackNavigator();


export default function App() {
  const [fonntsLoaded] = useFonts({
    regular: require("./assets/fonts/OpenSans-Regular.ttf"),
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
