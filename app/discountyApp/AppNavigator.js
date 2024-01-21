import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from './LocationScreen';
import StoreDetailsScreen from './StoreDetailsScreen';
import SettingsScreen from './SettingsScreen';
import { SettingsContext } from './SettingsContext';
import ContactScreen from './ContactScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { mode } = useContext(SettingsContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreDetails"
          component={StoreDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;