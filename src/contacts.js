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
  ListView,
  TextInput,
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
    this.state = { contacts: [], filteredContacts: {}, selectedIds: {} };
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
        const contactsWithSearch = contacts.map((c) => ({ ...c, searchText: `${c.familyName || ''} ${c.givenName || ''}`.toLowerCase() }));
        const groupedNames = this.mapContacts(contactsWithSearch);
        this.setState({ contacts: contactsWithSearch, filteredContacts: groupedNames });
      }
    })
  }

  mapContacts = (contacts) => {
    return contacts.
      sort((c1, c2) => c1.familyName.toUpperCase() < c2.familyName.toUpperCase() ? -1 : 1)
      .reduce((group, c) => {
        const lastInitial = (c.familyName || ' ').toUpperCase()[0];
        if (!group[lastInitial]) {
          group[lastInitial] = [];
        }
        group[lastInitial].push({ ...c, selected: this.state.selectedIds[c.recordID] });
        return group;
      }, {});
  }

  onSearchChange = (text) => {
    const search = text.toLowerCase();
    const filteredContacts = this.mapContacts(this.state.contacts.filter(c => {
      return !search || c.searchText.indexOf(search) >= 0;
    }));
    console.log(text);
    console.log(filteredContacts);
    this.setState({ search: text, filteredContacts });
  }

  toggleSelection = (data) => {
    const selectedIds = { ...this.state.selectedIds };
    const id = data.recordID;

    if (selectedIds[id]) {
      delete selectedIds[id];
    } else {
      selectedIds[id] = data;
    }

    if (Object.keys(selectedIds).length > 0) {
      this.props.navigator.setButtons({
        leftButtons: [{
          title: 'Save', // for a textual button, provide the button title (label)
          id: 'save', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }],
        animated: true // does the change have transition animation or does it happen immediately (optional)
      });
    } else {
      this.props.navigator.setButtons({
        leftButtons: [],
        animated: true // does the change have transition animation or does it happen immediately (optional)
      });
    }

    this.setState({ selectedIds }, () =>
      this.onSearchChange('')
    );
  }

  _renderCellComponent = (data) => {
    const style = data.selected ? { backgroundColor: 'blue' } : null;
    return (
      <TouchableOpacity style={[styles.cell, style]} onPress={() => this.toggleSelection(data)}>
        <View style={[styles.placeholderCircle, {}]}>
          <Text style={styles.placeholderCircleText}>{data.givenName[0]}{data.familyName[0]}</Text>
        </View>
        <Text style={styles.name}>
          {data.givenName} {data.familyName}
        </Text>
      </TouchableOpacity>
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
    console.log('render');
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address" onChangeText={this.onSearchChange} value={this.state.search} placeholder="..." style={{ borderWidth: 1, padding: 10 }} />
        <AtoZList
          sectionHeaderHeight={20}
          cellHeight={60}
          data={this.state.filteredContacts}
          renderCell={this._renderCellComponent}
          renderSection={this._renderSectionComponent}
        >
        </AtoZList>
      </View>)
  }
}

Navigation.registerComponent('ContactList', () => ContactList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});