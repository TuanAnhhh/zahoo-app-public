import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Text as PaperText,
  TextInput,
  Title,
  useTheme
} from "react-native-paper";
import {
  responsiveHeight,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import ChooseFriendToGroup from "../components/ChooseFriendToGroup";
import {
  addConversation
} from "../redux/actions/conversationsAction";


const AddFriendToGroup = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const theme = useTheme();
  const friends = useSelector((state) => state.userReducer.data);

  const [listMember, setListMember] = useState([]);
  const navigation = useNavigation();

  const handleCreateGroupChat = () => {

    if (listMember.length > 1) {
      let name = user.username;
      listMember.map((item) => {
        name += ", " + item.username;
      });

      
      try {
        const _listMember = listMember.map((member) => member._id);
        _listMember.push(user._id);
        const data = {
          label: name,
          array: _listMember,
          createdBy: user._id
        };

        dispatch(addConversation(data, token));
        navigation.navigate("Group");
        setListMember([]);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Thông báo", "Thành viên của nhóm tối thiểu là 3");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <View style={styles.headerLeft}> */}

        <View style={styles.headerButton}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={theme.colors.secondary}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={26} color={theme.colors.primary} style={styles.backIcon} />
          </TouchableHighlight>
        </View>
        
        <Title style={styles.title}>Tạo Nhóm</Title>

        <View style={styles.headerButton}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={theme.colors.secondary}
            onPress={() => handleCreateGroupChat()}
            style={[styles.backButton, styles.drawerItemLabel]}
          >
            {/* <Ionicons name="create-outline" size={28} color={theme.colors.primary} style={styles.backIcon} /> */}
            <Feather name="check" size={26} color={theme.colors.primary} style={styles.backIcon} />
          </TouchableHighlight>
        </View>
      </View>

      <View
        style={[
          styles.searchBar,
          theme.dark ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <View>
          <FontAwesome
            name="search"
            size={responsiveScreenFontSize(2.2)}
            color="black"
            style={styles.searchIcon}
          />
        </View>
        <TextInput
          style={[
            styles.searchInput,
            theme.dark ? styles.darkBackground : styles.lightBackground,
          ]}
          placeholder="Tìm kiếm"
          placeholderTextColor="#909297"
          underlineColor="transparent"
        />
      </View>

      {friends == undefined || friends.length == 0 ? (
        <View style={[styles.container, styles.noFriendContainer]}>
          <PaperText>Bạn chưa có bạn bè nào</PaperText>
        </View>
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <ChooseFriendToGroup
              setListMember={setListMember}
              listMember={listMember}
              friend={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: StatusBar.currentHeight,
  },
  noFriendContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  darkBackground: {
    backgroundColor: "#3a3b3c",
  },
  lightBackground: {
    backgroundColor: "#e6e6e6",
  },
  searchBar: {
    borderRadius: responsiveHeight(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginVertical: responsiveHeight(1.5),
    marginHorizontal: responsiveHeight(1.8),
  },
  searchIcon: {
    color: "#909297",
  },
  searchInput: {
    flex: 1,
    height: responsiveHeight(5),
    marginLeft: 10,
    padding: 0,
    fontSize: responsiveScreenFontSize(2),
    fontWeight: "600",
    color: "#fff",
  },
  header: {
    height: 50,
    marginLeft: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    // marginLeft: 90,
  },
  drawerItemLabel: {
    marginRight: 15
  },
  buttonWrapper: {
    padding: 10,
    borderRadius: 100
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 200,
  },
  backIcon: {
    margin: 6,
  },
});

export default AddFriendToGroup;
