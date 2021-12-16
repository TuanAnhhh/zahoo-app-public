import { useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../../api'
import { GLOBALTYPES } from './../actionType'

//  GET MESSAGES BY ID
export const getMessagesByConversationId = (conversationId, token, page = 1, callback) => async dispatch => {
    try {
        const res = await getDataAPI(`messages/${conversationId}?limit=${page * 19}`, token);

        const newData = { ...res.data, data: res.data.data.reverse() };

        await dispatch({
            type: GLOBALTYPES.GET_MESSAGES_SUCCESS,
            payload: { ...newData, page }
        })
        callback.setIsloading ? callback.setIsloading : true
        callback.setUpdateLength(res.data.data?.length)

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err
            }
        })
    }
}

// ADD MESAGE
export const addMesage = ({ data, auth, socket, member }) => async dispatch => {

    try {
        const res = await postDataAPI('messages', data, auth.token)

        const { _id, username } = auth.user
        
        socket.emit('addMessage', { data, user: { _id, username }, member })

        dispatch({
            type: GLOBALTYPES.ADD_MESSAGE,
            payload:
                data
        })

        dispatch({
            type: GLOBALTYPES.UPDATE_CONVERSATION,
            payload: {
                _id: res.data._id,
                conversation: res.data.conversation,
                text: res.data.text,
                updatedAt: res.data.updatedAt
            }
        })


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err
            }
        })
    }
}