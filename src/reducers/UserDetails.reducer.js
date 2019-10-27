import { userDetailsConstants } from "../constants";

const initialstate = {
    postsListRequest: false,
    postsListSuccess: false,
    postsListFailure: false,
    loading: false,
    posts_list: [],
};


export function userDetailsReducer(state = initialstate, action) {
    switch (action.type) {
        case userDetailsConstants.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                postsListRequest: true,
                postsListSuccess: false,
                postsListFailure: false
            };
        case userDetailsConstants.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                postsListRequest: false,
                postsListSuccess: true,
                postsListFailure: false,
                posts_list: action.posts_list,
            };
        case userDetailsConstants.USER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                postsListRequest: false,
                postsListSuccess: false,
                postsListFailure: true,
                posts_list: action.posts_list,
            };
        default:
            return state;
    }
}      