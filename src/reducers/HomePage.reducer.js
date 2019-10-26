import { homePageConstants } from "../constants";

const initialstate = {
    userListRequest: false,
    userListSuccess: false,
    userListFailure: false,
    loading: false,
    user_list: [],
};


export function homePageReducer(state = initialstate, action) {
    switch (action.type) {
        case homePageConstants.USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                userListRequest: true,
                userListSuccess: false,
                userListFailure: false
            };
        case homePageConstants.USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                userListRequest: false,
                userListSuccess: true,
                userListFailure: false,
                user_list: action.user_list,
            };
        case homePageConstants.USER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                userListRequest: false,
                userListSuccess: false,
                userListFailure: true,
                user_list: action.user_list,
            };
        default:
            return state;
    }
}      