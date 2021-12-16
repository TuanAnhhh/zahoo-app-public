import { GLOBALTYPES } from './../actionType'

const initialState = false;

const themeReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.THEME:
            return action.payload;
        default:
            return state;
    }
}


export default themeReducer