import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    form: {
        minWidth:400,
        maxWidth:400,
        padding:"1rem",
        borderRadius:"2px",
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        '& .MuiTypography-h4': {
            margin: theme.spacing(2),
          },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
          },
        '& .MuiButton-root':{
            width:"100%",
            margin: theme.spacing(4),
            height:"50px"

        },
    },
    action:{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      width:"100%",
      marginTop:".5rem",
  }
}))