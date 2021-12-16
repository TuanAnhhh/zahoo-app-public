import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  file: {
    backgroundColor: theme.palette.grey[100],
    padding: "1rem",
    borderRadius: ".5rem",
    textDecoration: "none",
  },
  msg: {
    backgroundColor: theme.palette.grey[100],
    padding: ".5rem 1rem",
    textAlign: "center",
    width: "100%",
    borderRadius: ".5rem",
  },
}));

function ListFile({ itemData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {itemData?.length === 0 ? (
        <div className={classes.msg}>
          Chưa có tệp được chia sẻ trong cuộc hội thoại này
        </div>
      ) : (
        <Grid container spacing={1} direction="column">
          {itemData?.map((item) => (
            <Grid item xs={6}>
              <a
                className={classes.file}
                href={item.media.url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block" }}
              >
                {item.media.url.split("/")[3] +
                  "." +
                  item.media.type.split("/")[1]}
              </a>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default ListFile;
