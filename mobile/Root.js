import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { io } from "socket.io-client";
import React, { useEffect } from "react";
import SocketClient from "./SocketClient";
import { StatusBar } from "expo-status-bar";
import { GLOBALTYPES } from "./redux/actionType";
import RootNavigation from "./screens/RootNavigation";
import { ActivityIndicator, Image, View } from "react-native";
import RootAuthenication from "./screens/RootAuthenication";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getConversationsByUserId } from "./redux/actions/conversationsAction";
import {
  getFriendsFromUser,
  getQueueFriendsFromUser,
} from "./redux/actions/userAction";
import { RootSiblingParent } from 'react-native-root-siblings';
import { setLoadingScreen } from "./redux/actions/loadingAction";
import Background from "./components/Background";

const Root = () => {
  const [MESS_NOFICATION_COUNT, set_MESS_NOFICATION_COUNT] = React.useState(0);

  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initLoginProps = {
    isLoading: true,
    userToken: null,
  };

  const MyDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      text: "#000",
      // primary: "#64868E",
      primary: "#60a0af",
      secondary: "#98B4A6",
      background: "#ffffff",
      grayText: "#333",
      error: "#f53e2d",
    },
  };
  const MyDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      // primary: "#98B4A6",
      primary: "#60a0af",
      // secondary: '#64868E',
      text: "#fff",
      grayText: "#ccc",
      error: "#f53e2d",
    },
  };

  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io("http://192.168.1.6:8800", { jsonp: false });
    // const socket = io("http://178.128.122.216:5000", { jsonp: false });
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  // useEffect(() => {
  //     let userToken;
  //     userToken = null;
  //     let userStringify = null;
  // setTimeout(async () => {
  //     try {
  //       await AsyncStorage.removeItem('AccessToken');
  //       await AsyncStorage.removeItem('User');

  //         dispatch(retrieveAuth(JSON.parse(userStringify), userToken));
  //     } catch (e) {
  //         console.log(e);
  //     }
  // }, 1000)
  // }, [dispatch, token, user])

  useEffect(() => {
    if (user) {
      try {
        dispatch(getConversationsByUserId(user._id, token));
        dispatch(getFriendsFromUser(user.friends));
        dispatch(getQueueFriendsFromUser(user.friendsQueue));
      } catch (error) {
        console.log(error);
      }
    }
    else {
      dispatch(setLoadingScreen(true));
      setTimeout(() => {
        dispatch(setLoadingScreen(false));
      }, 2000);
    }
  }, [token, user, dispatch]);

  // peer
  // useEffect(() => {
  //   const newPeer = new Peer(undefined,{
  //       host: '/', port: '3001'
  //   })
  //   dispatch({type:GLOBALTYPES.PEER, payload: newPeer})
  //  }, [dispatch])

  const theme = isDarkTheme ? MyDarkTheme : MyDefaultTheme;
  const isLoading = useSelector((state) => state.alert.loading);

  const isLoadingScreen = useSelector((state) => state.LoadingScreen)

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  }

  if (isLoadingScreen) {
    return (
      <View style={{
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image source={require('./assets/logo.png')} style={{ width: 110, height: 110, marginBottom: 8 }} />
      </View>
    );
  }


  return (
    <RootSiblingParent>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {token && <SocketClient />}
          <StatusBar barStyle="light-content" />
          {token == null ? <RootAuthenication /> : <RootNavigation />}
        </NavigationContainer>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
