import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Alert,
  Button
} from 'react-native';

import { postDetailsActions } from '../../actions/PostDetails.action';

const styles = StyleSheet.create({
  modal_heading: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '700',
  },
  modal: {
    width: 320,
    maxHeight: 260,
    marginTop: 30,
    backgroundColor: 'white',
  },
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
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
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
  },
  input_field: {
    height: 35,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 13,
    borderColor: 'gray',
    borderRadius: 7,
    borderWidth: 1
  },
  textarea_field: {
    height: 80,
    borderRadius: 7,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
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
      comments: [],
      showComments: true,
      modalVisible: false,
      name: '',
      email: '',
      body: ''
    }
  }

  addComment = () => {
    let postId = this.props.navigation.state.params.post.id;
    let comment = {
      postId: this.props.navigation.state.params.post.id,
      id: this.props.comments_list.length + 1,
      name: this.state.name,
      email: this.state.email,
      body: this.state.body,
    }

    if (comment.postId == "" || comment.id == "" || comment.name == "" || comment.email == "" || comment.email == "") {
      Alert.alert("Please fill all fields");
    }
    else {
      this.props.addComment(postId, comment);
      this.setState({
        name: '',
        email: '',
        body: ''
      });
      this.setState({ modalVisible: false });
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

  toggleModal = (status) => {
    this.setState({ modalVisible: status });
  }

  componentDidMount() {
    this.props.fetchCommentsList(this.props.navigation.state.params.post.id)
    this.setState()
  }

  toggleCommentsVisibility = () => {
    this.setState({ showComments: !this.state.showComments });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.modalVisible} style={styles.modal}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modal_heading}>Add Comment</Text>
            <TextInput
              style={styles.input_field}
              placeholder="Name"
              autoCompleteType="name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput
              style={styles.input_field}
              placeholder="Email"
              autoCompleteType="email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={styles.textarea_field}
              placeholder="Body"
              multiline={true}
              numberOfLines={6}
              onChangeText={body => this.setState({ body })}
              value={this.state.body}
            />
            <View style={styles.btn_container}>
              <View style={styles.button}>
                <Button onPress={() => this.toggleModal(false)} title="Cancel"></Button>
              </View>
              <View style={styles.button}>
                <Button onPress={() => this.addComment()} title="Add"></Button>
              </View>
            </View>
          </View>
        </Modal>
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
                  >{item.name}</Text>}
                />
                <Button onPress={() => {
                  this.toggleModal(true);
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
    addComment: (postId, comment) => dispatch(postDetailsActions.addComment(postId, comment)),
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