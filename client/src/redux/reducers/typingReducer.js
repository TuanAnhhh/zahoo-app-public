import { GLOBALTYPES } from '../actionType'

const initialState = []

const typingReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.TYPING_TEXT:
           {
                // payload ={
                //     conversationId
                //     isTyping
                //     sender (name)
                // }
                const index = state.findIndex((el) => el.sender === action.payload.sender)
                if(index !== -1){
                    return [...state]
                }
                return [
                        ...state
                        ,action.payload
                    ];
           }
           case GLOBALTYPES.OFF_TYPING_TEXT:
           {
            const index = state.findIndex((el) => el.sender === action.payload.sender)
            state.splice(index,1)
            return [...state]
           }
        default:
            return state;
    }
}


export default typingReducer