import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import {Button, COLOR, Toolbar, getTheme, ThemeContext} from 'react-native-material-ui';
//components
import {Container} from '../components';
//screens
import Screen from '../screen';
//const
import {uiTheme} from '../constants';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        key: 'barcode',
        screen: Screen.Barcode,
        icon: 'movie',
        label: 'Barcode',
        barColor: '#388E3C',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      {
        key: 'qrcode',
        screen: Screen.QRCode,
        icon: 'movie',
        label: 'QR Code',
        barColor: '#B71C1C',
        pressColor: 'rgba(255, 255, 255, 0.16)'
      },
      // {
      //   key: 'settings',
      //   screen: Screen.Settings,
      //   icon: 'settings',
      //   label: 'Settings',
      //   barColor: '#2589e9',
      //   pressColor: 'rgba(255, 255, 255, 0.16)'
      // }
    ];
    this.state = {
      activeTab: this.tabs[0]
    }

  }

  renderIcon = icon => ({isActive}) => (
    <Icon size={24} color="white" name={icon}/>
  );

  renderTab = ({tab, isActive}) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  render() {
    const {activeTab} = this.state;
    uiTheme.toolbar.container.backgroundColor = activeTab.barColor;
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>

        <Container statusBarBackgroundColor={activeTab.barColor}>
          <Toolbar
            centerElement={activeTab.label}
            style={{
              paddingBottom: 16,
            }}
            rightElement={{
              menu: {
                icon: "more-vert",
                labels: ["Printer Connection", "Disconnect"]
              }
            }}
            onRightElementPress={ (label) => { console.log(label) }}
          />
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <this.state.activeTab.screen tintColor={activeTab.barColor}/>
            </View>
            <BottomNavigation
              onTabPress={newTab => {
                this.setState({activeTab: newTab})
              }}
              renderTab={this.renderTab}
              tabs={this.tabs}
              useLayoutAnimation
            />
          </View>
        </Container>
      </ThemeContext.Provider>
    )
  }
}
