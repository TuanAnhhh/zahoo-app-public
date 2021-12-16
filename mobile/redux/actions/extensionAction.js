import { GLOBALTYPES } from '../actionType'

export const callExtension = (data) => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.CURRENT_EXTENSION,
        payload: data
    })
}
