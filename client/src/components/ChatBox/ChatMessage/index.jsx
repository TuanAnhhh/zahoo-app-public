import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  MoreVert,
  PhoneDisabled,
  ThumbUpAlt,
  VideocamOff,
} from "@material-ui/icons";
import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fileShow } from "../../../util/mediaShow";
import Times from "../../../util/Times";
import useStyles from "./styles";
// import "react-awesome-lightbox/build/style.css";

function ChatMessage({ message, own }) {
  const classes = useStyles();
  const { text, sender, createdAt, media, call } = message;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isShowFullImage, setIsShowFullImage] = useState(false);
  const [imageFull, setImageFull] = useState({
    image: "",
    title: "",
  });
  const handleShowOptionButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewFullImage = (image) => {
    setImageFull({ image, title: "Hình ảnh" });
    setIsShowFullImage(true);
  };

  return (
    <>
      {/* show full image */}
      {isShowFullImage && (
        <Lightbox
          image={imageFull.image}
          title={imageFull.title}
          onClose={() => setIsShowFullImage(false)}
        />
      )}
      <div
        className={clsx(
          classes.chatMessage,
          own ? `${classes.chatMessageRight}` : ""
        )}
      >
        <Avatar
          className={own ? classes.avatarHidden : ""}
          src={sender.profilePicture}
        >
          {sender.username}
        </Avatar>

        <div
          className={clsx(classes.wrapper, own ? `${classes.wrapperEnd}` : "")}
        >
          {text && (
            <div
              className={clsx(
                classes.textWrapper,
                own ? `${classes.textWrapperColor}` : ""
              )}
            >
              <Typography
                className={clsx(
                  classes.textContent,
                  own ? `${classes.flexFirstRight}` : ""
                )}
                color="textPrimary"
                component="p"
                variant="body"
              >
                {text}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
                className={classes.times}
              >
                {moment(createdAt).fromNow()}
              </Typography>
              {/* <div className={classes.emojiWrapper} >
                            <div className={classes.likeCount}>
                                <span>👍</span>
                                <span>1</span>
                            </div>
                            <ThumbUpAlt  onClick={() => alert(1)} className={classes.emoji}/>
                        </div> */}
            </div>
          )}
          {media?.map((item, index) => (
            <div
              key={index}
              className={clsx(
                classes.media,
                own ? `${classes.mediaRight}` : ""
              )}
            >
              {item.type.match(/video/i) && (
                <video controls src={item.url} alt="video" width="25%" />
              )}
              {item.type.match(/image/i) && (
                <LazyLoadImage
                  alt={"image"}
                  width={"100%"}
                  effect="blur"
                  useIntersectionObserver
                  wrapperClassName={classes.imageWrapper}
                  style={{ borderRadius: "1rem" }}
                  src={item.url}
                  onClick={() => handleViewFullImage(item.url)}
                />
              )}
              {item.type.match(/application/i) && (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: ".5rem",
                    borderRadius: ".5rem",
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {item.url}
                  </a>
                </div>
              )}
            </div>
          ))}
          {call && (
            <Paper className={classes.call}>
              {call.video ? <VideocamOff /> : <PhoneDisabled />}
              <div>
                {call.video ? "Video Call" : "Audio Call"}
                <Times total={call.times} />
              </div>
            </Paper>
          )}
        </div>
        {/* <div component="ul" aria-label="action">
          <IconButton size="small" onClick={handleShowOptionButton}>
            <MoreVert color="primary" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Thu hồi</MenuItem>
          </Menu>
        </div> */}
      </div>
    </>
  );
}

export default ChatMessage;
