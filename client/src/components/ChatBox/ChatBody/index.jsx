import { Card, CardContent, CardMedia, Paper, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesByConversationId, loadMoreMessages } from '../../../redux/actions/messagesAction'
import ChatMessage from '../ChatMessage'
import useStyles from './styles'

function ChatBody({currentConversation}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages.data)
    const page = useSelector(state => state.messages.page)
    const {user,token} = useSelector(state => state.auth)

    useEffect(() => {
        if(currentConversation)
            dispatch(getMessagesByConversationId(currentConversation._id, token,1))
    }, [dispatch,token,currentConversation])

    const fetchMoreData =() => {
        dispatch(loadMoreMessages(currentConversation?._id, token,page+1))
    }
    return (
        <Paper className={clsx(classes.chatBody, messages?.length  ===0? `${classes.displayTop}`: '')}
            id="scrollableDiv"
            >
            <InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={
                        messages.length >0 &&
                        <h4 style={{textAlign:"center"}}>Loading...</h4>
                }
                scrollableTarget="scrollableDiv"
            >
                    { messages?.map((item,index) => {
                        return(
                            <div  key ={item._id}>
                                <LazyLoadComponent>
                                    <ChatMessage
                                        message={item} 
                                       
                                        own={item.sender._id ===user._id? true: false}
                                        />
                                </LazyLoadComponent>
    
                            </div>
                            )
                    })
                    }
            </InfiniteScroll>
            {messages?.length  ===0 && 
                <Card className={classes.card}>
                        <CardMedia
                        className={classes.media}
                        image="https://images.unsplash.com/photo-1605170439002-90845e8c0137?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="body" component="h4">
                            Hãy bắt đầu với cuộc trò chuyện
                        </Typography>
                        </CardContent>
                </Card>
            }

        </Paper>
    )
}

export default ChatBody
