import { GLOBALTYPES } from "./../actionType";

const initialState = {};

const currentConversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.POST_CURRENT_CONVERSATION_SUCCESS:
      return {
        data: action.payload.data,
      };
    case GLOBALTYPES.GET_IMAGE_VIDEO:
      return {
        ...state,
        media: action.payload.media,
      };
    case GLOBALTYPES.GET_FILES:
      return {
        ...state,
        files: action.payload.files,
      };
    case GLOBALTYPES.CHANGE_GROUP_NAME_OF_CURRENT_CONVERSATION:
      return {
        ...state,
        data: {
          ...state.data,
          label: action.payload,
        },
      };
    case GLOBALTYPES.OUT_GROUP_TO_CLIENT: {
      const { conversation, memberID } = action.payload;

      if (state.data._id === conversation._id) {
        return {
          ...state,
          data: {
            ...state.data,
            member: state.data.member.filter((m) => m._id !== memberID),
          },
        };
      }
      return { data: state.data };
    }
    case GLOBALTYPES.DELETE_GROUP_TO_CLIENT: {
      const { conversation } = action.payload;

      if (state.data?._id === conversation?._id) {
        return { data: null };
      }
      return { data: state.data };
    }

    case GLOBALTYPES.OUT_GROUP: {
      return { data: null };
    }
    case GLOBALTYPES.DELETE_GROUP: {
      return { data: null };
    }
    case GLOBALTYPES.UPDATE_CURRENT_CONVERSATION_ADD_MEMBER: {
      // const newMember =action.payload
      const member = action.payload.member;

      return {
        ...state,
        data: {
          ...state.data,
          member: state.data.member.concat(member),
        },
      };
    }
    case GLOBALTYPES.ADD_MEMBER_GROUP_TO_CLIENT: {
      if (state.data?._id === action.payload.conversation._id) {
        return {
          ...state,
          data: {
            ...state.data,
            member: state.data.member.concat(action.payload.member),
          },
        };
      }
      return { data: state.data };
    }
    case GLOBALTYPES.DELETE_MEMBER_GROUP: {
      return {
        ...state,
        data: {
          ...state.data,
          member: state.data.member.filter((m) => m._id !== action.payload),
        },
      };
    }
    case GLOBALTYPES.KICK_MEMBER_TO_CLIENT: {
      return { data: null };
    }
    case GLOBALTYPES.UPDATE_KICK_MEMBER_TO_CLIENT: {
      if (state.data?._id === action.payload.conversation._id) {
        return {
          ...state,
          data: {
            ...state.data,
            member: state.data.member.filter(
              (m) => m._id !== action.payload.memberID
            ),
          },
        };
      }

      return { data: state.data };
    }
    default:
      return state;
  }
};

export default currentConversationsReducer;
