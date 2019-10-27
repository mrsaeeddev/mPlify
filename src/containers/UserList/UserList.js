import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homePageActions } from '../../actions/HomePage.action';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c2d9ea",
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:"center",
  },
  user_list_item: {
    marginTop: 5,
    padding: 7,
    width: 320,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: '2%',
    resizeMode: "cover",
  },
  button: {
    position: 'absolute',
    top: 4,
    right: 7,
    borderRadius: 10,
  },
});

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsersList();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.user_list.length > 0 ? <FlatList
          data={this.props.user_list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TouchableOpacity style={styles.user_list_item}>
            <Image 
              style={styles.image}
              source={require('../../assets/images/user.png')}
            />
            <Text>{item.name}</Text><View style={styles.button}><Button title="View Posts" onPress={() =>
              this.props.navigation.navigate('UserDetails', {
                item: item,
                param: item.name,
              })
            }></Button></View></TouchableOpacity>}
        /> :  <ActivityIndicator size="large"  color="#2189dc" />
        }
        </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersList: () => dispatch(homePageActions.fetchUsersList())
  }
}

const mapStateToProps = (state) => {
  let user_list = state.homePageReducer.user_list;
  return { user_list }
};

UserList.navigationOptions = {
  title: 'User List',
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);