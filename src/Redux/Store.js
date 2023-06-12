import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import BookReducer from './reducers/BookReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const middleware = [reduxThunk];
const store = createStore(BookReducer, applyMiddleware(logger, thunk))

export default store; 