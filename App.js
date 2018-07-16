import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from './src'
import {COLOR, getTheme, ThemeContext} from "react-native-material-ui";
import SplashScreen from 'react-native-splash-screen'
import {uiTheme} from './src/constants';

export default class App extends React.Component {
  componentDidMount(){
    SplashScreen.hide();
  }
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <RootNavigator/>
      </ThemeContext.Provider>
    );
  }
}

