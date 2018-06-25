import axios from 'axios';

import REST from './constants/restConstants';

/* -----------  ACTION TYPES ----------- */

const ADD_PLACES_OF_INTEREST = 'ADD_PLACES_OF_INTEREST';
const CLEAR_PLACES_OF_INTEREST = 'CLEAR_PLACES_OF_INTEREST';

/* -----------  ACTION CREATORS ----------- */

const addPlacesOfInterest = pois => ({ type: ADD_PLACES_OF_INTEREST, pois });
const clearPlacesOfInterest = () => ({ type: CLEAR_PLACES_OF_INTEREST });

/* -----------  REDUCER ----------- */

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PLACES_OF_INTEREST:
      return state.concat(action.pois);
    case CLEAR_PLACES_OF_INTEREST:
      return [];
    default:
      return state;
  }
}

/* -----------  THUNK CREATORS ----------- */

export const clearPOIs = () => dispatch => dispatch(clearPlacesOfInterest());

// // fetch mock pois
// import { translateMockPOIsResponse } from './utils/dataTranslationUtil';
// export const fetchPOIs = queryParams => dispatch => {
//   return axios.get(REST.ENDPNTS.DEFAULT + REST.RES.GETMOCKPOIS, {params: queryParams})
//     .then(translateMockPOIsResponse)
//     .then(pois => dispatch(addPlacesOfInterest(pois)))
// }

// // // fetch dummy google maps pois
// import { dummyPois1 } from './utils/dataTranslationUtil';
// export const fetchPOIs = queryParams => dispatch => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), 500)
//   })
//   .then(() => dummyPois1)
//   .then(pois => dispatch(addPlacesOfInterest(pois)));
// }

// fetch google maps pois
import { handleGoogleMapsAPIResponse, translateGoogleMapsNearbySearchResponse, createConvertedQueryParams } from './utils/dataTranslationUtil';
export const fetchPOIs = queryParams => dispatch => {
  const convertedQueryParams = createConvertedQueryParams(queryParams, REST.APIKEY.GOOGLEMAPS);
  // console.log(REST.ENDPNTS.GOOGLEMAPSAPI + REST.RES.GETGOOGLEMAPSPOIS)
  return axios.get(REST.ENDPNTS.GOOGLEMAPSAPI + REST.RES.GETGOOGLEMAPSPOIS, {params: convertedQueryParams})
    .then(handleGoogleMapsAPIResponse)
    .then(translateGoogleMapsNearbySearchResponse)
    .then(pois => dispatch(addPlacesOfInterest(pois)))
}