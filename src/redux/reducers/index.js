import { combineReducers } from 'redux';
import githubDataReducer from './githubDataReducer';

const rootReducers = combineReducers({
    githubData: githubDataReducer
})

export default rootReducers