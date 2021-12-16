import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    padding: ".5rem",
  },
  showMedia: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    display: "inline-grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(70px,1fr))",
    gridGap: "10px",
    padding: "5px 0",
  },
  mediaItem: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    "& img": {
      borderRadius: ".5rem",
    },
    "& span": {
      position: "absolute",
      right: "-10px",
      top: "-10px",
      color: "#d32f2f",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  mediaInput: {
    width: "0",
    height: "0",
  },
  labelInput: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  forminput: {
    borderRadius: "1rem",
    position: "relative",
    height: "40px",
    backgroundColor: theme.palette.secondary.light,
    flex: "1",
    "& input": {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      outline: "none",
      border: "none",
      width: "95%",
      backgroundColor: "transparent",
      padding: "0 1rem",
    },
    "& .MuiIconButton-root": {
      position: "absolute",
      top: "0",
      right: "0",
      height: "100%",
    },
    "& .emoji-picker-react": {
      position: "absolute",
      right: "0",
      top: "-820%",
    },
  },
}));
