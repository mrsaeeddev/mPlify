import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";

export const middleware = applyMiddleware(thunkMiddleware);

