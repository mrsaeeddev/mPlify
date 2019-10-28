import { userDetailsConstants } from "../constants";
import { userDetailsService } from "../services";
import { Alert } from 'react-native';

export const userDetailsActions = {
  fetchPostsList,
  addPost,
}

function fetchPostsList(userId) {
  return dispatch => {
    dispatch(request());
    userDetailsService.fetchPostsList(userId).then(
      posts_list => {
        dispatch(success(posts_list));
      },
      posts_list => dispatch(failure(posts_list.toString()))
    );
  };

  function request() {
    return { type: userDetailsConstants.USER_DETAILS_REQUEST };
  }
  function success(posts_list) {
    return { type: userDetailsConstants.USER_DETAILS_SUCCESS, posts_list };
  }
  function failure(posts_list) {
    return { type: userDetailsConstants.USER_DETAILS_FAILURE, posts_list };
  }
}

function addPost(userId, post) {
  return dispatch => {
    dispatch(request());
    userDetailsService.addPost(userId, post).then(
      response => {
        if (response.status === 201) {
          dispatch(success({ 'success': 'Post has been successfully added' }));
          Alert.alert("Post has been successfully added");
        }
      },
      posts_list => dispatch(failure({ 'error': 'An error occured in adding the post' }))
    );
  };

  function request() {
    return { type: userDetailsConstants.ADD_POST_REQUEST };
  }
  function success(post_response) {
    return { type: userDetailsConstants.ADD_POST_SUCCESS, post_response };
  }
  function failure(post_response) {
    return { type: userDetailsConstants.ADD_POST_FAILURE, post_response };
  }
}