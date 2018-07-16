import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from './src'
import {COLOR, getTheme, ThemeContext} from "react-native-material-ui";
import {uiTheme} from './src/constants';

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator/>
    );
  }
}

