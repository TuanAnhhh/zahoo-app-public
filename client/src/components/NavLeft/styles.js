import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navleft: {
    background: `linear-gradient(to bottom, rgba(47, 93, 98, 0.9), rgba(94, 139, 126,1))`,
    padding: "10px 0",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  avatar: {
    margin: "2rem auto",
  },
  list: {
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  menu: {
    marginLeft: "33px",
  },
}));
