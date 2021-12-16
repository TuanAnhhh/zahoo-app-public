import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "../actionType";

//GET ALL USERS
export const getAllUser =
  (token, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`users/?page=${page}&limit=${limit}`, token);
      dispatch({
        type: GLOBALTYPES.GET_ALL_USERS,
        payload: res.data,
      });
    } catch (err) {}
  };

export const isActiveUser = (id, data, token, socket) => async (dispatch) => {
  try {
    const res = await postDataAPI(
      `users/admin/isActiveUser/${id}`,
      data,
      token
    );
    dispatch({
      type: GLOBALTYPES.ACTIVE_USER,
      payload: res.data.user,
    });
    socket.emit("activeUser", res.data.user);
  } catch (err) {}
};

export const getUserByPhoneNumber =
  (phoneNumber, token) => async (dispatch) => {
    try {
      const res = await getDataAPI(`users/phone/${phoneNumber}`, token);

      dispatch({
        type: GLOBALTYPES.GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const page = 1;
      const limit = 10;
      const res = await getDataAPI(`users/?page=${page}&limit=${limit}`, token);
      dispatch({
        type: GLOBALTYPES.GET_ALL_USERS,
        payload: res.data,
      });
    }
  };
export const changeInfo = (data, user, token) => async (dispatch) => {
  try {
    const res = await postDataAPI(`users/edit-infor/${user._id}`, data, token);

    console.log("res", res.data);
    dispatch({
      type: GLOBALTYPES.CHANGE_INFO,
      payload: res.data.user,
    });
  } catch (err) {
    console.log("err:", err);
  }
};
