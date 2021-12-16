import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import BubbleMultiAvatar from './BubbleMultiAvatar';

const SystemButton = ({ avatarButton, titleButton, callback }) => {

    const currTheme = useTheme();

    const handleAction = () => {
        callback();
    }
    return (
        <TouchableHighlight
            underlayColor={currTheme.dark ? "#111" : '#e6e6e6'}
            // style={{ backgroundColor: currTheme.dark ? "#333" : '#fff' }}
            onPress={handleAction}
        >
            <View
                style={[
                    styles.container,
                    // { backgroundColor: currTheme.dark ? "#333" : '#fff' }
                ]}
            >

                <BubbleMultiAvatar otherUsers={[{ profilePicture: avatarButton }]} />

                <View style={styles.chatContent}>
                    <PaperText style={[styles.userName]}>
                        {titleButton}
                    </PaperText>
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
        // fontWeight: '700'
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
export default SystemButton
