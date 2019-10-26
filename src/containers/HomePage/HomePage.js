import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Button
} from 'react-native';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <View>
          <Button
          title="User List"
          onPress={() =>
            this.props.navigation.navigate('UserList', {
              count: this.props.count,
            })
          }
          ></Button>
          </View>
      )
    }
}

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

export default connect(mapStateToProps)(HomePage);