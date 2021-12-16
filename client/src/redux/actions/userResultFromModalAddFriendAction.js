import { getDataAPI } from "../../api";
import { GLOBALTYPES } from "../actionType";

//  GET USER BY SDT
export const getUserByPhoneNumber =
  (phoneNumber, token) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.GET_USER_REQUEST,
      });
      const res = await getDataAPI(`users/phone/${phoneNumber}`, token);

      dispatch({
        type: GLOBALTYPES.GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.GET_USER_ERR,
        payload: err.response.data.msg,
      });
    }
  };

//  REMOVE STATE USER
export const removeUserState = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.REMOVE_USER_SUCCESS,
      payload: {
        data: null,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
