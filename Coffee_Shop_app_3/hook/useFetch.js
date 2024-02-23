import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get('http://192.168.226.215:3000/api/products')
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            console.warn(error)
            setError(error)
        }finally{
         setError(error);
         setIsLoading(false);
        }
    }

    useEffect(()=>{
       fetchData();
    }, []);


    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };


  return {data, isLoading, error, refetch};
};

export default useFetch;