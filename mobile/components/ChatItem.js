import { useNavigation } from "@react-navigation/core";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { Text as PaperText } from "react-native-paper";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { postCurrentConversation } from "../redux/actions/currentConversation";
import { getMessagesByConversationId } from "../redux/actions/messagesAction";
import BubbleMultiAvatar from "./BubbleMultiAvatar";
import { callExtension } from "../redux/actions/extensionAction";
import { getConversationsByFriendId } from "../redux/actions/conversationsAction";

const ChatItem = ({ chatRoom }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const member = chatRoom.member;
  const isGroup = chatRoom.label != undefined;
  const otherUsers = member.filter((itemUser) => itemUser._id != user._id);
  const otherUser = otherUsers[0];

  let otherUserProfilePicture =
    "https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
  if (!isGroup && otherUser !== undefined && otherUser?.profilePicture == "")
    otherUserProfilePicture = otherUser?.profilePicture;

  let dotSpace = "";
  let lastMessage = "";
  let createdAt = "";
  const label = isGroup ? chatRoom.label : otherUser.username;
  if (chatRoom.lastMessage != undefined) {
    dotSpace = "•";
    lastMessage = chatRoom.lastMessage.text;
    createdAt = moment(chatRoom.lastMessage.updatedAt).format("HH:mm");
  }

  const openChatRoom = async () => {
    await dispatch(getMessagesByConversationId(chatRoom._id, token));

    const dataExtenstion = {
      name: "",
      isActive: false,
    };
    dispatch(callExtension(dataExtenstion));

    dispatch(postCurrentConversation(chatRoom));
    navigation.navigate("ChatScreen", {
      // member: isGroup ? member : otherUsers,
      // chatRoom: chatRoom,
      // label: label,
    });
  };

  return (
    <TouchableHighlight
      underlayColor={theme.dark ? "#333" : "#e6e6e6"}
      onPress={openChatRoom}
    >
      <View style={styles.container}>
        <BubbleMultiAvatar otherUsers={isGroup ? member : otherUsers} />
        <View style={styles.chatContent}>
          <PaperText style={[styles.userName]}>
            {isGroup ? chatRoom.label : otherUser.username}
          </PaperText>
          <View style={styles.messageWrapper}>
            <PaperText style={[styles.lastMessage]} numberOfLines={1}>
              {lastMessage}
            </PaperText>
            <PaperText style={[styles.dotSpace, styles.text]}>
              {dotSpace}
            </PaperText>
            <PaperText style={[styles.createdAt, styles.text]}>
              {createdAt}
            </PaperText>
          </View>
        </View>
        {/* <View style={styles.seenWrapper}>
                    <Image
                        source={{
                            uri: '' + otherUserProfilePicture,
                        }}
                        style={styles.seenIcon}
                    />
                </View> */}
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginHorizontal: responsiveHeight(1.2),
    padding: 9,
  },
  chatContent: {
    flex: 1,
    marginHorizontal: responsiveHeight(1),
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginVertical: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2.1),
    // fontWeight: '700'
  },
  messageWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  lastMessage: {
    fontSize: responsiveFontSize(1.7),
    flex: 1,
    overflow: "hidden",
  },
  dotSpace: {
    marginHorizontal: 5,
  },
  createdAt: {
    fontSize: responsiveFontSize(1.6),
    // marginLeft: 9
    textAlign: "left",
  },
  seenWrapper: {
    justifyContent: "flex-end",
  },
  seenIcon: {
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 10,
  },
});
export default ChatItem;
