import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";

//  GET MESSAGES BY ID
export const getMessagesByConversationId =
  (conversationId, token, page = 1) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `messages/${conversationId}?page=${page}&limit=${12}`,
        token
      );

      dispatch({
        type: GLOBALTYPES.GET_MESSAGES_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log("err:", err);
      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: {
      //     error: err,
      //   },
      // });
    }
  };

export const loadMoreMessages =
  (conversationId, token, page = 1) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `messages/${conversationId}?page=${page}&limit=${12}`,
        token
      );
      // const newData = {...res.data, data: res.data.data}

      dispatch({ type: GLOBALTYPES.UPDATE_MESSAGES, payload: res.data });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

// ADD MESAGE
export const addMesage =
  ({ data, auth, socket, member }) =>
  async (dispatch) => {
    try {
      // add msg
      const msg = await postDataAPI("messages", data, auth.token);
      // data call
      // conversation: currentConver,
      // sender: auth.user,
      // text: "",
      // media: [],
      // call: { video: call.video, times },

      // data text normal
      // conversation:currentConversationId,
      // sender:{username,profilePicture, _id},
      // text:input,
      // media: newArr,

      dispatch({
        type: GLOBALTYPES.ADD_MESSAGE,
        payload: data,
      });

      dispatch({
        type: GLOBALTYPES.UPDATE_LAST_MSG,
        payload: {
          _id: msg.data._id,
          conversation: msg.data.conversation,
          text: msg.data.text,
          updatedAt: msg.data.updatedAt,
        },
      });

      const dataSocket = {
        data: data,
        member: member,
        msg: msg.data,
      };
      socket.emit("addMessage", dataSocket);

      dispatch({
        type: GLOBALTYPES.UPDATE_CONVERSATION,
        payload: {
          _id: msg.data._id,
          conversation: msg.data.conversation,
          text: msg.data.text,
          updatedAt: msg.data.updatedAt,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err,
        },
      });
    }
  };
