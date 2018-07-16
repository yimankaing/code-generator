import {View, StyleSheet, StatusBar} from 'react-native';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  statusBarBackgroundColor: PropTypes.string,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {statusBarBackgroundColor} = this.props;
    return (
      <View style={styles.container}>
        <View style={{
          height: StatusBar.currentHeight,
          backgroundColor: statusBarBackgroundColor || "#000"
        }}/>
        <StatusBar
          barStyle={"light-content"}
          animated
          showHideTransition={'fade'}
          translucent={true} backgroundColor="rgba(0, 0, 0, 0.3)"
        />
        {this.props.children}
      </View>
    );
  }
}

Container.propTypes = propTypes;

export default Container;