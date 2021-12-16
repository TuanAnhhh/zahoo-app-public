import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    chatBody:{
        flex:"1",
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        padding:"0 1rem",
        backgroundColor:theme.palette.grey[100]
    },
    displayTop:{
        flexDirection:"column"
    },
    card: {
        minWidth:"70%",
        margin:"0 auto",
        textAlign:"center",
        marginTop:"1rem"
      },
      media: {
        height: 200,
      },
}))