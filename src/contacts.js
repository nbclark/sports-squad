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
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Contacts from 'react-native-contacts';

class ContactList extends Component {
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
    this.state = { contacts: [] };
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'close') { // this is the same id field from the static navigatorButtons definition
        Navigation.dismissModal();
      }
    }
  }

  componentDidMount() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // x.x
      } else {
        this.setState({ contacts });
      }
    })
  }

  render() {
    return (<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View>
        {this.state.contacts.map(c => (
          <Text key={c.recordID} style={styles.header}>{JSON.stringify(c, 2, 2)}</Text>
        ))}
      </View>
    </ScrollView>)
  }
}

Navigation.registerComponent('ContactList', () => ContactList);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
  },
});