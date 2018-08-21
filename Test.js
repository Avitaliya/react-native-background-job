import React, { Component } from 'react';
import {
  Text,
  View, AppRegistry, TouchableHighlight, ToastAndroid
} from 'react-native';
import BackgroundJob from 'react-native-background-job';

const regularJobKey = "regularJobKey";

BackgroundJob.register({
  jobKey: regularJobKey,
  job: () => {
      ToastAndroid.show(`latitude = 21.22980182 & longitude = 72.8664564`, ToastAndroid.LONG);
      fetch('http://192.168.0.21/index.php',{
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
          }),
          body: `lat=21.22980182&long=72.8664564`
      })
      .then((response) => response.json())
      .then((response) => {
          console.log('Response : ' + response);
      })
      .catch((error) => {
          console.log('Netwoek Exception : ' , error);
      })
  }
});

export default class App extends Component<Props> {

  getLocation()
  {
        navigator.geolocation.watchPosition(
          position => {
              fetch('http://192.168.0.21/index.php',{
                  method: 'POST',
                  headers: new Headers({
                      'Content-Type': 'application/x-www-form-urlencoded',
                  }),
                  body: `lat=${position.coords['latitude']}&long=${position.coords['longitude']}`
              })
              .then((response) => response.json())
              .then((response) => {
                  console.log('Response : ' + response);
              })
              .catch((error) => {
                  console.log('Netwoek Exception : ' , error);
              })
          },
          error => {
              console.log('error',error);
          },
          {
              enableHighAccuracy: true,
              timeout: 2000,
              maxAge: 0
          }

        );


  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <TouchableHighlight
            onPress={() => {
              BackgroundJob.schedule({
                jobKey: regularJobKey,
                timeout: 5000,
                period: 5000
              });
            }}
            style={{padding: 15}}
          >
            <Text>Schedule Location Service</Text>
  </TouchableHighlight>

      </View>
    );
  }
}


AppRegistry.registerComponent("App", () => App);