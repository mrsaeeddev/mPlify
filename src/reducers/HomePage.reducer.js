import { homePageConstants } from "../constants";

const initialstate = {
    userListRequest: false,
    userListSuccess: false,
    userListFailure: false,
    loading: false,
    response: [],
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
                response: action.response,
            };
        case homePageConstants.USER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                userListRequest: false,
                userListSuccess: false,
                userListFailure: true,
                response: action.response,
            };
        default:
            return state;
    }
}      