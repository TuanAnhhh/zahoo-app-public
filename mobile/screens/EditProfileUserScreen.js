import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Picker
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated, { color } from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { getDataAPI, postDataAPI } from '../api'
import { updateUserInfo } from '../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function EditProfileUserScreen({navigation}) {

  // const navigation = useNavigation();

  const { token, user } = useSelector(state => state.auth);
  const theme = useTheme()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState(user.username)
  // const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [gender, setGender] = useState(user.gender)

  const [image, setImage] = useState(
    user.profilePicture ? user.profilePicture : 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
  )
  const [img, setImg] = useState()
  
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

  const takePhotoFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      try {
        bs.current.snapTo(1)
        setImage(result.uri)
        setImg(result)
      } catch (e) {
        alert('ERROR')
      }
    }
  };

  const choosePhotoFromLibrary = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        
        return '';
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        allowMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })

      if (!result.cancelled) {
        try {
          bs.current.snapTo(1)
          setImage(result.uri)
          setImg(result)
        } catch (e) {
          alert('ERROR')
        }
      }
    }
  }

  const updateInfo = async () => {
    try {
      let imageUrl = '';
      if(img?.mediaType !== undefined){
        const {data: { url },} = await getDataAPI("s3Url");
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": img.mediaType,
          },
          body: img,
        });
        imageUrl = url.split("?")[0];
      }
      
      const data = {
          newUsername: userName,
          newProfilePicture: imageUrl ,
          newGender: gender
      }
      const res = await postDataAPI('users/edit-infor/' + user._id, data, token);
      dispatch(updateUserInfo({ 
        user: res.data,
        token: token
      }))

      toast('Cập nhật thành công')
      setTimeout(() => {
        navigation.navigate("ProfileUserScreen")
      }, 300);
    } catch (error) {
      toast('Cập nhật thất bại')
      console.log(error)
    }
  }

  const renderInner = () => (
    <Animated.View style={[styles.panel, theme.dark ? { backgroundColor: "#3a3b3c" } : { backgroundColor: "#fff" }]}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Sửa ảnh đại diện</Text>
        <Text style={styles.panelSubtitle}>chọn ảnh đại diện </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={() => { console.log("xem anh dai dien"); }}
      >
        <Text style={styles.panelButtonTitle}>Xem ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={() => bs.current.snapTo(1)}
      >
        <View>
          <Text style={styles.panelButtonTitle}>Hủy</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  const renderHeader = () => (
    <View style={[styles.headerSheet, theme.dark ? { backgroundColor: "#3a3b3c" } : { backgroundColor: "#fff" }]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  )

  const bs = React.createRef()

  const fall = new Animated.Value(1)

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView behavior="padding">
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={() => renderInner()}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />

        <Animated.View
          style={{
            opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
            marginBottom: windowHeight * 0.3,
            alignItems: "center"
          }}
        >

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View style={styles.imageUser}>
                <ImageBackground
                  source={{
                    uri: image + ' ',
                  }}
                  style={{ width: '100%', height: '100%', flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: "92%",
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderTopWidth: 1,
                      borderColor: "#ddd",
                      backgroundColor: "#ddd",
                      opacity: 0.4
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#808080"
                      style={styles.iconCamera}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>
              {user.username}
            </Text>
          </View>

          <View style={{ width: "90%", marginTop: 20 }}>
            <View style={styles.action}>
              <FontAwesome5 name="user" size={20} color={theme.colors.primary} />
              <TextInput
                placeholder="Tên người dùng"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  theme.dark ? { color: "#fff" } : { color: "#000" }
                ]}
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>

            <View style={[styles.action, { alignItems: "center" }]}>
              <FontAwesome5 name="transgender" size={26} color={theme.colors.primary} />
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => { console.log(itemValue); setGender(itemValue) }}
                style={[
                  styles.textInput,
                  theme.dark ? { color: "#fff" } : { color: "#000" },
                  { fontSize: 100 }
                ]}
              >
                <Picker.Item label="Giới tính" value="disable" color="#808080" style={{ fontSize: 100 }} />
                <Picker.Item label="Nam" value={true} />
                <Picker.Item label="Nữ" value={false} />
              </Picker>
            </View>

            <TouchableOpacity
              style={[
                styles.commandButton,
                { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => {
                updateInfo();
              }}
            >
              <Text style={styles.panelButtonTitle}>Cập nhật</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },

  header: {
    height: (windowHeight * 5) / 100,
    flexDirection: 'row',
  },

  imageUser: {
    width: (windowWidth * 30) / 100,
    height: (windowWidth * 30) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: (windowWidth * 30) / 100,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#ddd",
  },

  iconCamera: {
    opacity: 0.7,
    borderRadius: 10,
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    
  },
  headerSheet: {
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    zIndex: 10,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingBottom: 5,
    justifyContent: "space-around"
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    // -------------
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginLeft: 20,
    fontSize: responsiveFontSize(2.4),
    maxWidth: "80%",
  },
})
