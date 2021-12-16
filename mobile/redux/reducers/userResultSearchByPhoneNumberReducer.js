// userResultSearchByPhoneNumberAction

import { GLOBALTYPES } from "../actionType";

const initialState = {};

const userResultSearchByPhoneNumberAction = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_USER_SUCCESS:
            return {
                data: action.payload.data,
            };
        default:
            return state;
    }
};

export default userResultSearchByPhoneNumberAction;
