import { postDetailsConstants } from "../constants";
import { postDetailsService } from "../services";
import { Alert } from 'react-native';

export const postDetailsActions = {
  fetchCommentsList,
  deletePost,
  addComment
}

function fetchCommentsList(postId) {
  return dispatch => {
    dispatch(request());
    postDetailsService.fetchCommentsList(postId).then(
      comments_list => {
        dispatch(success(comments_list));
      },
      comments_list => dispatch(failure(comments_list.toString()))
    );
  };

  function request() {
    return { type: postDetailsConstants.USER_COMMENTS_REQUEST };
  }
  function success(comments_list) {
    return { type: postDetailsConstants.USER_COMMENTS_SUCCESS, comments_list };
  }
  function failure(comments_list) {
    return { type: postDetailsConstants.USER_COMMENTS_FAILURE, comments_list };
  }
}

function deletePost(postId) {
  return dispatch => {
    dispatch(request());
    postDetailsService.deletePost(postId).then(
      response => {
        if (response.status === 200) {
          dispatch(success({ 'success': 'Post has been successfully deleted' }));
          Alert.alert("Post has been successfully deleted");
        }
      },
      response => dispatch(failure({ 'error': 'An error occured in deleting the post' }))
    );
  };

  function request() {
    return { type: postDetailsConstants.POST_DELETE_REQUEST };
  }
  function success(response) {
    return { type: postDetailsConstants.POST_DELETE_SUCCESS, response };
  }
  function failure(response) {
    return { type: postDetailsConstants.POST_DELETE_FAILURE, response };
  }
}

function addComment(postId, comment) {
  return dispatch => {
    dispatch(request());
    postDetailsService.addComment(postId, comment).then(
      response => {
        if (response.status === 201) {
          dispatch(success({ 'success': 'Comment has been successfully added' }));
          Alert.alert("Comment has been successfully added");
        }
      },
      response => dispatch(failure({ 'error': 'An error occured in adding the comment' }))
    );
  };

  function request() {
    return { type: postDetailsConstants.ADD_COMMENT_REQUEST };
  }
  function success(add_response) {
    return { type: postDetailsConstants.ADD_COMMENT_SUCCESS, add_response };
  }
  function failure(add_response) {
    return { type: postDetailsConstants.ADD_COMMENT_FAILURE, add_response };
  }
}