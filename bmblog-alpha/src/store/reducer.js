import { combineReducers } from 'redux';
import homeReducer from './home/reducer';
import globalReducers from './global/reducer';
import postReducer from './post/reducer';
import adminReducer from './admin/reducer';

export const rootReducer = combineReducers({ 
    home: homeReducer,
    global: globalReducers,
    post: postReducer,
    admin: adminReducer
});