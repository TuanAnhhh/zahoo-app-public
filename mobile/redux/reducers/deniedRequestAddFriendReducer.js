import { GLOBALTYPES } from "../actionType";

const initialState = {};

const deniedRequestAddFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_QUEUE_FRIENDS_USER:
      return {
        data: action.payload,
      };

    case GLOBALTYPES.DENIED_REQUEST_ADD_FRIEND:
      return {
        data: state.data.filter((user) => user._id !== action.payload.data._id),
      };
    case GLOBALTYPES.UPDATE_FRIENDS_QUEUE:
      return {
        data: [action.payload, ...state.data],
      };
    case GLOBALTYPES.ACCEPT_REQUEST_ADD_FRIEND:
      return {
        data: state.data.filter((user) => user._id !== action.payload.data._id),
      };
    default:
      return state;
  }
};

export default deniedRequestAddFriendReducer;
