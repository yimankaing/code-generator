import React from 'react';
import {ScrollView, Text, View, NativeModules, ToastAndroid, Alert, TouchableOpacity} from 'react-native';
import {Toolbar, COLOR, ActionButton} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-material-dropdown';
import {TextField} from 'react-native-material-textfield';
import BarcodeBuilder from 'react-native-barcode-builder';
import QRCodeBuilder from 'react-native-qrcode';
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import Container from "../../components/Container";
import {uiTheme} from "../../constants";

const PrinterManager = NativeModules.PrinterManager;
const imageType = "png";
const imagePath = `${RNFS.ExternalDirectoryPath}/image.${imageType}`;

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
        height: 120
      };
      this.setState((prevState) => ({
        codes: [...prevState.codes, data]
      }));
    } else {
      ToastAndroid.show('Value cannot be empty', ToastAndroid.SHORT)
    }
  };
  removeBarcode = (index) => {
    Alert.alert(null, 'Delete barcode?', [
      {text: 'Cancel', onPress: () => null, style: 'cancel'},
      {
        text: 'OK', onPress: () => {
          this.state.codes.splice(index, 1);

          this.setState((prevState) => ({
            codes: prevState.codes
          }), () => {
            ToastAndroid.show('Deleted', ToastAndroid.SHORT)
          })
        }
      }
    ]);
  };
  print = async () => {
    if (this.state.codes.length > 0) {
      Alert.alert(null, 'Print barcode?', [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {
          text: 'OK', onPress: () => {
            this.refs.viewShot.capture().then(uri => {
              RNFS.moveFile(uri, imagePath)
                .then(() => {
                  PrinterManager.printInvoice(imagePath, (res) => {
                    if (res === 'connected') {
                      ToastAndroid.show('Success', ToastAndroid.SHORT)
                    }
                  });
                })
                .catch((err) => {
                  ToastAndroid.show(err.message, ToastAndroid.SHORT)
                });
            });
          }
        },
      ]);
    } else {
      ToastAndroid.show('Barcode is empty', ToastAndroid.SHORT)
    }
  };
  _barcodeBuilder = () => {
    return this.state.codes.map((o, i) => {
      return (
        <TouchableOpacity
          style={{backgroundColor: '#fff'}}
          key={i}
          onLongPress={() => this.removeBarcode(i)}
        >
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
        </TouchableOpacity>
      )
    });
  };

  render() {
    return (
      <Container statusBarBackgroundColor={uiTheme.palette.primaryColor}>
        <Toolbar
          centerElement={"Barcode"}
          style={{
            paddingBottom: 16,
          }}
          rightElement={{
            menu: {
              icon: "more-vert",
              labels: ["Disconnect"]
            }
          }}
          onRightElementPress={(label) => {
            label.index === 0 ? PrinterManager.disconnect() : null
          }}
        />
        <Creation tintColor={uiTheme.palette.primaryColor}
                  generateCode={this.generateCode}
        />

        <ScrollView style={{flex: 1}}>
          <ViewShot ref="viewShot"
                    options={{format: imageType, quality: 0.9}}>
            {this._barcodeBuilder()}
          </ViewShot>
        </ScrollView>
        <ActionButton icon={"print"} onPress={() => this.print()}/>
      </Container>
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