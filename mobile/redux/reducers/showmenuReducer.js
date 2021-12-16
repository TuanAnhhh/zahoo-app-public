import { GLOBALTYPES } from './../actionType'

const initialState = false

const shoMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.SHOWMENU:
            return action.payload;

        case GLOBALTYPES.HIDEMENU:
            return action.payload;
        default:
            return state;
    }
}


export default shoMenuReducer