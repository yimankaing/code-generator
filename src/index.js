import React from 'react';
import { Platform } from "react-native";
import {createStackNavigator} from "react-navigation";

import Screen from './screen';

const AppStack = createStackNavigator(
  {
    Index: Screen.Barcode,
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);


export default () => (
    <AppStack />
);

