import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/Tabs';
import {Restaurants, OrderDelivery} from './screens';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
        }}
        initialRouteName={"home"}
      >
        <Stack.Screen name="home" component={Tabs}/>
        <Stack.Screen name="restaurants" component={Restaurants}/>
        <Stack.Screen name="orderDelivery" component={OrderDelivery}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
