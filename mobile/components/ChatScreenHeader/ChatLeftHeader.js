import React from 'react'
import { View, Text, Pressable, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../core/theme';
import BubbleMultiAvatar from '../BubbleMultiAvatar';
import { useSelector } from 'react-redux';

const ChatLeftHeader = ({ member, isGroup }) => {
    const { user } = useSelector(state => state.auth)

    if (!isGroup) {
        const otherUser = member?.find(itemUser => itemUser._id != user._id);
        member = [otherUser];
    }

    const color = theme.colors.primary;

    const navigation = useNavigation();
    const moveBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight
                activeOpacity={0.7}
                underlayColor={theme.colors.secondary}
                onPress={moveBack}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={25} color={color} style={styles.backIcon} />
            </TouchableHighlight>

            <BubbleMultiAvatar otherUsers={member} styleFormat={styles.avatar} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        marginHorizontal: responsiveHeight(1.8),
        borderRadius: 200,
    },
    backIcon: {
        margin: 6,
    },
    avatar: {
        width: responsiveHeight(4.5),
        height: responsiveHeight(4.5),
        borderRadius: responsiveHeight(4.5),
        marginHorizontal: -8,
    },
})
export default ChatLeftHeader
