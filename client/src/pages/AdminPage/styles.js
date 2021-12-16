import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  adminPage: {

    width: "100%",
    height:'100vh',
    background: `linear-gradient(to bottom, rgba(47, 93, 98, 0.9), rgba(94, 139, 126,1)),
    url(https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)`,
  },
  header: {
    width: "20%",
    height:'100%',
    float:'left',
    display: "flex",
    flexDirection:'column',
    justifyContent: "space-between",
    alignItems:'center'
  },
  body:{
    height:'99%',
    width:" 79%",
    float:'left',
  },
  avatar:{
    margin:" auto",
    width:'100px',
    height:'100px'
  }
}));
