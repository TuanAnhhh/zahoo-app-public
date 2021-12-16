import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../core/theme';
import BubbleMultiAvatar from './BubbleMultiAvatar';
import { kickMember } from '../redux/actions/currentConversation' ;
import Toast from 'react-native-root-toast';

const MemberItem = ({ friend }) => {

    const { user, token } = useSelector(state => state.auth);
    const { socket } = useSelector(state => state);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const color = theme.colors.primary;
    const currTheme = useTheme();
    const conversation = useSelector(
        (state) => state.currentConversationsReducer.data
      );

    const isOwnUser = friend._id == user._id;

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

    const handleKickMember = () => {
        dispatch(kickMember(user,friend._id, conversation,token,socket))
        toast(`Bạn đã xóa thành viên ${friend.username} ra khỏi nhóm`)
    }


    return (
        <TouchableHighlight
            underlayColor={currTheme.dark ? "#333" : '#e6e6e6'}
         
        >
            <View style={styles.container}>

                <BubbleMultiAvatar otherUsers={[friend]} />

                <View style={styles.chatContent}>
                    <PaperText style={[styles.userName]}>
                        {friend.username}
                    </PaperText>
                </View>

                <View style={styles.actionContainer}>

                    {conversation.createdBy?._id === user._id && user._id !== friend._id &&
                    <TouchableHighlight
                    activeOpacity={0.7}
                    underlayColor={theme.colors.secondary}
                    onPress={handleKickMember}
                    style={styles.button}
                >
                    <AntDesign name="deleteuser" size={24} color={color} style={styles.backIcon} />

                </TouchableHighlight>
                    }
                    
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

export default MemberItem
