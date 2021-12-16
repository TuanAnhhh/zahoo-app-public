import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Avatar, useTheme as useThemePaper, Text as TextPaper } from 'react-native-paper';
import * as SMS from 'expo-sms';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequestAddFriend, cancelRequestAddFriend, requestAddFriend, unfriend } from '../redux/actions/userAction';
import { useTheme } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const ContactItem = ({ contact }) => {

    const dispatch = useDispatch();
    const themePaper = useThemePaper();
    const theme = useTheme();

    const { user, token } = useSelector((state) => state.auth);
    const { socket } = useSelector((state) => state);
    const [sdt, setSdt] = useState(contact.phoneNumber);

    const friends = useSelector((state) => state.userReducer.data);
    const friendsQueue = useSelector((state) => state.deniedRequestAddFriendReducer.data);

    const openSendSMS = async (sdt) => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            await SMS.sendSMSAsync(
                sdt,
                'Lời mời sử dựng ứng dụng :.....',
            );
        } else {
            alert("Không truy cập được tin nhắn")
        }
    }

    let alreadyFriend = contact.friends?.includes(user._id);
    let recievedReq = friendsQueue?.find(fr => fr._id == contact._id) != null;
    let sendedReq = contact.friendsQueue?.includes(user._id);

    const sendRequestAddFriend = () => {
        dispatch(requestAddFriend(contact._id, user, token, socket));
        toastNofication("Đã gửi lời mời kết bạn");
        setStatusButton("Hủy yêu cầu")
        setActionButton(() => cancelReqAddFriend);
        setButtonBackground("#ddd")
        setButtonColor("#000")
    }
    const acceptAddFriend = () => {
        dispatch(acceptRequestAddFriend(contact._id, user, token, socket));
        toastNofication("Đã chấp nhận lời mời");
        setStatusButton("Hủy kết bạn");
        setActionButton(() => unfriendAction);
        setButtonBackground(theme.colors.error)
        setButtonColor("#fff")
    }
    const cancelReqAddFriend = () => {
        Alert.alert("Hủy yêu cầu", "Bạn muốn hủy yêu cầu kết bạn?", [
            {
                text: "Không",
                style: "cancel",
            },
            {
                text: "Đồng ý",
                onPress: () => {
                    const data = { userId: user._id }
                    try {
                        dispatch(cancelRequestAddFriend(contact._id, data, token))
                        toastNofication("Đã hủy yêu cầu");
                        setStatusButton("Kết bạn");
                        setActionButton(() => sendRequestAddFriend);
                        setButtonBackground("#ddd")
                        setButtonColor(theme.dark ? "#000" : theme.colors.primary)
                    } catch (err) {
                    }
                },
            },
        ]);
    }
    const unfriendAction = () => {
        Alert.alert("Xóa bạn bè", "Xác nhận xóa bạn bè với người này?", [
            {
                text: "Không",
                style: "cancel",
            },
            {
                text: "Đồng ý",
                onPress: () => {
                    dispatch(unfriend(contact._id, user, token, socket))
                    toastNofication("Đã hủy kết bạn");
                    setStatusButton("Kết bạn");
                    setActionButton(() => sendRequestAddFriend);
                    setButtonBackground("#ddd")
                    setButtonColor(theme.dark ? "#000" : theme.colors.primary)
                },
            },
        ]);
    }
    var [statusButton, setStatusButton] = useState(
        alreadyFriend ? "Hủy kết bạn"
            : recievedReq ? "Chấp nhận"
                : sendedReq ? "Hủy yêu cầu"
                    : "Kết bạn"
    );
    var [actionButton, setActionButton] = useState(
        alreadyFriend ? () => unfriendAction
            : recievedReq ? () => acceptAddFriend
                : sendedReq ? () => cancelReqAddFriend
                    : () => sendRequestAddFriend
    );
    var [buttonBackground, setButtonBackground] = useState(
        alreadyFriend ? theme.colors.error
            : recievedReq ? theme.colors.primary
                : sendedReq ? "#ddd"
                    : "#ddd"
    );

    var [buttonColor, setButtonColor] = useState(
        alreadyFriend ? "#fff"
            : recievedReq ? "#fff"
                : sendedReq ? "#000"
                    : theme.dark ? "#000"
                        : theme.colors.primary
    );

    const toastNofication = (nofi) => {
        Toast.show(nofi ? nofi : "", {
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
            textStyle: { color: '#000', }
        })
    }


    if (contact.phoneNumber == user.phoneNumber)
        return null;
        
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.container} >
                <Avatar.Text size={35} label={contact.username?.charAt(0).toUpperCase()} />

                <View style={styles.infoWrapper}>
                    <TextPaper style={[styles.userName]} numberOfLines={1}>{contact.username}</TextPaper>
                    <TextPaper style={[styles.userNumbers]} numberOfLines={1}>{contact.phoneNumber}</TextPaper>
                </View>

                <TouchableHighlight
                    activeOpacity={0.7}
                    underlayColor={themePaper.colors.secondary}
                    onPress={actionButton}
                    style={[styles.button, { backgroundColor: buttonBackground }]}>
                    <Text
                        style={{
                            color: buttonColor,
                            fontWeight: 'bold',
                        }}
                        numberOfLines={1}
                    >
                        {statusButton}
                    </Text>
                </TouchableHighlight>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    infoWrapper: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 20
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20
    },
    userNumbers: {
        marginRight: 20
    },
    button: {
        padding: 10,
        maxWidth: responsiveScreenWidth(25),
        height: responsiveHeight(5.5),
        borderRadius: 99,
    }
})

export default ContactItem
