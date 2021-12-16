import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";
import { postCurrentConversation } from "./currentConversation";

//  getConversationsByUserId
export const getConversationsByUserId = (userId, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(`conversations/${userId}`, token);
    dispatch({
      type: GLOBALTYPES.GET_CONVERSATIONS_SUCCESS,
      payload: {
        data: res.data,
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
//  postConversation
export const postConversation =
  (data, token, socket, user) => async (dispatch) => {
    try {
      const res = await postDataAPI(`conversations`, data, token);
      dispatch({
        type: GLOBALTYPES.POST_CONVERSATION,
        payload: res.data,
      });
      dispatch({
        type: GLOBALTYPES.POST_CURRENT_CONVERSATION_SUCCESS,
        payload: {
          data: res.data,
        },
      });

      const dataSocket = {
        conversation: res.data,
        user: user,
      };

      socket.emit("addConversation", dataSocket);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
//  get conversation with freind
export const getConversationWithFriend =
  (friendId, auth) => async (dispatch) => {
    const { token, user } = auth;
    try {
      let { data } = await postDataAPI(
        `conversations/friend/${friendId}`,
        { userId: user._id },
        token
      );
      //  if not have conversation then create new conversation
      if (data.length === 0) {
        const data = {
          array: [user._id, friendId],
        };
        dispatch(postConversation(data));
      } else {
        dispatch(postCurrentConversation(data));
      }
    } catch (error) {}
  };
//  postConversations
export const search = (inputSearch, auth) => async (dispatch) => {
  try {
    const data = {
      userId: auth.user._id,
    };
    const res = await postDataAPI(
      `conversations/search/${inputSearch}`,
      data,
      auth.token
    );
    console.log(res.data);

    dispatch({
      type: GLOBALTYPES.GET_CONVERSATIONS_SUCCESS,
      payload: {
        data: res.data,
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
