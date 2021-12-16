import { GLOBALTYPES } from '../actionType'
const initialState = []

const onlineReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.ONLINE:
            return [...state, action.payload];
        case GLOBALTYPES.OFFLINE:
            {
                return state.filter(item => item.id !== action.payload.id)
            }
        default:
            return state;
    }
}


export default onlineReducer