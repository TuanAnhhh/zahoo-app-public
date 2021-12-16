import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actionType";
import { postCurrentConversation } from "./../../../redux/actions/currentConversation";
import useStyles from "./styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}))(Badge);
function unique(arr) {
  var newArr = [];
  newArr = arr.filter((item, index) => item.id !== arr[index - 1]?.id);
  return newArr;
}
const checkUserOnline = (online, userId) => {
  return online.find((item) => item.id === userId) ? true : false;
};

function Room({ conversation }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const { online } = useSelector((state) => state);
  const _online = unique(online);
  const _friends = conversation?.member?.filter((m) => m._id !== user._id);
  const currentConversation = useSelector(
    (state) => state.currentConversation.data
  );
  const lastMessage = conversation?.lastMessage
    ? conversation.lastMessage.text
    : "";
  const lastMessageTimes = conversation?.lastMessage
    ? conversation.lastMessage.updatedAt
    : "";
  const dispatch = useDispatch();

  const handleClickItem = React.useCallback(() => {
    dispatch(postCurrentConversation(conversation));
    if (conversation.count_waiting_msg) {
      dispatch({
        type: GLOBALTYPES.REMOVE_COUNT_WAITING_MESSAGE,
        payload: conversation._id,
      });
    }
  }, [dispatch, conversation]);

  return (
    <ListItem
      className={classes.root}
      button
      onClick={handleClickItem}
      selected={currentConversation?._id === conversation._id ? true : false}
    >
      <ListItemAvatar>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant={
            checkUserOnline(_online, _friends[0]?._id) &&
            // isFriend(user?.friends, _friends[0]?._id) &&
            _friends?.length === 1
              ? "dot"
              : ""
          }
        >
          <AvatarGroup max={2}>
            {_friends?.map((item) => {
              return (
                <Avatar
                  src={item?.profilePicture}
                  key={item._id}
                  alt="avatar"
                />
              );
            })}
          </AvatarGroup>
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText
        className={classes.itemText}
        primary={
          conversation?.label
            ? conversation.label.slice(0, 30)
            : _friends[0]?.username
        }
        secondary={
          lastMessage &&
          `${lastMessage.slice(0, 20)} .  ${moment(lastMessageTimes).fromNow()}`
        }
      />

      <div
        className={conversation.count_waiting_msg > 0 ? `${classes.count}` : ""}
      >
        {conversation.count_waiting_msg}
      </div>
    </ListItem>
  );
}

export default Room;
