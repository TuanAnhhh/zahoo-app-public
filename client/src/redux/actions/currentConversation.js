import { getDataAPI, postDataAPI, putDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";

//  post current conversation
export const postCurrentConversation = (conversation) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.POST_CURRENT_CONVERSATION_SUCCESS,
      payload: {
        data: conversation,
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
//  get image and video
export const getImageAndVideo = (conversationId, token) => async (dispatch) => {
  const res = await getDataAPI(
    `conversations/get-image-and-video/${conversationId}`,
    token
  );
  try {
    dispatch({
      type: GLOBALTYPES.GET_IMAGE_VIDEO,
      payload: {
        media: res.data.media,
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
//  get files
export const getFiles = (conversationId, token) => async (dispatch) => {
  const res = await getDataAPI(
    `conversations/get-files/${conversationId}`,
    token
  );
  console.log(res.data.media);

  try {
    dispatch({
      type: GLOBALTYPES.GET_FILES,
      payload: {
        files: res.data.media,
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
//  change group name
export const change_Current_Conversation_GroupName =
  (conversation, newLabel, auth, socket) => async (dispatch) => {
    const { user, token } = auth;
    const { _id, member, label } = conversation;
    const _member = member.map((item) => item._id);
    const data = {
      newLabel: newLabel,
    };
    await putDataAPI(`conversations/change-label/${_id}`, data, token);

    try {
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME_OF_CURRENT_CONVERSATION,
        payload: newLabel,
      });
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME_OF_CONVERSATION_IN_LIST_CONVERSATION,
        payload: {
          conversationId: _id,
          newLabel: newLabel,
        },
      });
      const dataSocket = {
        conversationId: _id,
        member: _member,
        sender: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
        newLabel: newLabel,
        msg: `${user.username} đã thay đổi tên nhóm ${label} thành ${newLabel}`,
      };
      socket.emit("changeGroupName", dataSocket);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err,
        },
      });
    }
  };
//  out group
export const outGroup =
  (user, token, currentConversation, socket) => async (dispatch) => {
    const { _id } = currentConversation;
    const data = { userId: user._id };

    try {
      const res = await postDataAPI(
        `conversations/out-group/${_id}`,
        data,
        token
      );

      dispatch({
        type: GLOBALTYPES.OUT_GROUP,
        payload: res.data,
      });

      const dataSocket = {
        conversation: currentConversation,
        memberID: user._id,
      };
      socket.emit("outGroup", dataSocket);
    } catch (err) {}
  };
export const deleteGroup =
  (user, conversation, token, socket) => async (dispatch) => {
    const data = { userId: user._id };

    try {
      await postDataAPI(
        `conversations/delete-group/${conversation._id}`,
        data,
        token
      );

      dispatch({
        type: GLOBALTYPES.DELETE_GROUP,
        payload: conversation,
      });

      const dataSocket = {
        conversation: conversation,
        userID: user._id,
      };
      socket.emit("deleteGroup", dataSocket);
    } catch (err) {}
  };
export const addMembersToGroup =
  (member, conversation, user, token, socket) => async (dispatch) => {
    //loc lay ra id

    const _member = member.map((item) => item._id);
    try {
      await postDataAPI(
        `conversations/add-member-group/${conversation._id}`,
        { member: _member },
        token
      );
      dispatch({
        type: GLOBALTYPES.UPDATE_CURRENT_CONVERSATION_ADD_MEMBER,
        payload: {
          conversation,
          member,
          user,
        },
      });

      // update trong danh sach conversations here

      // su ly socket here

      const dataSocket = {
        conversation: conversation,
        member: member,
        user: user,
      };
      socket.emit("addFriendToGroup", dataSocket);
    } catch (error) {
      console.log("err: ", error);
    }
  };
export const deleteMemberGroup =
  (id, token, user, currentConversation, socket) => async (dispatch) => {
    const data = { conversationId: currentConversation._id, userId: user._id };

    try {
      await postDataAPI(`conversations/delete-member/${id}`, data, token);
      dispatch({
        type: GLOBALTYPES.DELETE_MEMBER_GROUP,
        payload: id,
      });

      const dataSocket = {
        conversation: currentConversation,
        userID: user._id,
        memberID: id,
      };
      socket.emit("kickMember", dataSocket);
    } catch (error) {
      console.log("err: ", error);
    }
  };
