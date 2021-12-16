import { GLOBALTYPES } from '../actionType'

const initialState = {
    data: []
}

const getFileConversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_FILE_CURRENT_CONVERSATION:
            return action.payload
        default:
            return state;
    }
}


export default getFileConversationReducer