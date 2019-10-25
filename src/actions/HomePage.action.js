import { homePageConstants } from "../constants";
import { homePageService } from "../services";

export const homePageActions = {
    fetchUsersList,
}

function fetchUsersList(counsellor_id) {
    return dispatch => {
      dispatch(request());
      homePageService.fetchUsersList(counsellor_id).then(
        payload => {
          dispatch(success(payload));
        },
        error => dispatch(failure(error.toString()))
      );
    };
  
    function request() {
      return { type: homePageConstants.GETSLOTS_REQUEST };
    }
    function success(payload) {
      return { type: homePageConstants.GETSLOTS_SUCCESS, payload };
    }
    function failure(error) {
      return { type: homePageConstants.GETSLOTS_FAILURE, error };
    }
  }
  