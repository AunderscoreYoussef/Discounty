import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const StoreDetailsScreen = ({ route }) => {
  const { store } = route.params;
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(`http://[YOUR IPv4]:[DJANGO PORT]/api/discounts?store_id=${store.id}`);
        const fetchedDiscounts = response.data;
        setDiscounts(fetchedDiscounts);
      } catch (error) {
        console.log('Error fetching discounts:', error);
      }
    };

    fetchDiscounts();
  }, [store]);

  const handleDiscountPress = (url) => {
    Linking.openURL(url);
  };

  const renderDiscountItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.discountItem} onPress={() => handleDiscountPress(item.url)}>
        <Text style={styles.discountUrl}>{item.url}</Text>
        <Text style={styles.discountPrice}>Original Price: {item.original_price}KM</Text>
        <Text style={styles.discountPrice}>Discounted Price: {item.discounted_price}KM</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.address}>{store.address}</Text>
      </View>
      {discounts.length > 0 ? (
        <FlatList
          data={discounts}
          renderItem={renderDiscountItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 20 }}
        />
      ) : (
        <Text style={styles.noDiscountsText}>No discounts available for this store.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555555',
  },
  strip: {
    backgroundColor: '#54e3b8',
    height: 95,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  storeName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 25,
  },
  address: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 5,
  },
  discountItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 15,
  },
  discountUrl: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  discountPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  noDiscountsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 260,
    color: '#ffffff',
  },
});

export default StoreDetailsScreen;