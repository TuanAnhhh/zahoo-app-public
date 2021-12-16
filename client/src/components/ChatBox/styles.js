import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    chatBox:{
        flex:"1",
        display:"flex",
       
    },
        bgPanel:{
            width:"100%",
            background: `linear-gradient(to bottom, rgba(47, 93, 98, 0.9), rgba(94, 139, 126,1)),
            url(https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)`,
            backgroundSize: "cover",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            // justifyContent:"center"
        },
            title:{
                // color:theme.palette.common.white,
            },
    chatOnBoard:{
        flex:"1",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"space-between",
        borderLeft:`2px solid ${theme.palette.grey[200]}`,
        borderRight:`2px solid ${theme.palette.grey[200]}`,
    },
}))