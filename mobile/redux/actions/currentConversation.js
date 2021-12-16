import { GLOBALTYPES } from "../actionType";
import { getDataAPI, postDataAPI, putDataAPI } from "../../api";

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

export const updateLabelCurrentConversation =
  (data, id, auth, socket) => async (dispatch) => {
    const { token, user } = auth;
    try {
      const res = await putDataAPI(
        `conversations/change-label/${id}`,
        data,
        token,
        socket
      );

      const dataSocket = {
        conversationId: id,
        member: res.data.member,
        sender: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
        newLabel: res.data.label,
        msg: `${user.username} đã thay đổi tên nhóm thành ${res.data.label}`,
      };
     
      socket.emit("changeGroupName", dataSocket);

      dispatch({
        type: GLOBALTYPES.UPDATE_LABEL_CURRENTCONVERSATION,
        payload: res.data,
      });
 

      dispatch({ 
        type: GLOBALTYPES.CHANGE_GROUP_NAME_OF_CONVERSATION_IN_LIST_CONVERSATION, 
        payload:{
            conversationId:id,
            newLabel:data.newLabel
        }
    })

    } catch (err) {
      console.log("err", err);
      
    }
  };


  //  out group
export const outGroup = (user, currentConversation,token, socket) => async dispatch => {
   
  const {_id} = currentConversation
  const data={ userId: user._id}

  
  try {
  const res = await postDataAPI(`conversations/out-group/${_id}`,data,token)

      dispatch({ 
          type: GLOBALTYPES.OUT_GROUP, 
          payload: currentConversation
      })
      const dataSocket ={
          conversation: currentConversation,
              memberID:user._id,
                    
      }
      socket.emit("outGroup",dataSocket)
    
  } catch (err) {
      
  }}

  // delete group
export const deleteGroup = (user, conversation, token, socket) => async dispatch => {
 
  const data={ userId: user._id}

  
  try {
  await postDataAPI(`conversations/delete-group/${conversation._id}`,data,token)

      dispatch({ 
          type: GLOBALTYPES.DELETE_GROUP, 
          payload: conversation
      })

      
      const dataSocket ={
          conversation: conversation,
              userID:user._id,
                    
      }
      socket.emit("deleteGroup",dataSocket)

     
  } catch (err) {
      
  }
}

  export const addMembersToGroup = (member, conversation,user, token, socket) => async dispatch => {
    //loc lay ra id
    
  const  _member = member.map(item => item._id)
    try {
       const res= await postDataAPI(`conversations/add-member-group/${conversation._id}`,{member:_member},token)
        dispatch({ 
            type: GLOBALTYPES.UPDATE_CURRENT_CONVERSATION_ADD_MEMBER, 
            payload: {
                conversation, member, user
            }
        })

        // update trong danh sach conversations here

        // su ly socket here
        
        const dataSocket ={
            conversation: conversation,
            member: member,
            user: user
         
        }
        socket.emit("addFriendToGroup",dataSocket)
       

    } catch (error) {
        console.log("err: ", error)
    }
    }


  // kick member
  export const kickMember = (user,memberID, currentConversation,token, socket) => async dispatch => {
    console.log("currentConversation._id",currentConversation._id)
    const {_id} = currentConversation
    const data={ conversationId: currentConversation._id,
      userId: user._id}
  
    
    try {
    const res = await postDataAPI(`conversations/delete-member/${memberID}`,data,token)
  
        dispatch({ 
            type: GLOBALTYPES.KICK_MEMBER, 
            payload: memberID
        })
        const dataSocket ={
            conversation: currentConversation,
            memberID:memberID,
            userID:user._id
                      
        }
        socket.emit("kickMember",dataSocket)
      
    } catch (err) {
        
    }}

