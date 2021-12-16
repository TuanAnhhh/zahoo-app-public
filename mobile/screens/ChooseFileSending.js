import React, { useMemo } from "react";
import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { MediaType } from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../api";
import { addMesage } from "../redux/actions/messagesAction";
import { callExtension } from "../redux/actions/extensionAction";

const ForceInset = {
  top: "never",
  bottom: "never",
};

export default function ChooseFileSending() {
  const conversationId = useSelector(
    (state) => state.currentConversationsReducer.data._id
  );
  const { auth } = useSelector((state) => state);
  const { socket } = useSelector((state) => state);
  const { member } = useSelector(
    (state) => state.currentConversationsReducer.data
  );
  const dispatch = useDispatch();

  const onSuccess = (dt: any) => {
    if (dt.length > 0) {
      dt.map(async (item) => {
        const newArr = [];
        const {
          data: { url },
        } = await getDataAPI("s3Url");
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": item.mediaType,
          },
          body: item,
        });
        const imageUrl = url.split("?")[0];
        newArr.push({
          url: imageUrl,
          type: item.mediaType === "photo" ? "image" : "video/mp4",
        });
        const data = {
          conversation: conversationId,
          sender: auth.user,
          text: "",
          media: newArr,
        };
        dispatch(addMesage({ data, auth, socket, member }));
      });
    }
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Vui lòng cấp quyền truy cập thư viện",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 1000,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 0,
      maxSelection: 5,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  // const widgetResize = useMemo(
  //     () => ({
  //         width: 50,
  //         compress: 0.7,
  //         base64: false,
  //         saveTo: 'jpeg',
  //     }),
  //     []
  // );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: "orange",
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "Gửi",
        back: "Hủy",
        selected: "Mục được chọn ",
      },
      midTextColor: "blue",
      minSelection: 0,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        const dataExtenstion = {
          name: "",
          isActive: false,
        };
        dispatch(callExtension(dataExtenstion));
      },
      onSuccess: (e: any) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        {/* <StatusBarPlaceHolder /> */}
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            // Resize={widgetResize} know how to use first , perform slower results.
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
