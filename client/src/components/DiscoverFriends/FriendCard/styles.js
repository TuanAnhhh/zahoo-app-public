import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    card:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    cardBody:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding:"2rem 0"
    },
    cardAvatar:{
        width:"4.5rem",
        height:"4.5rem",
    },
    cardButton:{
        
    }
}))