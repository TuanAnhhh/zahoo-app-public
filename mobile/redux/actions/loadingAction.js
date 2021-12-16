import { GLOBALTYPES } from '../actionType'

export const setLoadingScreen = (data) => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.LOADING,
        payload: data
    })
}
