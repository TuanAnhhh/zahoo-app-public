// SUGGESS_FRIENDS
import { GLOBALTYPES } from "../actionType";

const initialState = {
  data: [],
};

const suggessFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.SUGGESS_FRIENDS:
      if (action.payload) {
        return {
          ...state,
          data: action.payload,
        };
      }
      break;
    default:
      return state;
  }
};

export default suggessFriendReducer;
