import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './productList.style';
import useFetch from '../../hook/useFetch';
import { Colors, Sizes } from '../../constants';
import ProductCardView from './ProductCardView';

const ProductList = () => {
  const { data, isLoading, error } = useFetch();
  const [visibleItems, setVisibleItems] = useState(6); // Start by showing 6 items
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Track loading more items

  const handleSeeMore = () => {
    // Increment visible items by 2, but do not exceed the length of the data array
    setVisibleItems((prevVisibleItems) => Math.min(prevVisibleItems + 2, data.length));
  };

  const handleEndReached = () => {
    if (!isFetchingMore && visibleItems < data.length) {
      setIsFetchingMore(true);
      // Simulate a slight delay for loading more data
      setTimeout(() => {
        setVisibleItems((prevVisibleItems) => Math.min(prevVisibleItems + 2, data.length));
        setIsFetchingMore(false);
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={Sizes.large} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice(0, visibleItems)} // Only show the visible items
        numColumns={2}
        renderItem={({ item }) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={handleEndReached} // Trigger more loading when end is reached
        onEndReachedThreshold={0.5} // Trigger when the user is halfway down the list
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : null
        } // Show loading indicator when fetching more data
      />
      {visibleItems < data.length && !isFetchingMore && ( // Show "See More" button only if there are more items and not fetching
        <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductList;
