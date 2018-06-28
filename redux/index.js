import { combineReducers } from 'redux';
import auth from './auth';
import placesOfInterest from './placesOfInterest';
import ccHash from './ccHash';

export default combineReducers({auth, placesOfInterest, ccHash});