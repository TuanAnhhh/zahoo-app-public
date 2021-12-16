import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text as PaperText, Text } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import BubbleMultiAvatar from './BubbleMultiAvatar';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { theme as themeCore } from '../core/theme'
import { getConversationsByFriendId } from '../redux/actions/conversationsAction';
import { useDispatch, useSelector } from 'react-redux';
import { callExtension } from '../redux/actions/extensionAction';
import { postCurrentConversation } from '../redux/actions/currentConversation';
import { postDataAPI } from '../api';
import { getMessagesByConversationId } from '../redux/actions/messagesAction';
import { cancelRequestAddFriend, requestAddFriend } from '../redux/actions/userAction';

const ResultUserBySearchUser = ({ friend }) => {

    const { user, token } = useSelector(state => state.auth);
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const color = "#fff"
    const currTheme = useTheme();
    const { socket } = useSelector(state => state)

    const moveBack = () => {
        console.log("chua cap nhat phan call");
    }

    const openChatRoom = async () => {
        const dataExtenstion = {
            name: '',
            isActive: false,
        }
        dispatch(callExtension(dataExtenstion));

        try {
            const { data } = await postDataAPI(`conversations/friend/${friend._id}`, { userId: user._id }, token)
            if (data.length === 0) {
                const data = {
                    label: null,
                    array: [friend, user],
                    createdBy: user._id
                };
                dispatch(addConversation(data, token));
            }
            else {
                dispatch(postCurrentConversation(data))
            }

            await dispatch(getMessagesByConversationId(data._id, token))
            navigation.navigate('ChatScreen', { member: [friend], chatRoom: data, label: friend.username })

        } catch (err) {
            // console.log(err);
        }
    }

    const handleSendRequestAddFriend = () => {
        // xu ly here
        dispatch(requestAddFriend(friend._id, user, token, socket))
    }

    const handleCancelRequestAddFriend = () => {
        const data = { userId: user._id }
        dispatch(cancelRequestAddFriend(friend._id, data, token))
    }

    return (
        <View>
            {user._id === friend._id
                ? (
                    <View style={styles.container}>

                        <BubbleMultiAvatar otherUsers={[friend]} />

                        <View style={styles.chatContent}>
                            <PaperText style={[styles.userName]}>
                                {friend.username}
                            </PaperText>
                        </View>
                    </View>
                )
                : friend.friends.includes(user._id)
                    ? (
                        <TouchableHighlight
                            underlayColor={currTheme.dark ? "#333" : '#e6e6e6'}
                            onPress={openChatRoom}
                        >
                            <View style={styles.container}>

                                <BubbleMultiAvatar otherUsers={[friend]} />

                                <View style={styles.chatContent}>
                                    <PaperText style={[styles.userName]}>
                                        {friend.username}
                                    </PaperText>
                                </View>

                                <View style={styles.actionContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.7}
                                        underlayColor={theme.colors.secondary}
                                        onPress={moveBack}
                                        style={styles.button}
                                    >
                                        <Ionicons name="ios-call" size={22} color={color} style={styles.backIcon} />

                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        activeOpacity={0.7}
                                        underlayColor={theme.colors.secondary}
                                        onPress={moveBack}
                                        style={styles.button}
                                    >
                                        <FontAwesome5 name="video" size={20} color={color} style={styles.backIcon} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                    : (
                        <View style={styles.container}>

                            <BubbleMultiAvatar otherUsers={[friend]} />

                            <View style={styles.chatContent}>
                                <PaperText style={[styles.userName]}>
                                    {friend.username}
                                </PaperText>
                            </View>
                            {
                                friend.friendsQueue.includes(user._id)
                                    ? <View style={styles.actionContainer}>
                                        <TouchableHighlight
                                            activeOpacity={0.7}
                                            underlayColor={theme.colors.secondary}
                                            onPress={() => handleCancelRequestAddFriend()}
                                            style={styles.buttonCancel}
                                        >
                                            <PaperText style={{ color: "#000", fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Hủy yêu cầu</PaperText>
                                        </TouchableHighlight>
                                    </View>
                                    : <View style={styles.actionContainer}>
                                        <TouchableHighlight
                                            activeOpacity={0.7}
                                            underlayColor={themeCore.colors.secondary}
                                            onPress={() => handleSendRequestAddFriend()}
                                            style={[
                                                styles.buttonCancel,
                                                themeCore.dark ? { backgroundColor: themeCore.colors.secondary } : { backgroundColor: themeCore.colors.primary }
                                            ]}
                                        >
                                            <PaperText style={{ color: color, fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>Kết bạn</PaperText>

                                        </TouchableHighlight>
                                    </View>
                            }

                        </View>

                    )
            }
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginHorizontal: responsiveHeight(1.2),
        padding: 9
    },
    chatContent: {
        flex: 1,
        marginHorizontal: responsiveHeight(1),
        flexDirection: 'column',
        justifyContent: 'center',
    },
    userName: {
        marginVertical: responsiveHeight(0.5),
        fontSize: responsiveFontSize(2),
        fontWeight: '700'
    },

    actionContainer: {
        flexDirection: 'row',
        marginRight: responsiveHeight(0.5),
        alignItems: 'center',
    },
    button: {
        width: responsiveHeight(5.4),
        height: responsiveHeight(5.4),
        marginRight: responsiveHeight(0.9),
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCancel: {
        padding: 9,
        backgroundColor: "#DDDDDD",
        borderRadius: 99,
        overflow: "hidden",
        paddingHorizontal: 15,
    }
})

export default ResultUserBySearchUser
