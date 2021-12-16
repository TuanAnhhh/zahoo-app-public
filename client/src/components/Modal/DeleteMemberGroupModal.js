import {
  Avatar,
  Button,
  Fade,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Cancel, Phone } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemberGroup } from "../../redux/actions/currentConversation";
import { hideModal } from "../../redux/actions/modalAction";
import { getUserByPhoneNumber } from "../../redux/actions/userResultFromModalAddFriendAction";
import ErrorMessage from "../Alert/ErrorMessage";
import SmallLoading from "../Alert/SmallLoading";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
function DeleteMemberGroupModal() {
  const classes = useStyles();
  const { socket } = useSelector((state) => state);
  const { isShowDeleteMemberGroupModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const userResult = useSelector(
    (state) => state.userResultFromModalAddFriend.data
  );

  const { loading, error } = useSelector(
    (state) => state.userResultFromModalAddFriend
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const currentConversation = useSelector(
    (state) => state.currentConversation.data
  );
  const list = currentConversation?.member.filter((m) => m._id !== user._id);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (phoneNumber === "") return;
      dispatch(getUserByPhoneNumber(phoneNumber, token));
    },
    [phoneNumber, token, dispatch]
  );

  const handleHideModal = () => {
    dispatch(hideModal("isShowDeleteMemberGroupModal"));
    setPhoneNumber("");
  };

  const handleDeleteMember = (u) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa ${u.username}  ra khỏi nhóm ?`))
      dispatch(
        deleteMemberGroup(u._id, token, user, currentConversation, socket)
      );
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      if (phoneNumber === "") return;
      dispatch(getUserByPhoneNumber(phoneNumber, token));
      e.target.select();
    }
  };

  const body = (
    <Fade in={isShowDeleteMemberGroupModal}>
      <Paper className={classes.paper} id="modal-add-friend">
        <h3>Xóa thành viên</h3>
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
            onChange={handleChangePhoneNumber}
            onKeyDown={handlePressEnter}
          />
          {loading && <SmallLoading />}
          {error && <ErrorMessage error={error} />}
          {userResult &&
            userResult._id !== user._id &&
            currentConversation?.member.filter(
              (m) => m._id === userResult?._id
            )[0] !== undefined && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={userResult?.profilePicture} alt="avatar" />
                </ListItemAvatar>
                <ListItemText
                  primary={userResult.username}
                  secondary={userResult.phoneNumber}
                />
                <Cancel
                  className={classes.buttonDelete}
                  onClick={(u) => handleDeleteMember(userResult)}
                />
              </ListItem>
            )}
          <div>
            {(!userResult || phoneNumber === "") && list && (
              <Typography>Thành viên ({list.length})</Typography>
            )}
            <List style={{ height: "400px", overflowY: "scroll" }}>
              {(!userResult || phoneNumber === "") &&
                list?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar alt="avatar" />
                    </ListItemAvatar>
                    <ListItemText primary={item.username} />
                    <Cancel
                      onClick={(u) => handleDeleteMember(item)}
                      className={classes.buttonDelete}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
          <div className={classes.actions}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowDeleteMemberGroupModal} />;
}

export default DeleteMemberGroupModal;
