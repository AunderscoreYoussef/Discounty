import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.discountyText}>Discoun%y</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Contact Details</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>discountyCustomer@example.com</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>123-456-7890</Text>
        </View>
        <Text style={styles.message}>We'd love to hear from you :)</Text>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: '#ffffff',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.5,
    marginTop: 20,
  },
});

export default ContactScreen;