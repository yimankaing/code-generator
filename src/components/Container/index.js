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
        {/*<View style={{*/}
          {/*height: StatusBar.currentHeight,*/}
          {/*backgroundColor: statusBarBackgroundColor || "#000"*/}
        {/*}}/>*/}
        <StatusBar
          barStyle={"light-content"}
          animated
          showHideTransition={'fade'}
          translucent={false} backgroundColor="rgba(0, 0, 0, 1)"
        />
        {this.props.children}
      </View>
    );
  }
}

Container.propTypes = propTypes;

export default Container;