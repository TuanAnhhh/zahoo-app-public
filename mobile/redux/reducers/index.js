import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import showMenuReducer from "./showmenuReducer";
import themeReducer from "./themeReducer";
import conversationsReducer from "./conversationsReducer";
import messagesReducer from "./messagesReducer";
import currentConversationReducer from "./currentConversationReducer";
import socketReducer from "./socketReducer";
import extensionReducer from "./extensionReducer";
import userReducer from "./userReducer";
import peerReducer from "./peerReducer";
import call from './callReducer'
import userResultSearchByPhoneNumberAction from "./userResultSearchByPhoneNumberReducer";

import deniedRequestAddFriendReducer from "./deniedRequestAddFriendReducer";
import getConversationMediaReducer from "./getConversationMediaReducer";
import getFileConversationReducer from "./getFileConversationReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  showMenu: showMenuReducer,
  theme: themeReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
  currentConversationsReducer: currentConversationReducer,
  socket: socketReducer,
  extensions: extensionReducer,
  userReducer: userReducer,
  deniedRequestAddFriendReducer: deniedRequestAddFriendReducer,
  call: call,
  peer: peerReducer,
  userResultSearchByPhoneNumberAction: userResultSearchByPhoneNumberAction,
  getConversationMediaReducer: getConversationMediaReducer,
  getFileConversationReducer:getFileConversationReducer,
  LoadingScreen: loadingReducer
});
export default rootReducer;
