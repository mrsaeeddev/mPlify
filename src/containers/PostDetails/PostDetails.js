import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../../components/Modal/Modal'

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button
} from 'react-native';
import { postDetailsActions } from '../../actions/PostDetails.action';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c2d9ea",
    height: "100%",
  },
  post_details: {
    backgroundColor: 'white',
    width: "94%",
    margin: 10,
    borderRadius: 10,
    padding: 8,
  },
  post_heading: {
    textTransform: 'capitalize',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: "700",
  },
  btn_container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: '40%',
  },
  com_container: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
  },
  com_heading: {
    fontSize: 24,
    paddingTop: 7,
    marginLeft: 7,
  },
  comment: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "blue",
  },
  loader: {
    marginTop: '50%',
    justifyContent: 'center',
    alignContent: "center",
  }
});

class PostDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('param') + "'s Post",
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      modalVisible: false,
    }
  }

  removePost = (postId) => {
    Alert.alert(
      "Are you sure to remove this post?",
      "Tap OK to proceed",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.deletePost(this.props.navigation.state.params.post.id) }
      ],
      { cancelable: false }
    );
  }

  addComment = (visible) => {
      this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.props.fetchCommentsList(this.props.navigation.state.params.post.id)
  }

  toggleCommentsVisibility = () => {
    this.setState({ showComments: !this.state.showComments });
  }

  render() {
    console.log(this.props, 'Props');
    return (
      <View style={styles.container}>
        <ModalComponent modalVisible={this.state.modalVisible} />
        <View style={styles.post_details}>
          <Text style={styles.post_heading}>{this.props.navigation.state.params.post.title}</Text>
          <Text>{this.props.navigation.state.params.post.body}</Text>
        </View>
        <View style={styles.btn_container}>
          <View style={styles.button}>
            <Button onPress={() => this.toggleCommentsVisibility()} title={(this.state.showComments ? `Hide` : `Show`) + ' Comments'} />
          </View>
          <View style={styles.button} >
            <Button onPress={() => this.removePost(this.props.navigation.state.params.post.id)} title="Remove Post" />
          </View>
        </View>
        {this.state.showComments &&
          <>
            {this.props.comments_list.length > 0 ?
              <View>
                <Text style={styles.com_heading}>Comments</Text>
                <FlatList
                  style={styles.com_container}
                  data={this.props.comments_list}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <Text
                    style={styles.comment}
                    onPress={() =>
                      this.props.navigation.navigate('PostDetails', {
                        post: item,
                        param: this.props.navigation.state.params.item.name,
                      })
                    }
                  >{item.name}</Text>}
                />
                <Button onPress={() => {
            this.addComment(true);
          }} title="Add comment" ></Button>
              </View>
              : <ActivityIndicator style={styles.loader} size="large" color="#2189dc" />
            }
          </>}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCommentsList: (postId) => dispatch(postDetailsActions.fetchCommentsList(postId)),
    deletePost: (postId) => dispatch(postDetailsActions.deletePost(postId)),
  }
}

const mapStateToProps = (state) => {
  let comments_list = state.postDetailsReducer.comments_list;
  let response = state.postDetailsReducer.response;
  return {
    comments_list,
    response
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);