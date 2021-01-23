import { StatusBar } from 'expo-status-bar';
import React from 'react';

import * as firebase from 'firebase'
const firebaseConfig = require('./env.js');

//make sure app isn't already initialized
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native'; //need for routes
import { createStackNavigator } from '@react-navigation/stack'; //need for routes

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
