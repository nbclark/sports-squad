/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';

class Invite extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Close', // for a textual button, provide the button title (label)
        id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ]
  }

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'close') { // this is the same id field from the static navigatorButtons definition
        Navigation.dismissModal();
      }
    }
  }


  render() {
    return (<View style={styles.container}>
      <Text style={styles.header}>{this.props.sport}</Text>
    </View>)
  }
}

Navigation.registerComponent('Invite', () => Invite);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: '#eee',
    paddingTop: 20,
    //flexWrap: 'wrap',
  },
  header: {
    textAlign: 'center',
    color: '#000',
    fontSize: 40,
    fontWeight: '600',
  },
});