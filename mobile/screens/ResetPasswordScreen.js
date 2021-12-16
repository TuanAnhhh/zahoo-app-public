import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Button as ReactButton, Pressable } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { useNavigation } from '@react-navigation/core'
import { phoneValidator } from '../validator/phoneValidator'
import { passwordValidator } from '../validator/passwordValidator'
import { confirmPasswordValidator } from '../validator/confirmPasswordValidator'
import { capchaValidator } from '../validator/capchaValidator'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../redux/actions/authAction'
import { postDataAPI } from "../api";
import Toast from 'react-native-root-toast'


const ResetPasswordScreen = () => {
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' })
    const [confirmCode, setConfirmCode] = useState({ value: '', error: '' })
    const [otp, setOtp] = useState('')

    const navigation = useNavigation();
    const dispatch = useDispatch();

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

    const getCapcha = async()=>{
        try {
            if(phone.value.length <10 ||phone.value.length >10 ) {
                toast('Số điện thoại không hợp lệ')
                return;
            }
            const r= await postDataAPI("auth/check-numberphone",{"phoneNumber":phone.value })
            if(r.data.msg ===false){
                
                const sdt= "84" + phone.value.slice(1)
                const data= {
                    "phoneNumber": sdt
                }
                const res= await postDataAPI('auth/send-sms',data)
                setOtp(res.data.oneTimePassword)
                toast('Mã đã được gửi !')
            } else{
                toast('Số điện thoại không tồn tại')
            }
           
        } catch (error) {
            toast('Không thể gửi mã')
            console.log(error)
        }
    }

    const onResetPassword = () => {
        console.log(otp)
        console.log(confirmCode.value)
        const phoneError = phoneValidator(phone.value)
        const passwordError = passwordValidator(password.value)
        const passwordConfirmError = confirmPasswordValidator(password.value, passwordConfirm.value)
        const confirmCodeError = capchaValidator(confirmCode.value)

        if (phoneError || confirmCodeError || passwordError || passwordConfirmError) {
            setPhone({ ...phone, error: phoneError })
            setConfirmCode({ ...confirmCode, error: confirmCodeError })
            setPassword({ ...password, error: passwordError })
            setPasswordConfirm({ ...passwordConfirm, error: passwordConfirmError })
        } else{
            if(otp== confirmCode.value){
                dispatch(resetPassword({phoneNumber: phone.value, password: password.value}))
                setOtp('')
                toast("Mật khẩu của bạn đã được cập nhật")
                navigation.navigate("LoginScreen")
                
            } else {
                setPassword({ value: '', error: '' })
                setPasswordConfirm({ value: '', error: '' })
                toast("Mã xác nhận không chính xác")
            }
            
        }
    }

    return (
        <Background>
            <Text style={styles.header}> LẤY LẠI MẬT KHẨU </Text>

            <View
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <TextInput
                    label="Số điện thoai"
                    placeholder="Số điện thoai"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={(text) => setPhone({ value: text, error: '' })}
                    error={!!phone.error}
                    errorText={phone.error}
                    keyboardType="numeric"
                    maxLength = {18}
                    style={{
                        marginTop: -18,
                    }}
                />
                <PaperButton
                    style={{
                        width: '30%',
                        padding: 0,
                        position: "absolute",
                        marginVertical: 10,
                        right: 11,
                        zIndex: 9,
                    }}
                    mode="contained"
                    labelStyle={{
                        textTransform: "none",
                        padding: 0,
                    }}
                    onPress={getCapcha}
                >
                    Lấy mã
                </PaperButton>
            </View>

            <TextInput
                label="Mã xác nhận"
                placeholder="Mã xác nhận"
                returnKeyType="next"
                value={confirmCode.value}
                onChangeText={(text) => setConfirmCode({ value: text, error: '' })}
                error={!!confirmCode.error}
                errorText={confirmCode.error}
            />

            <TextInput
                label="Mật khẩu mới"
                placeholder="Mật khẩu mới"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <TextInput
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu"
                returnKeyType="done"
                value={passwordConfirm.value}
                onChangeText={(text) => setPasswordConfirm({ value: text, error: '' })}
                error={!!passwordConfirm.error}
                errorText={passwordConfirm.error}
                secureTextEntry
            />

            <Button
                mode="contained"
                onPress={onResetPassword}
                style={{ marginTop: 24 }}
            >
                Đổi mật khẩu
            </Button>
            <View style={styles.row}>
                <Text>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.link}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
export default ResetPasswordScreen
