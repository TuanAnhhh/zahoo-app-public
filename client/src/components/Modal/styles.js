import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
 avatar:   {

  width: "100px", height: "100px",
  marginLeft:"40%",
  borderRadius:"50%"
    },
    username:   {
      textAlign:"center",
  // marginLeft:"35%",
  marginBottom:"30px"
    },
  paper: {
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 3),
  },
  paperSetting: {
    width: 600,
    minHeight: 300,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '10px',
  },
  titleSetting: {
    // marginBottom: '40px',
    marginLeft: "20%",
    marginRight:"20%"
  },
  setting: {
    marginBottom: '35px',
    marginLeft: "20%",
    marginRight:"20%"
  },
  err: {
    // marginBottom:"20px",
    // marginLeft: "20%",
    // marginRight:"20%",
    color:"red",
    fontSize:"12px"

  },
  actions:{
    display:"flex",
    width:"100%",
    justifyContent:"flex-end",
    '& button':{
      marginLeft:theme.spacing(1),
    }
  },
  actionSetting:{
    display:"flex",
    marginTop:"100px",
    width:"100%",
    justifyContent:"flex-end",
    '& button':{
      marginLeft:theme.spacing(3),
    }
  },
  listMember:{
    // display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    backgroundColor:theme.palette.grey[100],
    borderRadius:"15px",
    padding:theme.spacing(0.5)
  },
  buttonDelete:{
    cursor: "pointer"
  }

}));