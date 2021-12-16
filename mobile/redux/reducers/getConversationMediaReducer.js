import { GLOBALTYPES } from '../actionType'

const initialState = {
    data: []
}

const getConversationMediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_MEDIA_CURRENT_CONVERSATION:
            return action.payload
        default:
            return state;
    }
}


export default getConversationMediaReducer