import { IconButton, Tooltip } from "@material-ui/core";
import { AttachFile, Cancel, Face, Image, Send } from "@material-ui/icons";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../../api";
import { addMesage } from "../../../redux/actions/messagesAction";
import { fileShow, imageShow, videoShow } from "../../../util/mediaShow";
import Typing from "../../Alert/Typing";
import Alert from "./../../Alert/Alert";
import useStyles from "./styles";
function ChatFooter({ currentConversationId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { socket, typing } = useSelector((state) => state);
  const { member, _id } = useSelector(
    (state) => state.currentConversation.data
  );
  const [input, setInput] = useState("");
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaErr, setMediaErr] = useState("");
  const ref = useRef();
  var members = [];
  const listUserTuping = typing.filter((item) => item.conversationId === _id);
  if (listUserTuping.length > 0) {
    members = listUserTuping.map((item) => item.sender);
  }
  const onEmojiClick = (e, emojiObject) => {
    setInput(input + emojiObject.emoji);
    setToggleEmoji(false);
  };
  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return (err = "Tệp không tồn lại");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Tệp tối đa 5mb");
      }
      return newMedia.push(file);
    });
    if (err) setMediaErr(err);
    else setMediaErr("");
    setMedia([...media, ...newMedia]);
  };
  const handleDeleteMedia = (index) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };
  const handleChangeInput = (value) => {
    setInput(value);
    if (value === "")
      socket.emit("offTypingText", {
        conversationId: _id,
        member: member.map((item) => item._id),
        sender: auth.user.username,
        // msg: `${auth.user.username} đang nhập tin nhắn`
      });
    else {
      socket.emit("onTypingText", {
        conversationId: _id,
        member: member.map((item) => item._id),
        sender: auth.user.username,
        // msg: `${auth.user.username} đang nhập tin nhắn`
      });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!input.trim() && media.length === 0) return;
    let newArr = [];

    // post the image direclty to the s3 bucket
    if (media.length > 0) {
      media.map(async (item) => {
        const {
          data: { url },
        } = await getDataAPI("s3Url");
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": item.type,
          },
          body: item,
        });
        const imageUrl = url.split("?")[0];

        // k can thiet
        newArr.push({
          url: imageUrl,
          type: item.type,
        });

        const { username, profilePicture, _id } = auth.user;
        const data = {
          conversation: currentConversationId,
          sender: { username, profilePicture, _id },
          text: input,
          media: [
            {
              url: imageUrl,
              type: item.type,
            },
          ],
        };
        dispatch(addMesage({ data, auth, socket, member }));
      });
    } else {
      const { username, profilePicture, _id } = auth.user;
      const data = {
        conversation: currentConversationId,
        sender: { username, profilePicture, _id },
        text: input,
        media: [],
      };
      dispatch(addMesage({ data, auth, socket, member }));
    }

    setInput("");
    socket.emit("offTypingText", {
      conversationId: _id,
      member: member.map((item) => item._id),
      sender: auth.user.username,
      // msg: `${auth.user.username} đang nhập tin nhắn`
    });
    setMedia([]);
  };
  return (
    <div className={classes.footer}>
      <Alert />
      {listUserTuping.length > 0 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typing />
          {members} đang nhập
        </div>
      )}
      <div
        className={classes.showMedia}
        style={{ display: media.length > 0 ? "flex" : "none" }}
      >
        {media?.map((item, index) => (
          <div key={index} className={classes.mediaItem}>
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : item.type.match(/image/i)
              ? imageShow(URL.createObjectURL(item))
              : fileShow(URL.createObjectURL(item), item)}
            <span onClick={() => handleDeleteMedia(index)}>
              <Cancel />{" "}
            </span>
          </div>
        ))}
      </div>
      {mediaErr && <div style={{ color: "red" }}>{mediaErr}</div>}

      <form action="" className={classes.form} onSubmit={handleSubmitForm}>
        <div component="ul" aria-label="action" className={classes.actions}>
          <Tooltip title="Thêm hình ảnh/video">
            <label className={classes.labelInput}>
              <Image color="primary" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*,video/*,.pdf,.doc"
                onChange={handleChangeMedia}
                className={classes.mediaInput}
              />
            </label>
          </Tooltip>
          <Tooltip title="Thêm tệp">
            <label className={classes.labelInput}>
              <AttachFile color="primary" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept=".pdf,.doc"
                onChange={handleChangeMedia}
                className={classes.mediaInput}
              />
            </label>
          </Tooltip>
        </div>
        <div className={classes.forminput}>
          <input
            type="text"
            value={input}
            placeholder="Aa"
            onChange={(e) => handleChangeInput(e.target.value)}
            ref={ref}
          />
          <IconButton
            color="primary"
            onClick={() => setToggleEmoji(!toggleEmoji)}
          >
            <Face />
          </IconButton>
          {toggleEmoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              className={classes.emojiPicker}
            />
          )}
        </div>
        <IconButton
          color="primary"
          type="submit"
          disabled={input || media.length > 0 ? false : true}
        >
          <Send />
        </IconButton>
      </form>
    </div>
  );
}

export default ChatFooter;
