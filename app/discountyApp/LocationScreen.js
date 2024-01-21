import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingsContext } from './SettingsContext';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const { range } = useContext(SettingsContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {
        console.log('Error fetching location:', error);
        setErrorMsg('Error fetching location');
      }
    };

    getLocationAsync();
  }, []);

  useEffect(() => {
    const checkNearbyStores = async () => {
      try {
        const response = await axios.get('http://[YOUR IPv4]:[DJANGO PORT]/api/stores');
        const stores = response.data;
        const nearbyStores = stores.filter((store) => {
          const storeDistance = calculateDistance(
            location.latitude,
            location.longitude,
            store.latitude,
            store.longitude
          );
          return storeDistance <= range;
        });

        setNearbyStores(nearbyStores);
      } catch (error) {
        console.log('Error checking nearby stores:', error);
      }
    };

    if (location) {
      checkNearbyStores();
    }
  }, [location, range]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    // The Earth's approximate radius in kilometers (6371km)
    const R = 6371;

    // Conver the differences in latitude and longitude from degrees to radians
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    //Apply Haversine formula to calculate the angular distance
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    // Calculate the central angle (angular distance) between the two points
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Calculate the distance in meters by multiplying the central angle with the Earth's radius
    const distance = R * c * 1000;

    // Return the calculated distance in meters
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const renderStoreItem = ({ item }) => {
    const handleStorePress = () => {
      navigation.navigate('StoreDetails', { store: item });
    };

    return (
      <TouchableOpacity style={styles.storeItem} onPress={handleStorePress}>
        <Image source={{ uri: item.picture }} style={styles.storeImage} />
        <Text style={styles.storeName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#555555',
      justifyContent: 'center',
      alignItems: 'center',
    },
    strip: {
      flexDirection: 'row',
      backgroundColor: '#54e3b8',
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
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
    discountyText: {
      color: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 25,
    },
    gearIcon: {
      position: 'absolute',
      right: 10,
      top: 38,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
    },
    storeList: {
      paddingHorizontal: 10,
      paddingTop: 30,
    },
    storeItem: {
      width: itemWidth,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      elevation: 15,
    },
    storeImage: {
      top: 5,
      width: itemWidth - 20,
      height: itemWidth - 20,
      resizeMode: 'cover',
      borderWidth: 0,
      borderColor: '#555555',
    },
    storeName: {
      marginTop: 5,
      textAlign: 'center',
      backgroundColor: '#54e3b8',
      color: '#000000',
      width: itemWidth - 18.5,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: '#555555',
    },
    noStoresContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noStoresText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#ffffff',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.discountyText}>Discoun%y</Text>
        <TouchableOpacity style={styles.gearIcon} onPress={handleSettingsPress}>
          <MaterialCommunityIcons name="cog" size={26} color="black" />
        </TouchableOpacity>
      </View>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <>
          {nearbyStores.length > 0 ? (
            <FlatList
              data={nearbyStores}
              renderItem={renderStoreItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.storeList}
            />
          ) : (
            <View style={styles.noStoresContainer}>
              <Text style={styles.noStoresText}>No stores nearby</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 20;

export default LocationScreen;