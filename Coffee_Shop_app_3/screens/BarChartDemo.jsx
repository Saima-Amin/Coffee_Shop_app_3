import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../firebase/firebase.config'; // Make sure Firebase is properly initialized

const BarChartDemo = () => {
  const { width } = useWindowDimensions();
  const [ratingsData, setRatingsData] = useState([0, 0, 0, 0, 0]);  // Initial state for the ratings frequency
  
  useEffect(() => {
    // Function to fetch and count the ratings
    const fetchRatings = async () => {
      try {
        const ratingSnapshot = await getDocs(collection(db, 'rating'));
        const ratingList = ratingSnapshot.docs.map(doc => doc.data().rate);
        
        // Initialize an array to store counts of ratings 1 to 5
        const counts = [0, 0, 0, 0, 0]; // indices 0 to 4 represent ratings 1 to 5
        
        // Count the frequency of each rating
        ratingList.forEach(rate => {
          if (rate >= 1 && rate <= 5) {
            counts[rate - 1] += 1;  // Increment the count for the respective rating
          }
        });

        setRatingsData(counts); // Update the state with the frequency of each rating
      } catch (error) {
        console.error("Error fetching ratings: ", error);
      }
    };

    fetchRatings();  // Call the function to fetch ratings when the component mounts
  }, []);

  const barChartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],  // Labels for the ratings
    datasets: [
      {
        data: ratingsData,  // Data is the frequency of each rating
        colors: [
          (opacity = 1) => '#AB8C56',
          (opacity = 1) => '#AB8C56',
          (opacity = 1) => '#AB8C56',
          (opacity = 1) => '#AB8C56',
          (opacity = 1) => '#AB8C56'
        ]
      }
    ]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}><Text style={styles.label}>Date and Time: </Text>{new Date().toLocaleString()}</Text>
      </View>

      <Text style={styles.chartTitle}>Rating vs Frequency</Text>
      <BarChart
        data={barChartData}
        yAxisSuffix=" times"
        width={width - 40}  // Add more margin for better design
        height={350}
        chartConfig={{
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
          barPercentage: 0.5,
          fillShadowGradient: '#AB8C56',  // Use a color that matches the rating stars
          fillShadowGradientOpacity: 0.8,
          decimalPlaces: 0,
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#e3e3e3',
            strokeDasharray: '0',
          },
          propsForLabels: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#3A3D42', // Darker shade for text consistency
          }
        }}
        style={styles.chartStyle}
        showValuesOnTopOfBars
        showBarTops={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detail: {
    fontSize: 16,
    color: '#3A3D42',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A3D42',
    textAlign: 'center',
    marginVertical: 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#AB8C56',
    borderWidth: 1,
  },
});

export default BarChartDemo;
