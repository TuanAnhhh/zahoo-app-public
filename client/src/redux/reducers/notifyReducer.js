import { GLOBALTYPES } from '../actionType'

const initialState = {
    data:[],
    sound:false
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.NOTIFY:
            // const notify={
            //     ...action.payload,
            //     isRead:false
            // }
            return {
                ...state,
                data:[...state.data,action.payload],
                sound:true
            }
        case GLOBALTYPES.CLOSE_NOTIFY:
            return {
                ...state,
                data:state.data.slice(1)
            }
        case GLOBALTYPES.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            }
        default:
            return state;
    }
}


export default notifyReducer