import { homePageConstants } from "../constants";
import { homePageService } from "../services";

export const homePageActions = {
    fetchUsersList,
}

function fetchUsersList() {
    return dispatch => {
      dispatch(request());
      homePageService.fetchUsersList().then(
        user_list => {
          dispatch(success(user_list));
        },
        response => dispatch(failure(response.toString()))
      );
    };
  
    function request() {
      return { type: homePageConstants.USER_LIST_REQUEST };
    }
    function success(user_list){
      return { type: homePageConstants.USER_LIST_SUCCESS, user_list };
    }
    function failure(user_list) {
      return { type: homePageConstants.USER_LIST_FAILURE, user_list };
    }
  }
  