import React from 'react';
import { Platform } from "react-native";
import {createStackNavigator} from "react-navigation";

import Screen from './screen';
import Tab from "./screen/bottomTab";

const AppStack = createStackNavigator(
  {
    Index: Tab,
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);


export default () => (
    <AppStack />
);

