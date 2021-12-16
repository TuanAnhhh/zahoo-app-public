import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "./redux/actionType";
import audiobell from "./audio/got-it-done-613.mp3";
import { logout } from "./redux/actions/authAction";
import { useNavigation } from "@react-navigation/core";

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();
  const navigation = useNavigation()
  const conversation = useSelector(
    (state) => state.currentConversationsReducer.data
  );
 

  // joinUser
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  // Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: GLOBALTYPES.ADD_MESSAGE, payload: msg.data });
    });
    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);

  // request addfriend
     useEffect(() => {
      socket.on('requestAddFriendToClient', data =>{
          dispatch({type: GLOBALTYPES.UPDATE_FRIENDS_QUEUE, payload: data.sender})
      })
      return () => socket.off('requestAddFriendToClient')
  },[socket, dispatch])

  // accept addfriend
  useEffect(() => {
      socket.on('acceptAddFriendToClient', data =>{
          dispatch({type: GLOBALTYPES.UPDATE_FRIENDS, payload: data.sender})
      })
      return () => socket.off('acceptAddFriendToClient')
  },[socket, dispatch])

  // change group name
  useEffect(() => {
    socket.on("changeGroupNameToClient", (data) => {
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME_OF_CONVERSATION_IN_LIST_CONVERSATION,
        payload: {
          conversationId: data.conversationId,
          newLabel: data.newLabel,
        },
      });
    });
    return () => socket.off("changeGroupNameToClient");
  }, [socket, dispatch]);


   // delete friend
   useEffect(() => {
    socket.on('deleteFriendToClient', data =>{
        dispatch({type: GLOBALTYPES.UPDATE_DELETE_FRIENDS, payload: data.sender})
    })
    return () => socket.off('deleteFriendToClient')
},[socket, dispatch])


   // kick member to client
   useEffect(() => {
    socket.on('kickMemberToClient', data =>{
      const {memberID} =data
      if(auth.user._id==memberID){
        dispatch({type: GLOBALTYPES.KICK_MEMBER_TO_SOCKET, payload: data})

        if(conversation?._id === data.conversation._id){

          navigation.navigate('Chat')
        }
        
      } else {
        dispatch({type: GLOBALTYPES.UPDATE_KICK_MEMBER_TO_CLIENT, payload: data})
      }
       
    })
    return () => socket.off('kickMemberToClient')
},[socket, dispatch])


// out group
useEffect(() => {
  socket.on('outGroupToClient', data =>{
      dispatch({type:GLOBALTYPES.OUT_GROUP_TO_CLIENT,payload: data})
      
  })
  return () => socket.off('outGroupToClient')
},[socket, dispatch])


// delete group
useEffect(() => {
  socket.on('deleteGroupToClient', data =>{
      dispatch({type:GLOBALTYPES.DELETE_GROUP_TO_CLIENT,payload: data})
      if(conversation?._id === data.conversation._id){
        navigation.navigate('Chat')
      }
  })
  return () => socket.off('deleteGroupToClient')
},[socket, dispatch])

useEffect(() => {
  socket.on('addFriendToGroupToClient', data =>{
      dispatch({type:GLOBALTYPES.ADD_MEMBER_GROUP_TO_CLIENT,payload: data})
  })
  return () => socket.off('addFriendToGroupToClient')
},[socket, dispatch])

 //active user
 useEffect(() => {
  socket.on('activeUserToClient', data =>{
      dispatch(logout())
  })
  return () => socket.off('activeUserToClient')
},[socket, dispatch])


  return <></>;
};

export default SocketClient;
