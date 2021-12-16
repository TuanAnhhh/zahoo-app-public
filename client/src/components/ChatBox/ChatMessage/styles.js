import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chatMessage: {
    display: "flex",
    marginBottom: "1rem",
  },
  chatMessageRight: {
    justifyContent: "flex-end",
  },
  avatarHidden: {
    display: "none",
  },
  wrapper: {
    marginLeft: ".5rem",
    display: "flex",
    flexDirection: "column",
    justifyItems: "flex-start",
    alignItems: "start",
    maxWidth: "50%",
  },
  wrapperEnd: {
    alignItems: "end",
  },
  textWrapper: {
    backgroundColor: theme.palette.grey[300],
    padding: "1rem",
    borderRadius: ".5rem",
    position: "relative",
    minWidth: "10rem",
  },
  textWrapperColor: {
    background: `linear-gradient(to left bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
  },
  textContent: {
    // backgroundColor:"red",
    fontSize: "16px",
  },
  emojiWrapper: {
    position: "absolute",
    bottom: "-10%",
    right: "10px",

    display: "flex",
    alignItems: "center",
  },
  likeCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    padding: "1px 8px",
    borderRadius: "5rem",
    border: `1px solid ${theme.palette.grey[300]}`,
    marginRight: ".2rem",
    width: "1.2rem",
    height: "1.2rem",
  },
  emoji: {
    color: theme.palette.grey[500],
    backgroundColor: "white",
    borderRadius: "50%",
    border: `1px solid ${theme.palette.grey[300]}`,
    width: "1.2rem",
    height: "1.2rem",
    transition: "all .2s ease",
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  media: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  mediaRight: {
    alignItems: "end",
  },
  imageWrapper: {
    width: "25% !important",
    transition: "all .2s ease",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      opacity: "0.8",
    },
  },
  call: {
    width: 150,
    padding: ".5rem",
    backgroundColor: theme.palette.grey[200],
    borderRadius: ".5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      marginRight: ".5rem",
      color: theme.palette.error.dark,
    },
  },
}));
