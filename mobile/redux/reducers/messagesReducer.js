import { GLOBALTYPES } from '../actionType'

const initialState = {
    data: [],
    result: null,
    page: null,
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                result: action.payload.result,
                page: action.payload.page,

            }

        case GLOBALTYPES.ADD_MESSAGE:
            return {
                data: [...state.data, action.payload]
            }

        default:
            return state;
    }
}


export default messageReducer