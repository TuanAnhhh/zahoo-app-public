import React from 'react'
import { View, Text, StyleSheet, LogBox, FlatList } from 'react-native'
import { useTheme, useRoute } from '@react-navigation/native'
import FriendItem from '../components/FriendItem'
import MemberItem from '../components/MemberItem'

const MemberScreen = () => {

    let {member} = useRoute().params;

    if (member == undefined || member.length <= 0) {
        member = []
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={member}
                renderItem={({ item }) =>
                    <MemberItem friend={item}/>
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20
    },
    listChat: {
        marginBottom: 50
    }
})


export default MemberScreen
