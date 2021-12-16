import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Dialog,
  Drawer,
  Paragraph,
  Portal,
  RadioButton,
  Text as PaperText, Title
} from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { useDispatch, useSelector } from "react-redux";
import BubbleMultiAvatar from "../components/BubbleMultiAvatar";
import { deleteGroup, outGroup, updateLabelCurrentConversation } from "../redux/actions/currentConversation";
import { unfriend } from "../redux/actions/userAction";
import Toast from "react-native-root-toast";

const ChatRoomOptionScreen = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { auth, socket } = useSelector((state) => state);

  const conversation = useSelector(
    (state) => state.currentConversationsReducer.data
  );
  const isDarkTheme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const [nameGroup, setnameGroup] = useState(conversation?.label);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [modalNameGroup, setModalNameGroup] = useState(conversation?.label)
  const [modalVisible, setModalVisible] = useState(false);

  const hideDialog = () => setIsDialogVisible(false);
  const [valueTurnOffNofication, setValueTurnOffNofication] =
    React.useState("");

    const toast =(notify)=>{
      Toast.show(notify, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        containerStyle: {
          backgroundColor: '#fdf',
          borderRadius: 200,
          marginBottom: 30,
          paddingHorizontal: 20,
          shadowColor: "#e6e6e6",
          shadowOpacity: 0.5,
        },
        textStyle: {
          color: '#000',
        }
      })
    }

  const handleChangeNameGroupChat = (newName) => {
    if(newName.length > 4){
      const data = {
        newLabel: newName,
      };
      dispatch(
        updateLabelCurrentConversation(data, conversation._id, auth, socket)
      );
      toast('cập nhật thành công')
    }else {
      toast('Tên nhóm không hợp lệ')
    }
    
  };

  // unfriend
  const handleDeleteFriend = (id) => {
    dispatch(unfriend(id, user, token, socket))
    Toast.show("Đã xóa bạn bè", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 200,
        marginBottom: 30,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: {
        color: '#000',
      }
    })
  }

  // out group chat
  const handleOutGroupChat = () => {
    dispatch(outGroup(user, conversation, token, socket))

    Toast.show("Đã rời khỏi nhóm", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 200,
        marginBottom: 30,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: {
        color: '#000',
      }
    })
    navigation.navigate('Chat')

  }

  
  // delete group chat
  const handleDeleteGroupChat = () => {
    dispatch(deleteGroup(user, conversation, token, socket))
    Toast.show("Nhóm của bạn đã được giải tán", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 200,
        marginBottom: 30,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: {
        color: '#000',
      }
    })
    navigation.navigate('Chat')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.seperateWrapper}>
          <View style={styles.userInfo}>
            <BubbleMultiAvatar
              otherUsers={conversation?.member}
              styleFormat={{ width: 80, height: 80 }}
              isGroup={conversation?.label != undefined}
            />
            {conversation?.label !== undefined ? (
              <View style={styles.nameGroup}>
                <Text
                  style={[styles.textNameGroup, { color: isDarkTheme ? "#fff" : "#000" },]}
                  onPress={() => setModalVisible(true)}
                  numberOfLines={1}
                >
                  {nameGroup}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)}>
                  <AntDesign name="edit" size={30} color={theme.dark ? "#fff" : theme.colors.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <Title style={styles.userName}>{conversation?.member.find(itemUser => itemUser._id != user._id).username}</Title>
            )}
          </View>
        </View>
        <View style={styles.seperateWrapper}>
          <Drawer.Section title="Lưu trữ">
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="folder-open-o" size={size} color={color} />
              )}
              label="Kho lưu trữ"
              labelStyle={styles.drawerItemLabel}
              style={styles.drawerItem}
              onPress={() => {
                navigation.navigate("MediaTab");
              }}
            />
          </Drawer.Section>
          {conversation?.label !== undefined && (
            <Drawer.Section title="Nhóm">

              {conversation.createdBy?._id === user._id &&
                <DrawerItem
                  icon={({ color, size }) => (
                    <MaterialCommunityIcons
                      name="account-plus"
                      size={size}
                      color={color}
                    />
                  )}
                  label={`Thêm thành viên`}
                  labelStyle={styles.drawerItemLabel}
                  style={styles.drawerItem}
                  onPress={() => {
                    navigation.navigate("ChooseFriendAddToGreoupScreen", {
                      member: conversation?.member,
                    });
                  }}
                />}

              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-group"
                    size={size}
                    color={color}
                  />
                )}
                label={`Thành viên (${conversation?.member.length} thành viên)`}
                labelStyle={styles.drawerItemLabel}
                style={styles.drawerItem}
                onPress={() => {
                  navigation.navigate("MemberScreen", {
                    member: conversation?.member,
                  });
                }}
              />

            </Drawer.Section>

          )}

          {conversation?.label === undefined ? (
            <Drawer.Section title="Quyền riêng tư">

              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons name="block" size={size} color={color} />
                )}
                label={`Xóa bạn bè ${conversation?.member.filter(member => member._id !== user._id)[0].username} `} //${otherUsers[0].username}
                labelStyle={styles.drawerItemLabel}
                style={styles.drawerItem}
                onPress={(id) => {

                  handleDeleteFriend(conversation?.member.filter(member => member._id !== user._id)[0]._id)
                }}
              />
            </Drawer.Section>


          ) : (
            <Drawer.Section title="Quyền riêng tư">

              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons name="block" size={size} color={color} />
                )}
                label={`Rời khỏi nhóm`}
                labelStyle={styles.drawerItemLabel}
                style={styles.drawerItem}
                onPress={handleOutGroupChat}
              />

              {conversation.createdBy?._id === user._id &&
                <DrawerItem
                  icon={({ color, size }) => (
                    <MaterialCommunityIcons name="delete-variant" size={size} color={color} />
                  )}
                  label={`Giải tán nhóm`}
                  labelStyle={styles.drawerItemLabel}
                  style={styles.drawerItem}
                  onPress={handleDeleteGroupChat}
                />
              }
            </Drawer.Section>
          )}

          {/* dialog choose time turn off nofication */}
          <Portal>
            <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Paragraph style={styles.dialogCheckBoxTitle}>
                  Tắt thông báo trò chuyện?
                </Paragraph>
                <RadioButton.Group
                  onValueChange={(newValue) =>
                    setValueTurnOffNofication(newValue)
                  }
                  value={valueTurnOffNofication}
                >
                  <RadioButton.Item
                    label="Second item"
                    value="second"
                    style={styles.dialogCheckBox}
                  />
                  <RadioButton.Item
                    label="First item"
                    value="first"
                    style={styles.dialogCheckBox}
                  />
                </RadioButton.Group>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tên nhóm</Text>
            <TextInput
              value={modalNameGroup}
              style={{
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
                marginVertical: 20,
                fontSize: responsiveFontSize(2)
             
              }}
              selectTextOnFocus={true}
              autoFocus={true}
              numberOfLines={1}
              onChangeText={(text) => setModalNameGroup(text)}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalNameGroup(nameGroup);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setnameGroup(modalNameGroup);
                  setModalVisible(!modalVisible);
                  handleChangeNameGroupChat(modalNameGroup);
                  
                }}
              >
                <Text style={styles.textStyle}>Cập nhật</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const QuickOptionItem = (actionFunction, optionIcon, label) => {
  const theme = useTheme();
  return (
    <TouchableHighlight
      onPress={actionFunction}
      underlayColor={theme.dark ? "#3d3c3e" : "#f2f2f2"}
      style={styles.optionItemContainer}
    >
      <View style={styles.optionItem}>
        <View style={styles.iconWrapper}>{optionIcon}</View>
        <PaperText style={styles.optionLabel} numberOfLines={2}>
          {label}
        </PaperText>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    // backgroundColor: '#ccc'
  },
  seperateWrapper: {
    marginBottom: 6,
    paddingVertical: 6,
  },
  userInfo: {
    marginVertical: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    marginTop: 10,
  },
  quickOptions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  optionItemContainer: {
    width: 80,
    paddingVertical: 10,
  },
  optionItem: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconWrapper: {
    width: 37,
    height: 37,
    borderRadius: 37,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabel: {
    marginTop: 10,
    textAlign: "center",
    fontSize: responsiveFontSize(1.7),
  },
  drawerItem: {
    marginHorizontal: 20,
  },
  drawerItemLabel: {
    fontSize: responsiveFontSize(2),
  },
  dialogCheckBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  dialogCheckBoxTitle: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "700",
    paddingBottom: 30,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.2,
  },
  nameGroup: {
    flexDirection: "row",
    maxWidth: "65%",
    justifyContent: "center",
  },
  textNameGroup: {
    fontSize: responsiveFontSize(3),
    paddingRight: 8
  },
  // =============================

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.3)"
  },
  modalView: {
    width: Dimensions.get("window").width * 0.8,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: responsiveFontSize(1.8)
  },
  modalText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  }
});

export default ChatRoomOptionScreen;
