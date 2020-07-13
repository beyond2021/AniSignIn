import { StatusBar } from 'expo-status-bar';


import {Asset} from 'expo-asset'
import {AppLoading} from 'expo'

import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import * as firebase from 'firebase'

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user =>{
            this.props.navigation.navigate(user ? 'App' : "Auth")
        })

    }
      constructor(){
    super()

    //Determine whether the app is ready to show the image or not.
    this.state={
      isReady: false
    }

  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../assets/Killing_Viruses_-_Finding_the_Cure_-_Coronavirus.jpg'),
    ]);

    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets]);
  }


      render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
      }
      return<View></View>
    // return <CovidCare />
    // return<SignUp />
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})