import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        width:"100%",
        display:"flex",
        // justifyContent:"center",
        alignItems:"center",
        '& .MuiCircularProgress-root':{
            width:"2rem !important",
            height:"2rem !important",
            marginRight:".5rem"
        }
  },
  }))
  
function SmallLoading() {
  const classes = useStyles();
    return (
        <div className={classes.root}>
             <CircularProgress/>
             <h4>Loading...</h4>
        </div>
    )
}

export default SmallLoading
