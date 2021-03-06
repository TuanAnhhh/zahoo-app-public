import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { useNavigation } from '@react-navigation/core'
import { phoneValidator } from '../validator/phoneValidator'
import { passwordValidator } from '../validator/passwordValidator'
import { nameValidator } from '../validator/nameValidator'
import { confirmPasswordValidator } from '../validator/confirmPasswordValidator'
import { register } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button as PaperButton } from 'react-native-paper'
import { capchaValidator } from '../validator/capchaValidator'
import { postDataAPI } from '../api'
import Toast from "react-native-root-toast";


export default function RegisterScreen() {
  const [name, setName] = useState({ value: '', error: '' })
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



  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    const confirmCodeError = capchaValidator(confirmCode.value)

    
    const passwordConfirmError = confirmPasswordValidator(password.value, passwordConfirm.value)
    if (phoneError || passwordError || nameError || passwordConfirmError ||confirmCodeError) {
      setName({ ...name, error: nameError })
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      setPasswordConfirm({ ...passwordConfirm, error: passwordConfirmError })
      setConfirmCode({ ...confirmCode, error: confirmCodeError })
      return
    }
    else {
      if(otp == confirmCode.value ){
        const dataRegister = {
          phoneNumber: phone.value,
          password: password.value,
          username: name.value
        }
        dispatch(register(dataRegister));
        toast('????ng k?? th??nh c??ng')
        navigation.navigate("LoginScreen")
      } else {
        setPassword({ value: '', error: '' })
        setPasswordConfirm({ value: '', error: '' })
        toast('M?? x??c nh???n kh??ng ch??nh x??c')

      }
     
    }
    
  }

const getCapcha = async()=>{
    try {

        if(phone.value.length <10 ||phone.value.length >10 ) {
          toast('S??? ??i???n tho???i kh??ng h???p l???')
          return; 
      }
        
        const r= await postDataAPI("auth/check-numberphone",{"phoneNumber":phone.value })

        if(r.data.msg){
        const sdt= "84" + phone.value.slice(1)
        const data= {
            "phoneNumber": sdt
        }
          const res= await postDataAPI('auth/send-sms',data)
          setOtp(res.data.oneTimePassword)
          toast('M?? x??c nh???n ???? ???????c g???i')
        } else {
          toast('S??? ??i???n tho???i ???? ???????c ????ng k??')
        }
        
    } catch (error) {
        console.log(error)
    }
}


  return (
    <Background>
      <Text style={styles.header}> T???O T??I KHO???N </Text>
      <TextInput
        label="H??? & T??n"
        placeholder="H??? v?? t??n"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <View
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
      <TextInput
                    label="S??? ??i???n thoai"
                    placeholder="S??? ??i???n thoai"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={(text) => setPhone({ value: text, error: '' })}
                    error={!!phone.error}
                    errorText={phone.error}
                    keyboardType="numeric"
                    maxLength = {10}
               
                   
                />
                <PaperButton
                    style={{
                        width: '30%',
                        padding: 0,
                        position: "absolute",
                        marginVertical: 10,
                        right: 10,
                        zIndex: 9,
                        marginTop: 28
                    }}
                    mode="contained"
                    labelStyle={{
                        textTransform: "none",
                        padding: 0,
                    }}
                    onPress={getCapcha}
                >
                    L????y ma??
                </PaperButton>
                    </View>
      
                    <TextInput
                label="Ma?? xa??c nh????n"
                placeholder="Ma?? xa??c nh????n"
                returnKeyType="next"
                value={confirmCode.value}
                onChangeText={(text) => setConfirmCode({ value: text, error: '' })}
                error={!!confirmCode.error}
                errorText={confirmCode.error}
            />

      <TextInput
        label="M???t kh???u"
        placeholder="M???t kh???u"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="X??c nh???n m???t kh???u"
        placeholder="X??c nh???n m???t kh???u"
        returnKeyType="done"
        value={passwordConfirm.value}
        onChangeText={(text) => setPasswordConfirm({ value: text, error: '' })}
        error={!!passwordConfirm.error}
        errorText={passwordConfirm.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        ????ng ky??
      </Button>
      <View style={styles.row}>
        <Text>???? c?? t??i kho???n ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>????ng nh???p</Text>
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
