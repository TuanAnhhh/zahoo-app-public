import React from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import { callExtension } from '../redux/actions/extensionAction';


const ChatBoxExtension = ({ openCamera, setShowEmoji }) => {
    const OPEN_IMAGE = 'OPEN_IMAGE';

    const { name, isActive } = useSelector(state => state.extensions);
    const dispatch = useDispatch();

    const openImagePicker = () => {
        setShowEmoji(false)
        const isSameName = name == OPEN_IMAGE;
        const dataExtenstion = {
            name: isSameName ? '' : OPEN_IMAGE,
            isActive: !isSameName,
        }
        dispatch(callExtension(dataExtenstion));
    }

    return (
        <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.button}
                underlayColor={'#98B4A6'}
                onPress={openImagePicker}
            >
                <Ionicons name="md-image" size={26} color="#64868E" style={styles.icon} />
            </TouchableHighlight>

            <TouchableHighlight style={styles.button}
                underlayColor={'#98B4A6'}
                onPress={openCamera}
            >
                <MaterialIcons name="photo-camera" size={26} color="#64868E" style={styles.icon} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        paddingVertical: 8,
    },
    button: {
        height: responsiveHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveHeight(1.8),
        marginRight: -responsiveHeight(1),
        borderRadius: 30,
    },
    icon: {

    },
})
export default ChatBoxExtension
