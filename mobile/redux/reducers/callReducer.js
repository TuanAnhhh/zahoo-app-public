import { GLOBALTYPES } from './../actionType'
const initialState = null
const callReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer