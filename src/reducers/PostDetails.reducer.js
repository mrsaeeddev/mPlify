import { postDetailsConstants } from "../constants";

const initialstate = {
    commentsListRequest: false,
    commentsListSuccess: false,
    commentsListFailure: false,
    postDeleteRequest: false,
    postDeleteSuccess: false,
    postDeleteFailure: false,
    loading: false,
    comments_list: [],
    response: [],
};


export function postDetailsReducer(state = initialstate, action) {
    switch (action.type) {
        case postDetailsConstants.USER_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                commentsListRequest: true,
                commentsListSuccess: false,
                commentsListFailure: false
            };
        case postDetailsConstants.USER_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                commentsListRequest: false,
                commentsListSuccess: true,
                commentsListFailure: false,
                comments_list: action.comments_list,
            };
        case postDetailsConstants.USER_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                commentsListRequest: false,
                commentsListSuccess: false,
                commentsListFailure: true,
                comments_list: action.comments_list,
            };
        case postDetailsConstants.POST_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                postDeleteRequest: true,
                postDeleteSuccess: false,
                postDeleteFailure: false
            };
        case postDetailsConstants.POST_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                postDeleteRequest: false,
                postDeleteSuccess: true,
                postDeleteFailure: false,
                response: action.response,
            };
        case postDetailsConstants.POST_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                postDeleteRequest: false,
                postDeleteSuccess: false,
                postDeleteFailure: true,
                response: action.response,
            };
        default:
            return state;
    }
}      