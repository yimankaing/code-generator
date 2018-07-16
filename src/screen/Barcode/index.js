import React from 'react';
import {ScrollView, Text, View, TextInput, ToastAndroid} from 'react-native';
import {Subheader, Card, ListItem, COLOR, RippleFeedback, IconToggle} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-material-dropdown';
import {TextField} from 'react-native-material-textfield';
import BarcodeBuilder from 'react-native-barcode-builder';
import QRCodeBuilder from 'react-native-qrcode';

export default class Barcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: []
    }
  }

  generateCode = (value) => {
    if (!!value.input) {
      const data = {
        value: value.input,
        type: value.type,
        format: "CODE128",
        height: 65
      };
      this.setState((prevState) => ({
        codes: [...prevState.codes, data]
      }));
    } else {
      ToastAndroid.show('Value cannot be empty', ToastAndroid.SHORT)
    }
  };

  _barcodeBuilder = () => {
    return this.state.codes.map((o, i) => {
      return (
        <View style={{backgroundColor: '#fff'}} key={i}>
          {
            o.type === 'Barcode' ?
              <BarcodeBuilder value={o.value}
                              format={o.format}
                              text={o.value}
                              height={o.height}
                              onError={() => ToastAndroid.show('No value', ToastAndroid.SHORT)}
              />
              :
              <View style={{alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                <QRCodeBuilder
                  value={o.value}
                  size={165}
                />
                <Text style={{color: "#000", padding: 3}}>{o.value}</Text>
              </View>
          }

        </View>
      )
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Creation tintColor={this.props.tintColor}
                  generateCode={this.generateCode}
        />
        <ScrollView style={{flex: 1}}>
          {this._barcodeBuilder()}
        </ScrollView>
      </View>
    )
  }
}

class Creation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.types = [
      {value: 'Barcode'},
      {value: 'QRCode'}
    ];
    this.state = {
      input: null,
      type: this.types[0].value,
    };
  }

  render() {
    const {input, type} = this.state;
    const {tintColor, generateCode} = this.props;
    const height = 72;
    return (

      <View style={{
        paddingRight: 16,
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
        <View style={{
          flex: 0.5,
          height: height,
          justifyContent: 'center',
        }}>
          <Dropdown
            containerStyle={{height: 68, paddingRight: 5}}
            label={"Type"}
            value={type}
            data={this.types}
            onChangeText={(value, index) => this.setState({type: value})}
          />
        </View>
        <View style={{flex: 1, height: height}}>
          <TextField
            tintColor={tintColor}
            error={input !== '' ? "" : "Value is required"}
            label='Value'
            onChangeText={(input) => this.setState({input})}
            selectTextOnFocus={true}
            onSubmitEditing={() => generateCode({input, type})}
          />
        </View>

      </View>
    );
  }
}