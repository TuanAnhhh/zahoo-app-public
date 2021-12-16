import React from 'react'
import { View, Text, StyleSheet, LogBox } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ListChatRooms from '../components/ListChatRooms'
import HeaderSearchBar from '../components/HeaderSearchBar'
import { useTheme } from '@react-navigation/native'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const MainScreen = () => {

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
    ])

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <HeaderSearchBar />
            <ScrollView style={styles.listChat}>
                <ListChatRooms isGroupChat={false} />
                <View style={{height: responsiveHeight(10)}}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listChat: {
        // marginBottom: responsiveHeight(10)
    }
})


export default MainScreen
