import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Button,
  Alert,
} from "react-native";
import { Text as PaperText } from "react-native-paper";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import BubbleMultiAvatar from "./BubbleMultiAvatar";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { getConversationsByFriendId } from "../redux/actions/conversationsAction";
import { useDispatch, useSelector } from "react-redux";
import { callExtension } from "../redux/actions/extensionAction";
import { postCurrentConversation } from "../redux/actions/currentConversation";
import { postDataAPI } from "../api";
import { getMessagesByConversationId } from "../redux/actions/messagesAction";
import {
  acceptRequestAddFriend,
  deniedRequestAddFriend,
} from "../redux/actions/userAction";

const FriendQueueItem = ({ friendQueue }) => {

  const {socket} = useSelector(state => state)
  const { user, token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currTheme = useTheme();

  const acceptAddFriend = React.useCallback(
    (id) => {
      dispatch(acceptRequestAddFriend(id, user, token,socket));
    },
    [user, token, dispatch,socket]
  );

  const deniedRequestFriend = React.useCallback(
    (id) => {
      const data = {
        userId: user._id,
      };
      dispatch(deniedRequestAddFriend(id, data, token,socket));
    },
    [user, token, dispatch,socket]
  );

  return (
    <View style={[
      styles.container,
      currTheme.dark ? {backgroundColor: "#202020"} : {backgroundColor: "#fff"}
    ]}>
      <BubbleMultiAvatar otherUsers={[friendQueue]} />

      <View style={styles.chatContent}>
        <PaperText numberOfLines={1} style={[styles.userName]}>{friendQueue.username}</PaperText>
      </View>

      <View style={styles.actionContainer}>
        <TouchableHighlight
          underlayColor={theme.colors.secondary}
          onPress={() => {
            acceptAddFriend(friendQueue._id);
          }}
          style={[
            styles.button, 
            // currTheme.dark ? {backgroundColor: theme.colors.secondary} : {backgroundColor: theme.colors.primary}
            {backgroundColor: theme.colors.primary}
          ]}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Chấp nhận</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.actionContainer}>
        <TouchableHighlight
          underlayColor={theme.colors.secondary}
          onPress={() => {
            deniedRequestFriend(friendQueue._id);
          }}
          style={[
            styles.button,
            {marginLeft: 15}
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>Xóa</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 9,
    marginVertical: 5,
    // borderBottomWidth: 0.2,
    // borderTopWidth: 0.2,
    borderColor: "#ccc",
    marginBottom: 5
  },
  chatContent: {
    flex: 1,
    marginHorizontal: responsiveHeight(1),
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginVertical: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
  },

  actionContainer: {
    flexDirection: "row",
    marginRight: responsiveHeight(0.3),
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#DDDDDD",
    minWidth: responsiveHeight(7),
  },
});

export default FriendQueueItem;
