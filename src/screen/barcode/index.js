import React from 'react';
import {Text, View} from 'react-native';

export default class Barcode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Barcode</Text>
      </View>
    )
  }
}