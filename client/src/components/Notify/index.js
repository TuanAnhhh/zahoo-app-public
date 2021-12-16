import { Avatar, ListItem, ListItemAvatar, ListItemText, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    alert:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:".5rem 0",
    },
   
}));

export default function Notify() {
  const classes = useStyles();
  const {data} = useSelector(state => state.notify)
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
        {data?.length >0 &&
            <Snackbar 
                open={open} 
                autoHideDuration={10000} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                onClose={handleClose}
            >
                <div>
                    {data?.map(item => 
                    <Alert onClose={handleClose} severity="warning" className={classes.alert} >
                        <ListItem >
                            <ListItemAvatar>
                                    <Avatar src={item.sender.profilePicture} key={item._id} alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText 
                                    primary={`${item.msg}` } 
                                />
                        </ListItem>
                    </Alert>
                    )}
                </div>
            </Snackbar>
        }
    </>
  );
}
