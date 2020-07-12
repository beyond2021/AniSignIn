import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset'
import {AppLoading} from 'expo'
import CovidCare from './app/index'


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default class App extends React.Component{

  constructor(){
    super()

    //Determine whether the app is ready to show the image or not.
    this.state={
      isReady: false
    }

  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/Killing_Viruses_-_Finding_the_Cure_-_Coronavirus.jpg'),
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
    return <CovidCare />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
