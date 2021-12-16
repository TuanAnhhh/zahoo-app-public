import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    alert:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:".5rem 0",
    },
   
}));

export default function NotifyMsg({notify}) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar 
        open={open} 
        autoHideDuration={10000} 
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        onClose={handleClose}
    >
            <Alert onClose={handleClose} severity={notify.type} sx={{ width: '100%' }}>
            {notify.msg}
        </Alert>
    </Snackbar>
  );
}
