import { postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";

export const getFriendsFromUser = (data) => async (dispatch) => {
  dispatch({
    type: GLOBALTYPES.GET_FRIENDS_USER,
    payload: data,
  });
};

export const getQueueFriendsFromUser = (data) => async (dispatch) => {
  dispatch({
    type: GLOBALTYPES.GET_QUEUE_FRIENDS_USER,
    payload: data,
  });
};

export const acceptRequestAddFriend =
  (friendId, user, token, socket) => async (dispatch) => {

    try {

      const data = {
        userId: user._id,
      };

      const res = await postDataAPI(
        `users/accept-add-friend/${friendId}`,
        data,
        token
      );

      dispatch({
        type: GLOBALTYPES.ACCEPT_REQUEST_ADD_FRIEND,
        payload: {
          data: res.data.nguoiGui,
        },
      });

      socket.emit("acceptAddFriend", {
        sender: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture
        },
        recipient: friendId,
        msg: `${user.username} đã đồng ý yêu cầu kết bạn.`
      })

    } catch (err) {

    }
  };

//tu choi yc ket ban
export const deniedRequestAddFriend =
  (friendId, data, token) => async (dispatch) => {
    try {
      const res = await postDataAPI(
        `users/denied-add-friend/${friendId}`,
        data,
        token
      );

      dispatch({
        type: GLOBALTYPES.DENIED_REQUEST_ADD_FRIEND,
        payload: {
          data: res.data.nguoiGui,
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
  };

//  requestAddFriend
export const requestAddFriend = (friendId, user, token, socket) => async dispatch => {

  try {
    const data = {
      userId: user._id
    }
    const res = await postDataAPI(`users/request-add-friend/${friendId}`, data, token, socket)

    dispatch({
      type: GLOBALTYPES.REQUEST_ADD_FRIEND,
      payload: {
        data: user._id
      }
    })

    socket.emit("requestAddFriend", {
      sender: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture
      },
      recipient: friendId,
      msg: `${user.username} đã gửi yêu cầu kết bạn.`
    });


  }
  catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}


//  CancelrequestAddFriend
export const cancelRequestAddFriend = (friendId, data, token) => async dispatch => {
  try {

    const res = await postDataAPI(`users/cancel-add-friend/${friendId}`, data, token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

//  unfriend
export const unfriend =
  (friendId, user, token, socket) => async (dispatch) => {

    try {

      const data = {
        userId: user._id,
      };

      const res = await postDataAPI(
        `users/unfriend/${friendId}`,
        data,
        token
      );

      dispatch({
        type: GLOBALTYPES.UNFRIEND,
        payload: {
          data: res.data,
        },
      });



      socket.emit("deleteFriend", {
        sender: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture
        },
        recipient: friendId,
      })

    } catch (err) {
      console.log("ERR", err)
    }
  };



