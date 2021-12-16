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
import { AntDesign } from '@expo/vector-icons'; 
import { addMembersToGroup } from "../redux/actions/currentConversation";
import Toast from "react-native-root-toast";
import { getDataAPI } from "../api";


const ChooseFriendAddToGreoupScreen = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state);
  const theme = useTheme();
  const conversation = useSelector(
    (state) => state.currentConversationsReducer.data
  );
  let friends = useSelector((state) => state.userReducer.data);
  friends= friends.filter(f=> ! conversation.member?.filter(m=> f._id === m._id).length > 0)

  const friendUser = useSelector((state) => state.userReducer.data);

  const [listMember, setListMember] = useState([]);
  const navigation = useNavigation();
  const [sdt, setSdt] = useState('');
  const [userResutlSearch, setUserResutlSearch] = useState({});
  
  const toast =(notify)=>{
    Toast.show(notify, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: '#fdf',
        borderRadius: 200,
        marginBottom: 30,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: {
        color: '#000',
      }
    })
  }

  const handleAddFriendToGroupChat = () => {

    if (listMember.length >0) {

      try {
        dispatch(addMembersToGroup(listMember,conversation,user,token,socket))
        // navigation.navigate("Group");
        setListMember([]);
        setSdt('')
        toast('Thêm thành công')

      } catch (error) {
        console.log(error);
      }
    } else {
      toast('Chưa có thành viên nào được chọn')
    }
  };

  const handleSearch = async (e)=>{
    setSdt(e)
    try {
    const res = await getDataAPI(`users/phone/${e}`, token)
      if(friendUser.filter(f=> f._id === res.data._id)){
        setUserResutlSearch(res.data)
      } 
  
    
    
    console.log(res.data)
    } catch (error) {
      setUserResutlSearch({})
    }
  }

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
        
        <Title style={styles.title}>Chọn thành viên</Title>

        <View style={styles.headerButton}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={theme.colors.secondary}
            onPress={() => handleAddFriendToGroupChat()}
            style={[styles.backButton, styles.drawerItemLabel]}
          >
            <AntDesign name="addusergroup" size={26} color={theme.colors.primary} style={styles.backIcon} />
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
          value={sdt}
          onChangeText={(e)=>handleSearch(e)}
        />
      </View>

      {friends == undefined || friends.length == 0 && (
        <View style={[styles.container, styles.noFriendContainer]}>
          <PaperText>Có vẻ như bạn bè của bạn đã ở hết trong nhóm</PaperText>
        </View>
      )} 
      
        { friends.length !==0 && sdt ==='' &&(
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
      { friends.length !==0 && sdt !== '' && userResutlSearch !=={}  &&(
        
            <ChooseFriendToGroup
              setListMember={setListMember}
              listMember={listMember}
              friend={userResutlSearch}
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

export default ChooseFriendAddToGreoupScreen;
