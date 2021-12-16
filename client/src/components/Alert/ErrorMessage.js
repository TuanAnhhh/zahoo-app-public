import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  alert:{
    marginBottom:theme.spacing(1)
  }
}));

export default function ErrorMessage({error}) {
  const classes = useStyles();
  return (
        <Alert severity="error"  className={classes.alert}>{error}</Alert>
  );
}
