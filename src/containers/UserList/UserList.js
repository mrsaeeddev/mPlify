import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homePageActions } from '../../actions/HomePage.action';

import {
  View,
  Text,
  Button,
  FlatList
} from 'react-native';

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsersList();
    }

    render() {
        console.log(this.props.user_list)
      return (
        <View>
             <FlatList
          data={this.props.user_list}
          renderItem={({item}) => <Button title={item.name}
           onPress={() =>
            this.props.navigation.navigate('UserList', {
              count: this.props.count,
            })
          }
          ></Button>}
          /></View>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersList : () => dispatch(homePageActions.fetchUsersList())
    }
}

const mapStateToProps = (state) => {
    let user_list = state.homePageReducer.user_list;
  return { user_list }
};

export default connect(mapStateToProps,mapDispatchToProps)(UserList);