import { GLOBALTYPES } from "../actionType";
const initialState = {
  data: [],
};
const usersRequestAddFriend = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_USERS_SEND_REQUEST_ADD_FRIEND_OF_ME:
      return action.payload;
    case GLOBALTYPES.ADD_USER_SEND_REQUEST_ADD_FRIEND_OF_ME:
      const user_send_request_by_me = action.payload;
      return {
        ...state,
        data: [...state.data, user_send_request_by_me],
      };
    case GLOBALTYPES.CANCEL_REQUEST_ADD_FRIEND_SUCCESS:
      const friend = action.payload;
      const list = state.data;

      return {
        ...state,
        data: list.filter((item) => item._id !== friend._id),
      };
    default:
      return state;
  }
};

export default usersRequestAddFriend;
