import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {},
  count: {
    width: "1rem",
    textAlign: "center",
    backgroundColor: "rgb(220, 0, 78)",
    borderRadius: "1rem",
    color: theme.palette.common.white,
  },
  itemText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
