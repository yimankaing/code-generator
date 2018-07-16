import React from 'react';
import {Text, View} from 'react-native';

export default class QRCode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>QRCode</Text>
      </View>
    )
  }
}