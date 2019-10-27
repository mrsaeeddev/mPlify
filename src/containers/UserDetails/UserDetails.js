import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userDetailsActions } from '../../actions/UserDetails.action';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c2d9ea",
    height: "100%",
    justifyContent: 'center',
    alignContent:"center",
  },
post:{
  backgroundColor: 'white',
  margin: 5,
  padding: 5,
},
post_title: {
  textTransform: 'capitalize',
  fontWeight: '700',
},
comments_link : {
  flexDirection: 'column', justifyContent: 'flex-end',
  textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationColor: "blue",
  color:'blue',
}
});

class UserDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('param')+"'s Posts",
    };
  };

  componentDidMount() {
    this.props.fetchPostsList(this.props.navigation.state.params.item.id)
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.props.posts_list.length > 0 ? 
           <><FlatList
           data={this.props.posts_list}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item }) => <View style={styles.post}><Text
           style={styles.post_title}
           onPress={() =>
             this.props.navigation.navigate('PostDetails', {
               post: item,
               param: this.props.navigation.state.params.item.name,
             })}
           >{item.title}</Text>
           <Text style={styles.comments_link}>See comments</Text>    
           </View>}
         />
        <Button title="Add Post" /></>
        :  <ActivityIndicator size="large"  color="#2189dc" />
        }
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsList: (userId) => dispatch(userDetailsActions.fetchPostsList(userId))
  }
}

const mapStateToProps = (state) => {
  console.log('State', state);
  let posts_list = state.userDetailsReducer.posts_list;
  return { posts_list }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);