import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // minWidth: 400,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(1, 2, 3),
    // backgroundColor:theme.palette.primary.main,
  },
  profilePicture: {
    width: "5rem",
    height: "5rem",
  },
  callBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 400,
  },
  showVideo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  otherVideo: {},
  youVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "300px",
  },
}));
