import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import conversationsReducer from "./conversationsReducer";
import userResultFromModalAddFriendReducer from "./userResultFromModalAddFriendReducer";
import currentConversationReducer from "./currentConversationReducer";
import messagesReducer from "./messagesReducer";
import modalReducer from "./modalReducer";
import socketReducer from "./socketReducer";
import onlineReducer from "./onlineReducer";
import peerReducer from "./peerReducer";
import call from "./callReducer";
import userReducers from "./users";
import notifyReducer from "./notifyReducer";
import typingReducer from "./typingReducer";
import suggessFriendReducer from "./suggessFriendReducer";
import usersRequestAddFriend from "./usersRequestAddFriend";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  conversations: conversationsReducer,
  userResultFromModalAddFriend: userResultFromModalAddFriendReducer,
  currentConversation: currentConversationReducer,
  messages: messagesReducer,
  modal: modalReducer,
  socket: socketReducer,
  online: onlineReducer,
  call: call,
  peer: peerReducer,
  users: userReducers,
  notify: notifyReducer,
  typing: typingReducer,
  suggessFriendReducer: suggessFriendReducer,
  usersRequestAddFriend: usersRequestAddFriend,
});
export default rootReducer;
