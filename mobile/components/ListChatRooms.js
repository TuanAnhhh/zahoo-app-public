import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text as PaperText } from 'react-native-paper'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'


const ListChatRooms = ({ isGroupChat }) => {
  
  let conversations = useSelector(state => state.conversations.data);


  if (isGroupChat == true) {
    conversations = conversations.filter(conv => {
      // return conv.member.length > 2;
      return conv.label != undefined;
    });
  }

  if (conversations == undefined || conversations.length == 0) {
    if (isGroupChat == true) {
      return (
        <View style={styles.container}>
          <PaperText>
            Bạn chưa có nhóm nào
          </PaperText>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <PaperText>
            Bạn chưa có tin nhắn với người nào khác
          </PaperText>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={conversations}
        renderItem={({ item }) =>
          <ChatItem chatRoom={item} />
        }
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ListChatRooms
