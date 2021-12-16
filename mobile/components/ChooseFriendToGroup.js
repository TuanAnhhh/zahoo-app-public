import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox, Text as PaperText } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import BubbleMultiAvatar from './BubbleMultiAvatar';

const ChooseFriendToGroup = ({ friend, listMember, setListMember }) => {

    const dispatch = useDispatch();
    const [isSelected, setSelection] = useState(false);

    const handleOnPressCheckBox = (item) => {
        setSelection(!isSelected)
        if (!isSelected) {
            if (!listMember.includes(item)) {
                setListMember([...listMember, item])
            }

        } else {
            setListMember(listMember => listMember.filter(member => member._id !== item._id))
        }


    }

    return (
        <View>
    { friend.username !== undefined && (
        <TouchableOpacity onPress={() => handleOnPressCheckBox(friend)}>
            <View style={styles.container}>

                <BubbleMultiAvatar otherUsers={[friend]} />

                <View style={styles.chatContent}>
                    <PaperText style={[styles.userName]}>
                        {friend.username}
                    </PaperText>
                </View>

                <View style={styles.actionContainer}>

                    <Checkbox
                        status={isSelected ? 'checked' : 'unchecked'}
                    />

                </View>
            </View>
        </TouchableOpacity>
    )}
    

    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    checkbox: {
        alignSelf: "center",
    },
})

export default ChooseFriendToGroup
