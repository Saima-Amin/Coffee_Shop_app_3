import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../firebase/firebase.config'

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const productSnapshot = await firebase.firestore().collection('products').get();
            // Create an array to store product data
            const productsData = [];

            // Iterate over the documents in the snapshot
            productSnapshot.forEach(doc => {
                // Access the data of each document using doc.data()
                const productData = doc.data();

                // Push the product data to the array
                productsData.push(productData);
            });

            // Set the array of product data to the state variable
            setData(productsData);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };


    return { data, isLoading, error, refetch };
};

export default useFetch;