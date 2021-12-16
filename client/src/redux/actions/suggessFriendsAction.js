// SUGGESS_FRIENDS;
import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "../actionType";
export const suggessFriends = (user, token) => async (dispatch) => {
  const data = {
    userId: user._id,
  };
  try {
  
    const res = await postDataAPI(`users/suggestions-friend`, data, token);

    const listUser = [];
    const a= Array.from(new Set(res.data.result))
    const a2= a.filter(i=>i !== data.userId  )
  
    
    a2.forEach(async (r, index) => {
      const u = await getDataAPI(`users/${r}`, token);

          listUser.push(u.data);

      dispatch({
        type: GLOBALTYPES.SUGGESS_FRIENDS,
        payload: listUser,
      });
    });
  } catch (err) {}
};
