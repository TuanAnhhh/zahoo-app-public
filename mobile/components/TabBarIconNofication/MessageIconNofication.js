import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {
    Ionicons,
} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const MessageIconNofication = ({ color, iconSize, num }) => {
    const nofiSize = iconSize * 0.7;

    const iconNofiSize = {
        top: -4,
        right: -4,
        height: nofiSize,
        width: nofiSize,
        borderRadius: nofiSize,
    }

    return (
        <View style={styles.container}>
            <Ionicons name="chatbubble" size={iconSize} color={color} />
            <View
                style={[
                    styles.iconNofi,
                    {
                        ...iconNofiSize
                    }
                ]}>
                <Text
                    style={styles.textNofi}
                >
                    {num > 9 ? 'N' : num}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    iconNofi: {
        backgroundColor: 'red',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNofi: {
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
    }
})
export default MessageIconNofication
