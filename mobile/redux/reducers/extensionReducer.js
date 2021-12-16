// da thay doi
import { GLOBALTYPES } from '../actionType'

const initialState = {
    name: '',
    isActive: false
}

const extensionReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CURRENT_EXTENSION:
            return action.payload;
        default:
            return state;
    }
}


export default extensionReducer