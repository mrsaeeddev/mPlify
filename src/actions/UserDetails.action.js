import { userDetailsConstants } from "../constants";
import { userDetailsService } from "../services";

export const userDetailsActions = {
    fetchPostsList,
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