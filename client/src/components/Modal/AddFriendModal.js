import {
  Avatar,
  Button,
  Fade,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAddFriend } from "../../redux/actions/authAction";
import { suggessFriends } from "../../redux/actions/suggessFriendsAction";
import { getUserByPhoneNumber } from "../../redux/actions/userResultFromModalAddFriendAction";
import ErrorMessage from "../Alert/ErrorMessage";
import SmallLoading from "../Alert/SmallLoading";
import { hideModal } from "./../../redux/actions/modalAction";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
function AddFriendModal() {
  const classes = useStyles();
  const { socket } = useSelector((state) => state);
  const { isShowAddFriendModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const userResult = useSelector(
    (state) => state.userResultFromModalAddFriend.data
  );
  const { loading, error } = useSelector(
    (state) => state.userResultFromModalAddFriend
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(suggessFriends(user, token));
  }, [token, user, dispatch]);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (phoneNumber === "") return;
      dispatch(getUserByPhoneNumber(phoneNumber, token));
    },
    [phoneNumber, token, dispatch]
  );

  const handleRequestAddFriend = React.useCallback(() => {
    // xu ly here
    dispatch(requestAddFriend(userResult, user, token, socket));
    dispatch(hideModal("isShowAddFriendModal"));
  }, [user, token, dispatch, userResult, socket]);

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddFriendModal"));
    setPhoneNumber("");
  };

  const body = (
    <Fade in={isShowAddFriendModal}>
      <Paper className={classes.paper} id="modal-add-friend">
        <h3>Thêm bạn</h3>
        <form
          action=""
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Số điện thoại"
            className={classes.title}
            value={phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {loading && <SmallLoading />}
          {error && <ErrorMessage error={error} />}
          {userResult && (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={userResult?.profilePicture} alt="avatar" />
              </ListItemAvatar>
              <ListItemText
                primary={userResult.username}
                secondary={userResult.phoneNumber}
              />
              {userResult._id && user._id !== userResult._id && (
                <>
                  {userResult.friends.includes(user._id) ||
                  user.friends.includes(userResult._id) ? (
                    <Button variant="outlined" color="primary" disabled>
                      Bạn bè
                    </Button>
                  ) : (
                    <>
                      {userResult.friendsQueue.includes(user._id) ? (
                        <Button variant="outlined" color="primary" disabled>
                          Đã gửi yêu cầu
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleRequestAddFriend}
                        >
                          Kết bạn
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </ListItem>
          )}
          <Typography>Gợi ý kết bạn</Typography>
          <div className={classes.actions}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={phoneNumber.length === 0}
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddFriendModal} />;
}

export default AddFriendModal;
