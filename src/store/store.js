import { middleware } from './middleware';
import { createStore } from "redux";
import { rootReducer } from './rootReducer';

export const configureStore = createStore(rootReducer, middleware);