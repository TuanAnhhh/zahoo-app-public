import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "../actionType";

export const getUsersRequestAddFriendByMe = (auth) => async (dispatch) => {
  try {
    const { token, user } = auth;
    const res = await getDataAPI(
      `users/get-list-user-send-request-add-friend-of-me/${user._id}`,
      token
    );
    console.log(res.data);

    dispatch({
      type: GLOBALTYPES.GET_USERS_SEND_REQUEST_ADD_FRIEND_OF_ME,
      payload: res.data,
    });
  } catch (err) {}
};
export const cancelRequestAddFriend =
  (friend, auth, socket) => async (dispatch) => {
    try {
      const { token, user } = auth;
      await postDataAPI(
        `users/cancel-add-friend/${friend._id}`,
        { userId: user._id },
        token
      );

      dispatch({
        type: GLOBALTYPES.CANCEL_REQUEST_ADD_FRIEND_SUCCESS,
        payload: friend,
      });

      socket.emit("cancelRequestAddFriend", {
        sender: user._id,
        recipient: friend._id,
      });
    } catch (err) {}
  };
