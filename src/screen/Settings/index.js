import React from 'react';
import {Text, View} from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Settings</Text>
      </View>
    )
  }
}