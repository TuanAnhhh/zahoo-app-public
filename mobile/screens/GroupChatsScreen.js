import React from 'react'
import { View, Text, StyleSheet, LogBox, SafeAreaView, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ListChatRooms from '../components/ListChatRooms'
import HeaderSearchBar from '../components/HeaderSearchBar'
import HeaderScreenGroup from '../components/HeaderScreenGroup'

const GroupChatsScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <HeaderScreenGroup /> */}
            <HeaderSearchBar />

            <ScrollView>
                <ListChatRooms isGroupChat={true} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: StatusBar.currentHeight
    }
})


export default GroupChatsScreen
