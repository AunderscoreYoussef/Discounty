import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from './SettingsContext';

const SettingsScreen = () => {
  const { range, setRange } = useContext(SettingsContext);
  const navigation = useNavigation();

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const handleContactDetails = () => {
    navigation.navigate('Contact');
  };

  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.discountyText}>Discoun%y</Text>
      </View>
      <View style={styles.rangeContainer}>
        <Text style={styles.expandSearchText}>Expand your search:</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.rangeLabel}>Range: {range} meters</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10000}
            step={10} 
            value={range}
            onValueChange={handleRangeChange}
          />
        </View>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactDetails}>
          <Text style={styles.contactButtonText}>Contact Details</Text>
        </TouchableOpacity>
      </View>
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
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 25,
  },
  rangeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -450,
  },
  expandSearchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  sliderContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 15,
  },
  rangeLabel: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    alignSelf: 'center',
  },
  contactButton: {
    backgroundColor: '#54e3b8',
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 115,
    marginTop: 20,
  },
  contactButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;