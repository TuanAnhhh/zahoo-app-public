import { GLOBALTYPES } from "./../actionType";

const initialState = {
  data: [],
  result: 0,
  page: 1,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_MESSAGES_SUCCESS:
      return action.payload;
    case GLOBALTYPES.UPDATE_MESSAGES:
      return {
        data: [...state.data, ...action.payload.data],
        result: action.payload.result,
        page: action.payload.page,
      };
    case GLOBALTYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [action.payload, ...state.data],
        result: state.result + 1,
      };

    default:
      return state;
  }
};

export default messageReducer;
