import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,useLocation} from 'react-router'
import { postCurrentConversation } from '../../../redux/actions/currentConversation'


function GroupVertical({conversation}) {
    const dispatch = useDispatch()
    const {auth} = useSelector(state => state)
    const history = useHistory()
    const location = useLocation()
    const {member} = conversation
    const handleOpenChat  = React.useCallback((conversationId) => {
        dispatch(postCurrentConversation(conversation))
        if(location.pathname === '/phonebook'){
            history.push('/messenger')
        }
      },[dispatch,auth,history,location])
    return (
        <ListItem button onClick={()=>handleOpenChat(conversation._id)}  >
            <ListItemAvatar>
                <AvatarGroup max={2}>
                        {member?.map(item => {
                            return <Avatar src={item?.profilePicture} key={item._id} alt="avatar" />
                        })}
                    </AvatarGroup>
            </ListItemAvatar>
            <ListItemText primary={conversation.label.slice(0,30)} />
        </ListItem>
    )
}

export default GroupVertical
