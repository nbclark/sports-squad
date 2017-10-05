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
  TouchableOpacity,
  AsyncStorage,
  Button,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Swipeout from 'react-native-swipeout';


class Invite extends Component {
  static navigatorButtons = {
    // leftButtons: [
    //   {
    //     title: '+', // for a textual button, provide the button title (label)
    //     id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //   },
    // ],
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
    this.state = { groups: [] };
  }

  componentWillMount() {
    const groupData = AsyncStorage.getItem(`groups_${this.props.sport}`);
    let groups = [];
    if (groupData && groupData.map) {
      groups = groupData.map(g => ({ ...g }));
    }
    groups = [{ key: '123', text: 'Sunday Tennis' }];

    const groupsWithAdd = groups.concat([{
      key: '+', text: 'Add new group...', disableDelete: true,
      onPress: this.onAddGroup
    }]);

    const data = groupsWithAdd.map(g => (
      {
        key: g.key, text: g.text,
        right: !g.disableDelete ? [
          {
            text: 'Remove',
            onPress: function () { alert('button pressed') },
            type: 'delete',
          }
        ] : null,
        onPress: g.onPress || this.onGroupPress
      }
    ));

    //  datasource rerendered when change is made (used to set swipeout to active)
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

    this.state = {
      dataSource: ds.cloneWithRows(data),
      sectionID: null,
      rowID: null,
    };
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'close') { // this is the same id field from the static navigatorButtons definition
        Navigation.dismissModal();
      } else if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
        this.onAddGroup();
      }
    }
  }

  onAddGroup = () => {
    Navigation.showModal({
      screen: "ContactList", // unique ID registered with Navigation.registerScreen
      title: "Contact List", // title of the screen as appears in the nav bar (optional)
      passProps: {
        sport: this.props.sport,
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: Invite.navigatorButtons, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }

  buttonPress = () => {
  }

  render() {
    // const listItems = this.state.groups.concat({ title: '+' });
    // const data = [
    //   { key: 1, label: 'Label 1', leftLabel: 'Left 1', rightLabel: 'Right 1' },
    //   { key: 2, label: 'Label 2', leftLabel: 'Left 2', rightLabel: 'Right 2' },
    //   { key: 3, label: 'Label 3', leftLabel: 'Left 3', rightLabel: 'Right 3' },
    //   { key: 4, label: 'Label 4', leftLabel: 'Left 4', rightLabel: 'Right 4' },
    //   { key: 5, label: 'Label 5', leftLabel: 'Left 5', rightLabel: 'Right 5' },
    // ];
    return (<View style={styles.container}>
      <Text style={styles.header}>{this.props.sport}</Text>
      <ListView
        scrollEnabled
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => <Swipeout
          close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
          left={rowData.left}
          right={rowData.right}
          rowID={rowID}
          sectionID={sectionID}
          autoClose={rowData.autoClose}
          backgroundColor={rowData.backgroundColor}
          onOpen={(sectionID, rowID) => {
            this.setState({
              sectionID,
              rowID,
            })
          }}
          onClose={() => console.log('===close')}
          scroll={event => console.log('scroll event')}
        >
          <TouchableWithoutFeedback onPress={rowData.onPress}>
            <View style={styles.li} >
              <Text style={styles.liText}>{rowData.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>}
      />
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
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  }
});