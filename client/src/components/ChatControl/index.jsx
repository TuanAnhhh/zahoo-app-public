import { List, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import OnlineFriendsHori from "../OnlineFriendsHori";
import SearchBox from "../SearchBox";
import ChatRoom from "./ChatRoom";
import FriendVertical from "./FriendVertical";
import GroupVertical from "./GroupVertical";
import useStyles from "./styles";
function ChatControl() {
  const classes = useStyles();
  const location = useLocation();
  const { data } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.auth);
  const friendCount = user?.friends.length;
  const friends = user?.friends;

  const [isSearch, setIsSearch] = useState(false);

  const groups = data?.filter((item) => item.label);
  return (
    <div className={classes.chatControl}>
      <SearchBox />
      {/* {!isSearch && ( */}
      <>
        {location.pathname === "/messenger" && <OnlineFriendsHori />}
        <List className={classes.body}>
          {location.pathname === "/phonebook" ? (
            <>
              <div>
                <Typography
                  variant="body"
                  component="h3"
                  color="textPrimary"
                >{`Bạn bè(${friendCount})`}</Typography>
                {friends?.map((e) => (
                  <FriendVertical friend={e} key={e._id} />
                ))}
              </div>
              <div>
                <Typography
                  variant="body"
                  component="h3"
                  color="textPrimary"
                >{`Nhóm(${groups.length})`}</Typography>
                {groups?.map((e) => (
                  <GroupVertical conversation={e} key={e._id} />
                ))}
              </div>
            </>
          ) : (
            <div>
              <Typography
                variant="body"
                component="h3"
                color="textPrimary"
                className={classes.chatFriendHead}
              >
                Hội thoại
              </Typography>
              {data.length > 0 &&
                data?.map((e) => <ChatRoom conversation={e} key={e._id} />)}
            </div>
          )}
        </List>
      </>
      {/* )} */}
    </div>
  );
}

export default ChatControl;
