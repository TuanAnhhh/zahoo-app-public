import React from 'react'
import { View, Text, StyleSheet, Keyboard } from 'react-native'

const FilePickerExt = () => {
    Keyboard.dismiss();
    
    return (
        <View style={styles.container}>
            <Text>FilePickerExt</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        height: 300,
        width: '100%', 
    }
})

export default FilePickerExt
