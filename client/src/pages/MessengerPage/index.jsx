import React, { useEffect } from 'react'
import ChatBox from '../../components/ChatBox'
import ChatControl from '../../components/ChatControl'
import NavLeft from '../../components/NavLeft'
import useStyles from './styles'
const MessengerPage =()=>{
    const classes = useStyles()
   
    useEffect(() => {
        document.title = 'Trang tin nhắn';
    })
    return (
        <div className={classes.messenger}>
          
            <NavLeft/>
            <ChatControl/>
            <ChatBox/>
        </div>
    )
}
export default MessengerPage
