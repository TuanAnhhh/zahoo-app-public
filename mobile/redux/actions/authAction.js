import { loginDataAPI, postDataAPI } from '../../api'
import { GLOBALTYPES } from './../actionType'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import Toast from 'react-native-root-toast'

//  LOGIN
export const login = (data) => async dispatch => {
    try {

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: true }
        })
        const res = await postDataAPI('auth/login', data);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.accessToken,
                user: res.data.user
            }
        })
        if (res.data !== null) {
            await AsyncStorage.setItem('AccessToken', res.data.accessToken)
            await AsyncStorage.setItem('User', JSON.stringify(res.data.user))
        }
    } catch (err) {
        Toast.show(err.response.data.msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
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

}

//  REGISTER
export const register = (data) => async dispatch => {
    try {

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: true }
        })

        const res = await postDataAPI('auth/register', data);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.accessToken,
                user: res.data.user
            }
        })
        if (res.data !== null) {
            await AsyncStorage.setItem('AccessToken', res.data.accessToken)
            await AsyncStorage.setItem('User', JSON.stringify(res.data.user))
        }

        

    } catch (err) {
       
        console.log(err)
    }

}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = await AsyncStorage.getItem("User")
    if (firstLogin) {
        try {
            const res = await postDataAPI('auth/refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.accessToken,
                    user: res.data.user
                }
            })

           

        } catch (err) {
          console.log(err)
        }
    }
}

export const logout = () => async (dispatch) => {

    try {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                loading: true
            }
        })
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: null,
                user: null
            }
        })

        await AsyncStorage.removeItem('AccessToken')
        await AsyncStorage.removeItem('User')
        await postDataAPI('auth/logout')
       
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }

}

export const retrieveAuth = (user, token) => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            token: token,
            user: user
        }
    })
}

//  RESET PASSWORD
export const resetPassword = (data) => async dispatch => {
    try {
        const res = await postDataAPI('auth/reset-password', data);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: "Cập nhật mật khẩu thành công"
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
        console.log(err)
    }
}


export const updateUserInfo = (data) => async (dispatch) => {
    if (data !== null) {
        dispatch({
            type: GLOBALTYPES.UPDATE_USER_INFOR,
            payload: {
                token: data.token,
                user: data.user
            }
        });
        await AsyncStorage.setItem('AccessToken', data.token)
        await AsyncStorage.setItem('User', JSON.stringify(data.user))
    }
};