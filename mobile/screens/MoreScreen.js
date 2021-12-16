import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  Avatar,
  Caption,
  Drawer,
  Switch,
  Title,
  TouchableRipple,
  useTheme,
  Text as PaperText,
} from "react-native-paper";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/actions/themeAction";
import { logout } from "../redux/actions/authAction";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MoreScreen = (props) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme);

  const navigation = useNavigation();
  const theme = useTheme();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Thông báo", "Bạn muốn đăng xuất ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(logout());
          navigation.navigate("LoginScreen");
        },
      },
    ]);
  };

  return (
    <View style={styles.container} {...props}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.user}>
              <Avatar.Image
                source={{
                  uri:
                    user.profilePicture !== null && user.profilePicture !== ""
                      ? user.profilePicture
                      : "https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
                }}
                size={50}
              />
              <View style={styles.userText}>
                <Title style={styles.title}>{user.username}</Title>
                <Caption style={styles.caption}>@{user.username}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="user-alt" size={24} color="#fff"
                  style={{
                    borderRadius: 150,
                    padding: 10,
                    paddingHorizontal: 11,
                    backgroundColor: "#2196F3"
                  }}
                />
              )}
              label="Trang cá nhân"
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate("ProfileUserScreen");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="user-friends" size={size - 4} color="#fff"
                  style={{
                    borderRadius: 150,
                    padding: 10,
                    paddingVertical: 12,
                    backgroundColor: "#17D7A0"
                  }}
                />
              )}
              label="Lời mời kết bạn"
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                props.navigation.navigate("InviteAddFriend");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="settings-sharp"
                  size={size}
                  color={theme.dark ? "#525252" : "#fff"}
                  style={{
                    borderRadius: 150,
                    padding: 9,
                    paddingHorizontal: 10,
                    backgroundColor: theme.dark ? "#fff" : "#525252"
                  }}
                />
              )}
              label="Cài đặt tài khoản"
              labelStyle={styles.drawerItemLabel}
              onPress={() => {
                navigation.navigate("AccountSettingScreen");
              }}
            />
          </Drawer.Section>

          <Drawer.Section title="Lựa chọn">
            <TouchableRipple
              onPress={() => {
                dispatch(changeTheme(!isDarkTheme));
              }}
            >
              <View style={styles.preference}>
                <PaperText style={styles.drawerItemLabel}>Chế độ tối</PaperText>
                <View pointerEvents="none">
                  <Switch value={theme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Feather name="log-out" color={theme.colors.error} size={size + 3} />
          )}
          label="Đăng Xuất"
          labelStyle={[styles.drawerItemLabel, { color: theme.colors.error }, { fontSize: responsiveFontSize(2.3) }]}
          onPress={() => handleLogout()}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  drawerContent: {
    flex: 1,
  },

  userInfoSection: {
    paddingLeft: 20,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
  },

  userText: {
    flexDirection: "column",
    marginLeft: 15,
  },

  title: {
    fontSize: responsiveFontSize(3),
    marginTop: 3,
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  Paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },

  drawerSection: {
    marginTop: 15,
  },

  drawerItemLabel: {
    fontSize: responsiveFontSize(2.1),
  },

  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#ccc",
    borderTopWidth: 0.2,
    paddingTop: 4,
  },

  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});

export default MoreScreen;
