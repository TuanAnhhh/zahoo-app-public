import React from "react";
import {
  View,
  Text,
  Pressable,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { theme } from "../../core/theme";
import { GLOBALTYPES } from "../../redux/actionType";
import { useDispatch, useSelector } from "react-redux";

const ChatRightHeader = () => {
  const color = theme.colors.primary;

  const navigation = useNavigation();

  const conversation = useSelector(
    (state) => state.currentConversationsReducer.data
  );

  const dispatch = useDispatch();
  const { call, socket, peer, auth } = useSelector((state) => state);

  let member = conversation?.member;
  const friends = member.filter((e) => e._id !== auth.user._id);
  const friendsCount = friends.length;
  // console.log("friendsCount", friendsCount)
  // Call
  const caller = ({ video }) => {
    const { _id, profilePicture, username } = friends[0];

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      profilePicture,
      username,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const handleAudioCall = () => {
    caller({ video: false });
    navigation.navigate("CallScreen");
  };
  const handleVideoCall = () => {
    caller({ video: true });
    navigation.navigate("CallScreen");
  };
  const openStorage = () => {
    navigation.navigate("ChatRoomOptionScreen");
  };

  const moveBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={theme.colors.secondary}
        onPress={handleAudioCall}
        style={styles.button}
      >
        <Ionicons
          name="ios-call"
          size={22}
          color={color}
          style={styles.backIcon}
        />
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={theme.colors.secondary}
        onPress={handleVideoCall}
        style={styles.button}
      >
        <FontAwesome5
          name="video"
          size={20}
          color={color}
          style={styles.backIcon}
        />
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={theme.colors.secondary}
        onPress={openStorage}
        style={styles.button}
      >
        <Ionicons
          name="menu-sharp"
          size={28}
          color={color}
          style={styles.backIcon}
        />
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: responsiveHeight(0.3),
  },
  button: {
    width: responsiveHeight(5.4),
    height: responsiveHeight(5.4),
    marginRight: responsiveHeight(0.9),
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    // margin: 6,
  },
});
export default ChatRightHeader;
