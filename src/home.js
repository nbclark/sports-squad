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

import Invite from './invite'
import ContactList from './contacts'

const padding = 7;
const width = ((Dimensions.get("window").width) - padding) / 2;


class Home extends Component {
  onPress = (sport) => {
    Navigation.showModal({
      screen: "Invite", // unique ID registered with Navigation.registerScreen
      title: "Invite", // title of the screen as appears in the nav bar (optional)
      passProps: {
        sport,
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: Invite.navigatorButtons, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.block} onPress={this.onPress.bind(this, 'tennis')}>
            <Text style={styles.label}>🎾</Text>
            <Text style={styles.labelSmall}>Tennis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.block}>
            <Text style={styles.label}>⛳️</Text>
            <Text style={styles.labelSmall}>Golf</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.block}>
            <Text style={styles.label}>🏀</Text>
            <Text style={styles.labelSmall}>Basketball</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.block}>
            <Text style={styles.label}>⚽️</Text>
            <Text style={styles.labelSmall}>Soccer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.otherBlock}>
          <Text style={styles.otherLabel}>🎯🚴🏇</Text>
          <Text style={styles.otherLabelSmall}>Other?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  row: {
    marginVertical: padding,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  block: {
    backgroundColor: 'white',
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: padding,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 80,
    fontWeight: '600',
  },
  labelSmall: {
    marginTop: 10,
    textAlign: 'center',
    color: '#444',
    fontSize: 20,
    fontWeight: '600',
  },
  otherBlock: {
    backgroundColor: 'white',
    marginHorizontal: padding,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 60,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  otherLabel: {
    textAlign: 'center',
    color: '#000',
    fontSize: 40,
    fontWeight: '600',
  },
  otherLabelSmall: {
    textAlign: 'center',
    color: '#444',
    fontSize: 20,
    fontWeight: '600',
  },
});

Navigation.registerComponent('Home', () => Home);
export default {
  screen: 'Home',
  title: 'Sports Squad'
};
