import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import stateReducer from '../modules/stateReducer';
import loadingReducer from '../modules/loadingReducer';

const rootReducer = combineReducers({ stateReducer, loadingReducer });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
