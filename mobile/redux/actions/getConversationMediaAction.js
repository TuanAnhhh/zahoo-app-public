import { GLOBALTYPES } from '../actionType'
import {getDataAPI} from '../../api'

export const getMediaCurrentConversation = (conversationId,token) => async  (dispatch) => {
    try {
        const res = await getDataAPI(`conversations/get-image-and-video/${conversationId}`,token)

        dispatch({
            type: GLOBALTYPES.GET_MEDIA_CURRENT_CONVERSATION,
            payload: res.data
        })

        const res2 = await getDataAPI(`conversations//get-files/${conversationId}`,token)

        
        dispatch({
            type: GLOBALTYPES.GET_FILE_CURRENT_CONVERSATION,
            payload: res2.data
        })

    } catch (err) {
        console.log("err", err);
        
    }
}