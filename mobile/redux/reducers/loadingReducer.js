import { GLOBALTYPES } from '../actionType'

const initialState = false

const loadingReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.LOADING:
            return action.payload;
        default:
            return state;
    }
}


export default loadingReducer