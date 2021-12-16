import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    header:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"5px"
    },
    info:{
        display:"flex",
        alignItems:"center",
    },
        desc: {
            marginLeft:theme.spacing(1)
        },
        secondary:{
            display:"flex",
            justifyContent:"start",
            alignItems:"center",
        },
    action:{
        display:"flex",
        alignItems:"center",
        '& .MuiListItem-button':{
            borderRadius:"3rem",
        }
    }
}))