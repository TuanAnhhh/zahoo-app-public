import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chatInfo: {
    flex: ".4",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0",
    transition: "all 1s ease",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  avatar: {
    width: "4rem",
    height: "4rem",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem 0",
  },
  info: {
    // backgroundColor:theme.palette.grey[100],
    // padding:".5rem 1rem",
    // width:"100%",
    // borderRadius:".5rem"
    "& div": {
      display: "flex",
      alignItems: "center",
      padding: ".5rem 0",
      "& svg": {
        marginRight: ".5rem",
      },
    },
  },
  groupName: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
}));
