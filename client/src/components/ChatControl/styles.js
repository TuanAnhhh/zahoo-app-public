import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chatControl: {
    // flex:".1",
    display: "flex",
    flexDirection: "column",
    padding: "0 .5rem",

    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
  },
  chatFriendHead: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  body: {
    overflowY: "scroll",
    flex: "1",
  },
}));
