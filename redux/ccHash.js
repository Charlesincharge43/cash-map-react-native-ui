/* -----------  ACTION TYPES ----------- */

const SET_CATEGORY_HASH = 'SET_CATEGORY_HASH';

/* -----------  ACTION CREATORS ----------- */

export const setCategoryHash = hash => ({type: SET_CATEGORY_HASH, hash});

/* -----------  REDUCER ----------- */

export default function reducer(state = null, action){
  switch(action.type){
    case SET_CATEGORY_HASH:
      return action.hash
    default:
      return state;
  }
}