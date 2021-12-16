import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import BigLoading from './BigLoading';
const useStyles = makeStyles((theme) => ({
  alert:{
    marginBottom:theme.spacing(1)
  }
}));

export default function DescriptionAlerts() {
  const classes = useStyles();
  const { alert } = useSelector(state => state)
  return (
      <>
        {alert.loading && <BigLoading/>}
        {alert.error && <Alert severity="error"  className={classes.alert}>{alert.error}</Alert>}
      </>
  );
}
