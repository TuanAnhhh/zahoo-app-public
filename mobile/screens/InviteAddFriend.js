import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import FriendItem from "../components/FriendItem";
import FriendQueueItem from "../components/FriendQueueItem";
import { Text as PaperText } from "react-native-paper";

export default function InviteAddFriend() {
  const { user, token } = useSelector((state) => state.auth);
  const friendsQueue = useSelector(
    (state) => state.deniedRequestAddFriendReducer.data
  );

  return (
    <View style={styles.container}>
      {friendsQueue == undefined || friendsQueue.length == 0 ? (
        <View style={[styles.container, styles.noFriendContainer]}>
          <PaperText>Bạn chưa có lời mời nào</PaperText>
        </View>
      ) : (
        <FlatList
          data={friendsQueue}
          renderItem={({ item }) => <FriendQueueItem friendQueue={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  noFriendContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
