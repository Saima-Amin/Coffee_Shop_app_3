import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Colors } from '../constants';
import { BackBtn } from '../components';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Failed to fetch location. Please try again later.');
        setLoading(false);
      }
    };

    getPermissionAndLocation();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const API_KEY = '68b6d6acd8fbe078d54eecc8971d7b40'; // Replace with your OpenWeather API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert('Error', 'Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackBtn style={{ top: 50 }} onPress={() => navigation.goBack()} />
      {location ? (
        <MapView
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={location} title="Your Location" />
        </MapView>
      ) : (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Weather at your location:</Text>
          <Text style={styles.weatherText}>Weather: {weather.weather[0].main}</Text>
          <Text style={styles.weatherText}>Description: {weather.weather[0].description}</Text>
          <Text style={styles.weatherText}>Temperature: {weather.main.temp}°C</Text>
          <Text style={styles.weatherText}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.weatherText}>Wind Speed: {weather.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
  weatherContainer: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 5,
},
weatherText: {
    fontFamily: "regular",
    color: Colors.black,
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
})