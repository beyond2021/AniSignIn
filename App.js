import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset'
import {AppLoading} from 'expo'
import LoginScreen from './auth/LoginScreen'
import RegisterScreen from './auth/RegisterScreen'
import LoadingScreen from './auth/LoadingScreen'
import HomeScreen from './auth/HomeScreen'


import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBFcT2nfjrJ9vjvBpBf_6WVRXpIm0l6MB8",
  authDomain: "covidcare-79c01.firebaseapp.com",
  databaseURL: "https://covidcare-79c01.firebaseio.com",
  projectId: "covidcare-79c01",
  storageBucket: "covidcare-79c01.appspot.com",
  messagingSenderId: "167539698380",
  appId: "1:167539698380:web:7b2fffb68b76f353033069",
  measurementId: "G-BWGBBR3VW5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  // Login: LoginScreen,
  
  // Register: RegisterScreen
  
  Login : {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register : {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },


})


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default createAppContainer (
  createSwitchNavigator ({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
     initialRouteName: "Loading"
  }
  
  )
)


// export default class App extends React.Component{

//   constructor(){
//     super()

//     //Determine whether the app is ready to show the image or not.
//     this.state={
//       isReady: false
//     }

//   }

//   async _loadAssetsAsync() {
//     const imageAssets = cacheImages([
//       require('./assets/Killing_Viruses_-_Finding_the_Cure_-_Coronavirus.jpg'),
//     ]);

//     // const fontAssets = cacheFonts([FontAwesome.font]);

//     await Promise.all([...imageAssets]);
//   }



//   render(){
//     if (!this.state.isReady) {
//       return (
//         <AppLoading
//           startAsync={this._loadAssetsAsync}
//           onFinish={() => this.setState({ isReady: true })}
//           onError={console.warn}
//         />
//       );
//       }
//       return<View></View>
//     // return <CovidCare />
//     // return<SignUp />
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
