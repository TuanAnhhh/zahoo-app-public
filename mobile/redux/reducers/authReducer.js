import { useDispatch } from 'react-redux';
import { logout } from '../actions/authAction';
import { GLOBALTYPES } from './../actionType'

const initialState = {}

const authReducer = (state = initialState, action) => {
    const dispatch = useDispatch;
    switch (action.type) {
        case GLOBALTYPES.AUTH:
            return action.payload;
        case GLOBALTYPES.UPDATE_USER_INFOR:
            return {
                user: { ...state.user, ...action.payload.user },
                token: action.payload.token
            };

        default:
            return state;
    }
}


export default authReducer