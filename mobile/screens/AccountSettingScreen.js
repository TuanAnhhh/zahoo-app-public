import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from 'react-native-paper';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AccountSettingScreen = () => {

    const navigation = useNavigation();

    const theme = useTheme();
    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign name="mobile1" size={size} color={"#fff"}
                            style={{
                                borderRadius: 150,
                                padding: 10,
                                backgroundColor: "#2196F3"
                            }} />
                    )}
                    label="Đổi số điện thoại"
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {
                        navigation.navigate("ChangeNumberSetting");
                    }}
                />

                <DrawerItem
                    icon={({ color, size }) => (
                        <Fontisto name="locked" color={"#fff"} size={size}
                            style={{
                                borderRadius: 150,
                                padding: 10,
                                paddingHorizontal: 12,
                                backgroundColor: "#17D7A0"
                            }}
                        />
                    )}
                    label="Đổi mật khẩu"
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {
                        navigation.navigate("ChangePasswordSetting");
                    }}
                />
            </DrawerContentScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: -20
    },

    drawerItemLabel: {
        fontSize: responsiveFontSize(2.1),
    },

});
export default AccountSettingScreen
