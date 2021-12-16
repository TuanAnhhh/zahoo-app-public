import { GLOBALTYPES } from "../actionType";

//SHOW ADD FRIEND MODAL
export const notifyRequestAddFriend = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: "notify",
    });
  } catch (err) {}
};
