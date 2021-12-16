import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux';
import { callExtension } from '../../redux/actions/extensionAction'
import ChooseFileSending from '../../screens/ChooseFileSending';

const ImagePickerExt = () => {
    Keyboard.dismiss();

    const dispatch = useDispatch();
    const [extensionHeight, setExtensionHeight] = useState(300);
    const [currY, setCurrY] = useState(null);

    const onMoveThumb = (evt) => {
        const { pageY } = evt.nativeEvent;
        setExtensionHeight(extensionHeight + (currY - pageY))
        // set lại vị trí Y thumb hiện tại so với Root
        setCurrY(pageY)
    }
    const onResponderGrant = (evt) => {
        const { pageY } = evt.nativeEvent;
        // lấy vị trí Y thumb hiện tại so với Root
        setCurrY(pageY)
    }
    const onResponderRelease = (evt) => {
        if (extensionHeight < 200) {
            dispatch(callExtension({ name: '', isActive: false }))
        }
    }

    // da thay doi
    return (
        <View
            style={[
                styles.container,
                { height: extensionHeight }
            ]}
        >
            <View
                style={styles.thumb}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderMove={onMoveThumb}
                onResponderGrant={onResponderGrant}
                onResponderRelease={onResponderRelease}
            >
                <View style={styles.smallThumb} />
            </View>
            <ChooseFileSending />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    thumb: {
        height: 30,
        alignSelf: 'stretch',
        borderRadius: 100,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    smallThumb: {
        width: '20%',
        height: 6,
        backgroundColor: '#ccc'
    }
})

export default ImagePickerExt
