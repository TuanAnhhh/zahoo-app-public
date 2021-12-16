import React, { useEffect } from 'react'
import ChatControl from '../../components/ChatControl'
import DiscoverFriends from '../../components/DiscoverFriends'
import NavLeft from '../../components/NavLeft'
import useStyles from './styles'
const PhoneBook =()=>{
    const classes = useStyles()
    useEffect(() => {
        document.title = 'Trang tin nhắn';
    })
    return (
        <div className={classes.phonebook}>
            <NavLeft/>
            <ChatControl/>
            <DiscoverFriends/>
        </div>
    )
}
export default PhoneBook
