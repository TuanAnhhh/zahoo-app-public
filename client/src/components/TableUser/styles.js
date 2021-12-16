import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({

    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'99%',
        background:'#fff',
        marginTop:'5px'
       
    },

  userTable: {
    width: "90%",
   display:'flex',
    flexDirection:'column',
 alignItems:'center'
  },
  table: {
    
    width: '100%',
    border: 1,
  },
  body:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  }
}));
