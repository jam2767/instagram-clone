import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
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

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    }) //listens for auth changes
  }
  render() { 
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style = {{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
        );
    }
   
    return(
      <View style = {{ flex: 1, justifyContent: 'center'}}>
        <Text>User is logged in</Text>
      </View>
    )
  }
}

export default App