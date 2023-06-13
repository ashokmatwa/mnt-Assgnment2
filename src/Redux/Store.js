import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import BookReducer from './reducers/BookReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {configureStore, combineReducers} from "@reduxjs/toolkit";

import rootReducer from './reducers';
import formDataReducer from './reducers/formDataReducer';

import formSlice from './reducers/formSlice';

// const rootreducer = combineReducers({user : formDataReducer});
// const middleware = [reduxThunk];
// const store = createStore(BookReducer, applyMiddleware(logger, thunk))
// const store = configureStore({reducer:rootreducer, middleware:[thunk, logger]})

const store = configureStore({
    reducer: {
      form: formSlice,
      // Other reducers...
    },
  });

export default store; 