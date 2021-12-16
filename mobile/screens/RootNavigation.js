import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import MainTab from "./MainTab";
import ProfileUserScreen from "./ProfileUserScreen";
import AccountSettingScreen from "./AccountSettingScreen";
import ProfileSettingScreen from "./ProfileSettingScreen";
import ChatScreen from "./ChatScreen";
import ChatLeftHeader from "../components/ChatScreenHeader/ChatLeftHeader";
import ChatRightHeader from "../components/ChatScreenHeader/ChatRightHeader";
import ChatRoomOptionScreen from "./ChatRoomOptionScreen";
import MediaTab from "./MediaTab";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import EditProfileUserScreen from "./EditProfileUserScreen";
import ChooseFileSending from "./ChooseFileSending";
import AddFriendToGroup from "./AddFriendToGroup";
import InviteAddFriend from "./InviteAddFriend";
import { Dimensions } from "react-native";
import CallScreen from "./CallScreen";
import { useTheme } from "@react-navigation/native";
import MemberScreen from "./MemberScreen";
import SearchScreen from "./SearchScreen";
import ImageFullScreen from "./ChatMediaScreen/ImageFullScreen";
import { useSelector } from "react-redux";

import ChangeNumberSetting from "./SecuritySetting/ChangeNumberSetting";
import ChangePasswordSetting from "./SecuritySetting/ChangePasswordSetting";
import ChooseFriendAddToGreoupScreen from "./ChooseFriendAddToGreoupScreen";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const theme = useTheme();

  const { user } = useSelector(state => state.auth)
  const conversation = useSelector(
    (state) => state.currentConversationsReducer.data
  );
  let label = "";

  useEffect(() => {
    if (conversation) {
      label = conversation?.label ? conversation?.label : conversation?.member.find(itemUser => itemUser._id != user._id).username;
    }
  }, [conversation])

  return (
    <Stack.Navigator initialRouteName="MainTab">
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
        })}
        name="MainTab"
        component={MainTab}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Thông tin cá nhân",
        })}
        name="ProfileUserScreen"
        component={ProfileUserScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Cài đặt tài khoản",
        })}
        name="AccountSettingScreen"
        component={AccountSettingScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Thay đổi thông tin cá nhân",
        })}
        name="ProfileSettingScreen"
        component={ProfileSettingScreen}
      />

      <Stack.Screen
        options={({ route }) => ({
          // title: route.params.label,
          title: label,
          headerTitleStyle: {
            fontWeight: "600",
            maxWidth: Dimensions.get("window").width * 0.36,
            overflow: "hidden",
          },
          // headerLeft: () => <ChatLeftHeader otherUsers={route.params.member} />,
          headerLeft: () => <ChatLeftHeader member={conversation?.member} isGroup={conversation?.label != undefined} />,
          headerLeftContainerStyle: {
            backgroundColor: "transparent",
          },
          headerRight: () => <ChatRightHeader />,
          headerRightContainerStyle: {
            backgroundColor: "transparent",
          },
        })}
        name="ChatScreen"
        component={ChatScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Tùy chọn",
        })}
        name="ChatRoomOptionScreen"
        component={ChatRoomOptionScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Cài đặt tài khoản",
        })}
        name="EditProfileUserScreen"
        component={EditProfileUserScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Kho lưu trữ",
        })}
        name="MediaTab"
        component={MediaTab}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
        })}
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
        })}
        name="RegisterScreen"
        component={RegisterScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
        })}
        name="ChooseFileSending"
        component={ChooseFileSending}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
          title: "Tạo nhóm",
          headerTitleStyle: {
            textAlign: "center",
          },
        })}
        name="AddFriendToGroup"
        component={AddFriendToGroup}
      />

      <Stack.Screen
        options={({ navigation, route }) => ({
          title: "Lời mới kết bạn",
        })}
        name="InviteAddFriend"
        component={InviteAddFriend}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Video Call",
          headerShown: false,
        })}
        name="CallScreen"
        component={CallScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          title: "Tìm kiếm",
          headerTitleStyle: {
            textAlign: "center",
          },
          headerTitleAlign: "center",
        })}
        name="SearchScreen"
        component={SearchScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Thành viên nhóm",
          headerShown: true,
        })}
        name="MemberScreen"
        component={MemberScreen}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          title: "Ảnh",
          headerShown: true,
        })}
        name="ImageFullScreen"
        component={ImageFullScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: "Thay đổi số điện thoại",
          headerShown: true,
        })}
        name="ChangeNumberSetting"
        component={ChangeNumberSetting}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: "Thay đổi mật khẩu",
          headerShown: true,
        })}
        name="ChangePasswordSetting"
        component={ChangePasswordSetting}
      />

      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: false,
          title: "Thêm thành viên vào nhóm",
          headerTitleStyle: {
            textAlign: "center",
          },
          headerTitleAlign: "center",
        })}
        name="ChooseFriendAddToGreoupScreen"
        component={ChooseFriendAddToGreoupScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
