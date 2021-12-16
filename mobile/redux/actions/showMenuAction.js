import { GLOBALTYPES } from './../actionType'

export const showMenu = () => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.SHOWMENU,
        payload: true
    })
}

export const hideMenu = () => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.SHOWMENU,
        payload: false
    })
}