import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text as PaperText, useTheme as paperTheme } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import BubbleMultiAvatar from './BubbleMultiAvatar';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../core/theme'
import { addConversation, getConversationsByFriendId } from '../redux/actions/conversationsAction';
import { useDispatch, useSelector } from 'react-redux';
import { callExtension } from '../redux/actions/extensionAction';
import { postCurrentConversation } from '../redux/actions/currentConversation';
import { postDataAPI } from '../api';
import { getMessagesByConversationId } from '../redux/actions/messagesAction';

const FriendItem = ({ friend }) => {

    const { user, token } = useSelector(state => state.auth);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const color = theme.colors.primary;
    const currTheme = useTheme();

    const isOwnUser = friend._id == user._id;

    

    const moveBack = () => {
        console.log("chua cap nhat phan call");
    }

    const openChatRoom = async () => {
        if(!isOwnUser){
            const dataExtenstion = {
                name: '',
                isActive: false,
            }
            dispatch(callExtension(dataExtenstion));
    
            try {
                const { data } = await postDataAPI(`conversations/friend/${friend._id}`, { userId: user._id }, token)

                const listMember=[]

                if (data.length === 0) {
                    const data = {
                        array: [friend,user] ,
                        createdBy: user._id
                      };
                      dispatch(addConversation(data, token));
                    
                }
                else {
                    await dispatch(postCurrentConversation(data))
                }
    
                await dispatch(getMessagesByConversationId(data._id, token))
                navigation.navigate('ChatScreen', { 
                    // member: [friend], chatRoom: data, label: friend.username
                 })
    
            } catch (err) {
                console.log(err);
            }
        }else{
            navigation.navigate("ProfileUserScreen");
        }
    }

    

    return (
        <TouchableHighlight
            underlayColor={currTheme.dark ? "#333" : '#e6e6e6'}
            onPress={openChatRoom }
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
        marginRight: responsiveHeight(0.3),
        alignItems: 'center'
    },
    button: {
        width: responsiveHeight(5.4),
        height: responsiveHeight(5.4),
        marginRight: responsiveHeight(0.9),
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default FriendItem
