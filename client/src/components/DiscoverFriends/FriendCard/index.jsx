import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAddFriend } from "../../../redux/actions/authAction";
import useStyles from "./styles";

function FriendCard({ user_result }) {
  // console.log("itemmmmmmmmm:", "${user_result.profilePicture}")
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state);

  const [status, setStatus] = useState(false);

  const handleAddFriend = () => {
    // xu ly here
    dispatch(requestAddFriend(user_result._id, user, token, socket));
    alert("Đã gửi yêu cầu kết bạn cho " + user_result.username);
    setStatus(true);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardBody}>
        <Avatar
          src={user_result.profilePicture}
          alt="avatar"
          className={classes.cardAvatar}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="h3">
            {user_result.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user_result.phoneNumber}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* { user_result && status ===true &&
            (<CardActions >
                <Button disabled={true}
                
                size="small" color="primary" variant="contained" className={classes.cardButton} fullWidth>
                    
                Đã gửi yêu cầu
                </Button>
            </CardActions>) 
} */}

      <CardActions>
        <Button
          onClick={handleAddFriend}
          size="small"
          color="primary"
          variant="contained"
          className={classes.cardButton}
          fullWidth
        >
          Kết bạn
        </Button>
      </CardActions>
    </Card>
  );
}

export default FriendCard;
