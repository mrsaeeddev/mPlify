import { userDetailsConstants } from "../constants";

const initialstate = {
    postsListRequest: false,
    postsListSuccess: false,
    postsListFailure: false,
    addPostRequest: false,
    addPostSuccess: false,
    addPostFailure: false,
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
        case userDetailsConstants.ADD_POST_REQUEST:
            return {
                ...state,
                loading: true,
                addPostRequest: true,
                addPostSuccess: false,
                addPostFailure: false,
            };
        case userDetailsConstants.ADD_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                addPostRequest: false,
                addPostSuccess: true,
                addPostFailure: false,
                post_response: action.post_response,
            };
        case userDetailsConstants.ADD_POST_FAILURE:
            return {
                ...state,
                loading: false,
                addPostRequest: false,
                addPostSuccess: false,
                addPostFailure: true,
                post_response: action.post_response,
            };
        default:
            return state;
    }
}      