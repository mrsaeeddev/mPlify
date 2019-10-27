import { combineReducers } from "redux";

import { homePageReducer, userDetailsReducer, postDetailsReducer } from '../reducers';

export const rootReducer = combineReducers({
    homePageReducer,
    userDetailsReducer,
    postDetailsReducer
});
