import {
  Avatar,
  Button,
  Chip,
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
import { Label } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postConversation } from "../../redux/actions/conversationsAction";
import { validateionCreateGroup } from "../../util/Validation";
import { hideModal } from "./../../redux/actions/modalAction";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
function AddGroupModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isShowAddGroupModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state);
  const listFriend = user?.friends;
  const [listMember, setListMember] = useState([]);
  const [listMemberErr, setListMemberErr] = useState("");

  const handleSubmitForm = React.useCallback(
    (values) => {
      const _listMember = listMember.map((member) => member._id);
      if (_listMember.length < 2) {
        setListMemberErr("Chọn ít nhất 2 thành viên");
        return;
      }

      _listMember.push(user._id);
      const data = {
        label: values.label,
        array: _listMember,
        createdBy: user._id,
      };
      dispatch(postConversation(data, token, socket, user));
      setListMember([]);
      // setLabel('')
      handleHideModal();
    },
    [dispatch, token, listMember, user._id]
  );

  const handleAddMember = (item) => {
    if (listMember.includes(item)) return;
    setListMember([...listMember, item]);
  };
  const handleDeleteMember = (item) => {
    setListMember((listMember) =>
      listMember.filter((member) => member._id !== item._id)
    );
  };
  const handleHideModal = () => {
    dispatch(hideModal("isShowAddGroupModal"));
  };
  const body = (
    <Fade in={isShowAddGroupModal}>
      <Paper className={classes.paper} id="modal-add-group">
        <h3>Tạo nhóm</h3>
        <Formik
          initialValues={{
            label: "",
          }}
          validationSchema={validateionCreateGroup}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmitForm(values);
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            resetForm,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              action=""
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Tên nhóm"
                name="label"
                error={errors.label}
                helperText={errors.label}
                touched={touched.label}
                value={values.label}
                onChange={handleChange}
                className={classes.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Label />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {
                  <Typography variant="body">
                    Đã chọn ({listMember.length})
                  </Typography>
                }
                <div
                  className={classes.listMember}
                  style={{ display: listMember.length > 0 ? "flex" : "none" }}
                >
                  {listMember?.map((item) => (
                    <Chip
                      key={item._id}
                      size="small"
                      avatar={
                        <Avatar
                          alt="avatar"
                          sizes="small"
                          src={item.profilePicture}
                        />
                      }
                      label={item.username}
                      disabled={user._id === item._id}
                      onDelete={() => handleDeleteMember(item)}
                      color="secondary"
                    />
                  ))}
                  <span style={{ color: "red" }}>{listMemberErr}</span>
                </div>
              </div>
              <div>
                {listFriend && (
                  <Typography>Ban be ({listFriend.length})</Typography>
                )}
                <List style={{ height: "400px", overflowY: "scroll" }}>
                  {listFriend?.map((item, index) => (
                    <ListItem
                      button
                      onClick={() => handleAddMember(item)}
                      key={index}
                    >
                      <ListItemAvatar>
                        <Avatar alt="avatar" />
                      </ListItemAvatar>
                      <ListItemText primary={item.username} />
                    </ListItem>
                  ))}
                </List>
              </div>

              <div className={classes.actions}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                >
                  Tạo nhóm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddGroupModal} />;
}

export default AddGroupModal;
