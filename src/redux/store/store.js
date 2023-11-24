import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import stateReducer from '../reducers/stateReducer';

const rootReducer = combineReducers({ stateReducer });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
