import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    discoverFriends:{
        flex:"1",
        backgroundColor:theme.palette.grey[100],
        padding:"0rem 5rem",
    },
    friendsQueue:{
        '& h3':{
            padding:"1rem 0"
        }
    },
    listItem:{
        display:"flex",
        flexDirection:"column",
        gap:".5rem"
    
    },
    item:{
        backgroundColor:theme.palette.common.white
    },
    friendsSuggestion:{
        height:"600px",
        overflowY:"auto",
        overflowX:"hidden",
        '& h3':{
            padding:"1rem 0"
        }
    },

    
}))