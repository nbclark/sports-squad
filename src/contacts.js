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
import AtoZList from 'react-native-atoz-list';

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
    this.state = { contacts: {} };
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
        const groupedNames = contacts
          .sort((c1, c2) => c1.familyName.toUpperCase() < c2.familyName.toUpperCase() ? -1 : 1)
          .reduce((group, c) => {
            const lastInitial = (c.familyName || ' ').toUpperCase()[0];
            if (!group[lastInitial]) {
              group[lastInitial] = [];
            }
            group[lastInitial].push(c);
            return group;
          }, {});
        this.setState({ contacts: groupedNames });
      }
    })
  }

  _renderCellComponent = (data) => {
    return (
      <View style={styles.cell}>
        <View style={[styles.placeholderCircle, {}]}>
          <Text style={styles.placeholderCircleText}>{data.givenName[0]}{data.familyName[0]}</Text>
        </View>
        <Text style={styles.name}>
          {data.givenName} {data.familyName}
        </Text>
      </View>
    );
  };

  _renderSectionComponent = (data) => {
    return (
      <View style={{ height: 35, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10 }}>
        <Text>{data.sectionId}</Text>
      </View>
    )
  };

  render() {
    return (<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View>
        <AtoZList
          sectionHeaderHeight={20}
          cellHeight={60}
          data={this.state.contacts}
          renderCell={this._renderCellComponent}
          renderSection={this._renderSectionComponent}
        >
        </AtoZList>
      </View>
    </ScrollView >)
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
  swipeContainer: {
  },
  alphabetSidebar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#444',
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderCircleText: {
    color: '#eee',
    fontSize: 18,
    fontWeight: '600',
  },
  name: {
    fontSize: 15,
  },
  cell: {
    height: 95,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});