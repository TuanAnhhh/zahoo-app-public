import { postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    case GLOBALTYPES.REGISTER:
      return action.payload;
    case GLOBALTYPES.UPDATE_FRIENDS_QUEUE: {
      let _friendsQueue = state.user.friendsQueue;
      _friendsQueue.push(action.payload);
      return {
        ...state,
        user: { ...state.user, friendsQueue: _friendsQueue },
      };
    }
    case GLOBALTYPES.UPDATE_FRIENDS: {
      const friend = action.payload;
      let _friends = state.user.friends;
      _friends.push(friend);

      let _friendsQueue = state.user.friendsQueue;
      _friendsQueue = _friendsQueue.filter((item) => item._id !== friend._id);

      return {
        ...state,
        user: { ...state.user, friends: _friends, friendsQueue: _friendsQueue },
      };
    }
    case GLOBALTYPES.ACCEPT_ADD_FRIEND: {
      const friend = action.payload;
      const _friends = state.user.friends;
      _friends.push(friend);

      const _friendsQueue = state.user.friendsQueue;
      const index = _friendsQueue.findIndex((el) => el._id === friend._id);
      if (index !== -1) {
        _friendsQueue.splice(index, 1);
      }

      return {
        ...state,
        user: { ...state.user, friends: _friends, friendsQueue: _friendsQueue },
      };
    }
    case GLOBALTYPES.DENIED_ADD_FRIEND: {
      const _friendsQueue = state.user.friendsQueue;
      const index = _friendsQueue.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        _friendsQueue.splice(index, 1);
      }
      return {
        ...state,
        user: { ...state.user, friendsQueue: _friendsQueue },
      };
    }
    case GLOBALTYPES.REMOVE_USER_OF_FRIENDS_QUEUE: {
      const friendId = action.payload;
      const friendsQueue = state.user.friendsQueue;
      const _friendsQueue = friendsQueue.filter(
        (item) => item._id !== friendId
      );
      return {
        ...state,
        user: { ...state.user, friendsQueue: _friendsQueue },
      };
    }
    case GLOBALTYPES.ACTIVE_USER_TO_CLIENT: {
      if (state.user?._id === action.payload._id) {
        return {
          ...state,
          user: { ...state.user, status: action.payload.status },
        };
      }
      try {
        localStorage.removeItem("firstLogin");
        postDataAPI("auth/logout");
        window.location.href = "/login";
      } catch (err) {
        console.log("err:", err);
      }
      return { ...state };
    }
    case GLOBALTYPES.CHANGE_INFO: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case GLOBALTYPES.UNFRIEND: {
      // console.log("reducer: ", {
      //   ...state,
      //   user: {
      //     ...state.user,
      //     friends: state.user.friends.filter(
      //       (u) => u._id !== action.payload._id
      //     ),
      //   },
      // });
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.filter(
            (u) => u._id !== action.payload._id
          ),
        },
      };
    }
    // UPDATE_DELETE_FRIENDS
    case GLOBALTYPES.UPDATE_DELETE_FRIENDS: {
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.filter(
            (u) => u._id !== action.payload._id
          ),
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
