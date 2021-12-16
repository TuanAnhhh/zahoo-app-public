import { GLOBALTYPES } from "../actionType";

const initialState = {
  data: [],
  page: null,
  result: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_USERS:
      return {
        ...state,
        data: action.payload.data,
        page: action.payload.page,
        result: action.payload.result,
      };

    case GLOBALTYPES.ACTIVE_USER:
      const rs = action.payload;
      return {
        ...state,
        data: state.data.map((u, index) => {
          if (u._id === rs._id) {
            return {
              ...u,
              status: rs.status,
            };
          }
          return u;
        }),
        page: action.payload.page,
        result: action.payload.result,
      };
      case GLOBALTYPES.ACTIVE_USER_TO_CLIENT:
      
      
        return {
          ...state,
          data: state.data.map((u, index) => {
            if (u._id === action.payload._id) {
              return {
                ...u,
                status: action.payload.status,
              };
            }
            return u;
          }),
          page: action.payload.page,
          result: action.payload.result,
        };
    case GLOBALTYPES.GET_USER_SUCCESS:{
      if (action.payload) {
        return {
          ...state,
          data: state.data.filter((u) => u._id === action.payload._id),
          page: action.payload.page,
          result: action.payload.result,
        };
      }
      break
    }
  
    


    
    default:
      return state;
  }
};

export default usersReducer;
