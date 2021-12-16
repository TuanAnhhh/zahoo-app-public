import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import audiobell from "./audio/got-it-done-613.mp3";
import { GLOBALTYPES } from "./redux/actionType";

const SocketClient = () => {
  const { auth, socket, call, conversations, currentConversation } =
    useSelector((state) => state);
  const { online, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  // joinUser
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  // Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      if (
        currentConversation === undefined ||
        msg.data.conversation !== currentConversation?.data?._id
      ) {
        dispatch({
          type: GLOBALTYPES.UPDATE_COUNT_WAITING_MESSAGE,
          payload: msg.data.conversation,
        });
      } else {
        dispatch({ type: GLOBALTYPES.ADD_MESSAGE, payload: msg.data });
      }
    });
    return () => socket.off("addMessageToClient");
  }, [socket, dispatch, conversations, currentConversation]);
  // Check User Online / Offline
  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);
  useEffect(() => {
    socket.on("checkUserOnlineToClient", (item) => {
      if (!online.includes(item)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: item });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on("CheckUserOffline", (item) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: item });
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch]);

  // Call User
  useEffect(() => {
    socket.on("callUserToClient", (data) => {
      dispatch({ type: GLOBALTYPES.CALL, payload: data });
    });

    return () => socket.off("callUserToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("userBusy", (data) => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `${call.username} is busy!` },
      });
    });

    return () => socket.off("userBusy");
  }, [socket, dispatch, call]);

  // request addfriend
  useEffect(() => {
    socket.on("requestAddFriendToClient", (data) => {
      // dispatch({type: GLOBALTYPES.NOTIFY, payload: data})
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: {
          sender: data.sender,
          msg: data.msg,
        },
      });
      dispatch({
        type: GLOBALTYPES.UPDATE_FRIENDS_QUEUE,
        payload: data.sender,
      });
    });
    return () => socket.off("requestAddFriendToClient");
  }, [socket, dispatch, notify]);

  // accept addfriend
  useEffect(() => {
    socket.on("acceptAddFriendToClient", (data) => {
      console.log(data);
      dispatch({ type: GLOBALTYPES.NOTIFY, payload: data });
      dispatch({ type: GLOBALTYPES.UPDATE_FRIENDS, payload: data.sender });
      dispatch({
        type: GLOBALTYPES.CANCEL_REQUEST_ADD_FRIEND_SUCCESS,
        payload: data.sender,
      });
    });
    return () => socket.off("acceptAddFriendToClient");
  }, [socket, dispatch, notify]);
  // deniedAddFriendToClient
  useEffect(() => {
    socket.on("deniedAddFriendToClient", (data) => {
      dispatch({
        type: GLOBALTYPES.CANCEL_REQUEST_ADD_FRIEND_SUCCESS,
        payload: data.sender,
      });
    });
    return () => socket.off("deniedAddFriendToClient");
  }, [socket, dispatch, notify]);
  // cancelRequestAddFriendToClient
  useEffect(() => {
    socket.on("cancelRequestAddFriendToClient", (userId) => {
      // console.log(userId);
      dispatch({
        type: GLOBALTYPES.REMOVE_USER_OF_FRIENDS_QUEUE,
        payload: userId,
      });
    });
    return () => socket.off("cancelRequestAddFriendToClient");
  }, [socket, dispatch, notify]);
  // change group name
  useEffect(() => {
    socket.on("changeGroupNameToClient", (data) => {
      // console.log(data);
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME_OF_CONVERSATION_IN_LIST_CONVERSATION,
        payload: {
          conversationId: data.conversationId,
          newLabel: data.newLabel,
        },
      });
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: {
          sender: data.sender,
          msg: data.msg,
        },
      });
    });
    return () => socket.off("changeGroupNameToClient");
  }, [socket, dispatch, notify]);
  // on typing
  useEffect(() => {
    socket.on("onTypingTextToClient", (data) => {
      dispatch({ type: GLOBALTYPES.TYPING_TEXT, payload: data });
    });
    return () => socket.off("onTypingTextToClient");
  }, [socket, dispatch, notify]);
  // off typing
  useEffect(() => {
    socket.on("offTypingTextToClient", (data) => {
      dispatch({ type: GLOBALTYPES.OFF_TYPING_TEXT, payload: data });
    });
    return () => socket.off("offTypingTextToClient");
  }, [socket, dispatch, notify]);

  useEffect(() => {
    socket.on("outGroupToClient", (data) => {
      dispatch({ type: GLOBALTYPES.OUT_GROUP_TO_CLIENT, payload: data });
    });
    return () => socket.off("outGroupToClient");
  }, [socket, dispatch, notify]);
  useEffect(() => {
    socket.on("deleteGroupToClient", (data) => {
      console.log("dataaaaaa:", data);
      dispatch({ type: GLOBALTYPES.DELETE_GROUP_TO_CLIENT, payload: data });
    });
    return () => socket.off("deleteGroupToClient");
  }, [socket, dispatch, notify]);

  useEffect(() => {
    socket.on("addFriendToGroupToClient", (data) => {
      console.log("dataaaaaa sockete client:", data);
      dispatch({ type: GLOBALTYPES.ADD_MEMBER_GROUP_TO_CLIENT, payload: data });
    });
    return () => socket.off("addFriendToGroupToClient");
  }, [socket, dispatch, notify]);

  //active user
  useEffect(() => {
    socket.on("activeUserToClient", (data) => {
      console.log("dataaaaaa sockete client:", data);
      dispatch({ type: GLOBALTYPES.ACTIVE_USER_TO_CLIENT, payload: data });
    });
    return () => socket.off("activeUserToClient");
  }, [socket, dispatch, notify]);

  //kickMemberToClient
  useEffect(() => {
    socket.on("kickMemberToClient", (data) => {
      if (auth.user._id == data.memberID) {
        dispatch({ type: GLOBALTYPES.KICK_MEMBER_TO_CLIENT, payload: data });
      } else
        dispatch({
          type: GLOBALTYPES.UPDATE_KICK_MEMBER_TO_CLIENT,
          payload: data,
        });
    });
    return () => socket.off("kickMemberToClient");
  }, [socket, dispatch, notify]);

  // add conversation
  useEffect(() => {
    socket.on("addConversationtoclient", (data) => {
      dispatch({ type: GLOBALTYPES.ADD_CONVERSATION_TO_CLIENT, payload: data });
    });
    return () => socket.off("addConversationtoclient");
  }, [socket, dispatch, notify]);

  // delete friend
  useEffect(() => {
    socket.on("deleteFriendToClient", (data) => {
      console.log("DATA", data);
      dispatch({
        type: GLOBALTYPES.UPDATE_DELETE_FRIENDS,
        payload: data.sender,
      });
    });
    return () => socket.off("deleteFriendToClient");
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
