import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, Pressable, Text } from 'react-native'
import { useTheme } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Toast from 'react-native-root-toast';
import { Feather, Fontisto, Ionicons, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { postDataAPI } from '../../api';

export default function ChangeNumberSetting() {

    const navigation = useNavigation();
    const { token, user } = useSelector(state => state.auth)

    const { colors } = useTheme();
    const [currPassShow, setCurrPassShow] = useState(true)
    const [newPassShow, setNewPassShow] = useState(true)

    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reTypePass, setReTypePass] = useState("");

    const showNofication = (nofiText) => {
        Toast.show(nofiText ? nofiText : "", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            containerStyle: {
                backgroundColor: '#fff',
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

    const updatePassword = async () => {
        if (newPass != reTypePass) {
            showNofication("Mật khẩu không trùng hớp");
            return;
        }
        else if (newPass.length <= 5) {
            showNofication("Mật khẩu phải chứa hơn 5 ký tự");
            return;
        }

        try {
            const data = {
                newPassword: newPass,
                oldPassword: currPass
            }
            const res = await postDataAPI('users/change-password/' + user._id, data, token);


            showNofication("Cập nhật mật khẩu thành công");
            setTimeout(() => {
                navigation.navigate("AccountSettingScreen")
            }, 500);
        } catch (error) {
            showNofication("Mật khẩu sai");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.action}>
                <MaterialCommunityIcons
                    name="account-key"
                    color={colors.text}
                    size={20}
                    style={[styles.icon, { marginRight: 8 }]}
                />
                <TextInput
                    placeholder="Mật khẩu hiện tại"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text,
                    }]}
                    secureTextEntry={currPassShow}
                    onChangeText={(pass) => setCurrPass(pass)}
                />
            </View>
            <View style={styles.action}>
                <AntDesign
                    name="mobile1"
                    color={colors.text}
                    size={20}
                    style={[styles.icon, { marginRight: 8 }]}
                />
                <TextInput
                    placeholder="Số điện thoại mới"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text,
                    }]}
                    secureTextEntry={newPassShow}
                    onChangeText={(newpass) => setNewPass(newpass)}
                />
                <TouchableOpacity onPress={() => { console.log("gủi otp"); }} >
                    <View style={{ backgroundColor: "#60a0af", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 999 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: "bold", color: "#fff" }}>Gửi mã</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <Feather
                    name="message-square"
                    color={colors.text}
                    size={20}
                    style={[styles.icon, { marginRight: 8 }]}
                />
                <TextInput
                    placeholder="Mã xác nhận"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text,
                    }]}
                    secureTextEntry={newPassShow}
                    onChangeText={(newpass) => setReTypePass(newpass)}
                />
            </View>

            <Pressable
                style={[styles.button, { backgroundColor: "#60a0af" }]}
                onPress={() => updatePassword()}
            >
                <Text style={[styles.buttonText]}>Cập nhật</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 40,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 100
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 50,
    },
    action: {
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth: 0,
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 20
    },
    buttonText: {
        textAlign: "center",
        fontSize: responsiveFontSize(2),
        fontWeight: "bold",
        color: "#fff"
    }
});
