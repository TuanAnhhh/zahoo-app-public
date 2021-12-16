import { postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";
import { postConversation } from "./conversationsAction";

//  LOGIN
export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true },
    });

    const res = await postDataAPI("auth/login", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    localStorage.setItem("firstLogin", true);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
//  REGISTER
export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true },
    });

    const res = await postDataAPI("auth/register", data);

    dispatch({
      type: GLOBALTYPES.REGISTER,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    localStorage.setItem("firstLogin", true);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

// forgot password
export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true },
    });

    const res = await postDataAPI("auth/reset-password", data);
    console.log("aaa:", res.data.msg);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    localStorage.setItem("firstLogin", true);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

//refresh token
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const res = await postDataAPI("auth/refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("auth/logout");
    window.location.href = "/login";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
//  requestAddFriend
export const requestAddFriend =
  (friend, user, token, socket) => async (dispatch) => {
    try {
      const data = {
        userId: user._id,
      };

      await postDataAPI(`users/request-add-friend/${friend._id}`, data, token);
      dispatch({
        type: GLOBALTYPES.UPDATE_REQUEST_ADD_FRIEND_OF_USER_RESULT_FROM_MODEL,
        payload: data.userId,
      });
      dispatch({
        type: GLOBALTYPES.ADD_USER_SEND_REQUEST_ADD_FRIEND_OF_ME,
        payload: friend,
      });

      socket.emit("requestAddFriend", {
        sender: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
        recipient: friend._id,
        msg: `${user.username} đã gửi yêu cầu kết bạn.`,
      });
    } catch (err) {
      alert("Có lỗi xảy ra");
    }
  };
export const acceptAddFriend = (friend, auth, socket) => async (dispatch) => {
  console.log(friend);
  const { user, token } = auth;
  try {
    dispatch({
      type: GLOBALTYPES.ACCEPT_ADD_FRIEND,
      payload: friend,
    });
    const dataAddFriend = {
      userId: auth.user._id,
    };
    await postDataAPI(
      `users/accept-add-friend/${friend._id}`,
      dataAddFriend,
      auth.token
    );

    const conver = await postDataAPI(
      `conversations/friend/${friend._id}`,
      { userId: user._id },
      token
    );
    if (conver.data?._id !== undefined) {
      dispatch({
        type: GLOBALTYPES.POST_CURRENT_CONVERSATION_SUCCESS,
        payload: {
          data: conver.data,
        },
      });
    } else {
      const dataConver = {
        array: [auth.user._id, friend._id],
      };
      dispatch(postConversation(dataConver, auth.token, socket, auth.user));
    }

    socket.emit("acceptAddFriend", {
      sender: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      recipient: friend._id,
      msg: `${user.username} đã đồng ý yêu cầu kết bạn.`,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
export const deniedAddFriend = (friend, auth, socket) => async (dispatch) => {
  try {
    const { user } = auth;
    dispatch({
      type: GLOBALTYPES.DENIED_ADD_FRIEND,
      payload: friend._id,
    });
    const dataAddFriend = {
      userId: auth.user._id,
    };
    await postDataAPI(
      `users/denied-add-friend/${friend._id}`,
      dataAddFriend,
      auth.token
    );
    socket.emit("deniedAddFriend", {
      sender: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      recipient: friend._id,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
export const unfriend = (user, friend, token, socket) => async (dispatch) => {
  try {
    const data = { userId: user._id };
    await postDataAPI(`users/unfriend/${friend._id}`, data, token);

    dispatch({
      type: GLOBALTYPES.UNFRIEND,
      payload: friend,
    });

    socket.emit("deleteFriend", {
      sender: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
      recipient: friend._id,
    });
  } catch (err) {
    console.log("err:", err);
  }
};
