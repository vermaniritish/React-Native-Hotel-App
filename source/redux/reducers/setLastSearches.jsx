import ActionType from '../constants/index';
const initialState = {
  searches: null,
};

const LastSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LAST_SEARCHES:
      return Object.assign({}, state, {
        searches: action.payload,
      });
    default:
      return state;
  }
};

export default LastSearchReducer;
