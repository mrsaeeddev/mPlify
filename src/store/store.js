import { middleware } from './middleware';
import { createStore } from "redux";
import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer, middleware);