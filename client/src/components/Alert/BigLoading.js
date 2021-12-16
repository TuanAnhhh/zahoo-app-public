import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
      position:'fixed',
      width:"100%",
      height:"100%",
      textAlign:"center",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      zIndex:"1",
      backgroundColor:"rgba(46,49,49,.8)",
      '& p':{
        color:"white",
        fontWeight:"400",
        fontSize:"2rem",
      }
  },
  }))
  
function Loading() {
  const classes = useStyles();
    return (
        <div className={classes.root}>
             <CircularProgress color="secondary"/>
             <p>Loading</p>
        </div>
    )
}

export default Loading
