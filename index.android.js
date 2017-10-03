/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Home from './src/home';

Navigation.startSingleScreenApp({
  screen: Home
});
