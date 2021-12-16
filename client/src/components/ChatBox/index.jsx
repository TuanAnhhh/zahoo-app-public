import React from 'react'
import { useSelector } from 'react-redux'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import ChatHeader from './ChatHeader'
import ChatInfo from './ChatInfo'
import useStyles from './styles'

function ChatBox() {
    const classes = useStyles()
    const {auth} = useSelector(state => state)
    const currentConversation = useSelector(state => state.currentConversation.data)
    const {isShowMoreInfoConversation} = useSelector(state => state.modal)
    return (
        <>
            {currentConversation?
                <div className={classes.chatBox}>
                    <div className={classes.chatOnBoard}>
                        <ChatHeader currentConversation={currentConversation} auth={auth}/>
                        <ChatBody currentConversation={currentConversation}/>
                        <ChatFooter currentConversationId={currentConversation._id}/>   
                    </div>
                    {isShowMoreInfoConversation && 
                        <ChatInfo currentConversation={currentConversation}/>
                    }   
                </div>
                
            :   <div className={classes.chatBox}>
                    <div className={classes.bgPanel}>
                        {/* <Typography className={classes.title} color="secondary" component="body" variant="h4">Kết nối bạn bè - Gắn kết yêu thương!!!</Typography> */}
                    </div>
                </div>}
        </>
    )
}

export default ChatBox
