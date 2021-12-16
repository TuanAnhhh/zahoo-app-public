import { GLOBALTYPES } from './../actionType'

export const changeTheme = (status) => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.THEME,
        payload: status
    })
}
