import { getDataAPI } from "../../api";
import { GLOBALTYPES } from "../actionType";

//  GET USER BY SDT
export const getUserByPhoneNumber = (phoneNumber, token) => async dispatch => {


    try {  
        const res = await getDataAPI(`users/phone/${phoneNumber}`, token)

        dispatch({
            type: GLOBALTYPES.GET_USER_SUCCESS,
            payload: {
                data: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.GET_USER_SUCCESS,
            payload: {
                data: null
            }
        })
    }
}