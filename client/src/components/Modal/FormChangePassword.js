import {
  Button,
  Fade,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Keyboard, Lock, VpnKey } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { putDataAPI } from "../../api";
import { hideModal } from "../../redux/actions/modalAction";
import { validateionChangePassword } from "../../util/Validation";
import BaseModal from "./BaseModal";
import useStyles from "./styles";

function FormChangePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isShowFormChangePasswordModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);

  const changePassword = async (data) => {
    try {
      await putDataAPI(`users/change-password/${user._id}`, data, token);
      handleHideModal();
      setTimeout(() => {
        alert("Cập nhật mật khẩu thành công!");
      }, 500);
    } catch (err) {
      alert("Cập nhật mật khẩu thất bại!");
      return;
    }
  };

  const handleHideModal = () => {
    dispatch(hideModal("isShowFormChangePasswordModal"));
  };

  const body = (
    <Fade in={isShowFormChangePasswordModal}>
      <Paper className={classes.paper} id="modal-add-group">
        <h2>Đổi mật khẩu</h2>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            reNewPassword: "",
          }}
          validationSchema={validateionChangePassword}
          onSubmit={(values) => {
            const { password, newPassword } = values;
            const data = { oldPassword: password, newPassword: newPassword };
            changePassword(data);
          }}
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            handleChange,
          }) => (
            <Form>
              <TextField
                label="Nhập mật khẩu hiện tại"
                error={errors.password}
                // className={classes.titleSetting}
                type="password"
                name="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <p class="error" className={classes.err}>
                {errors.password}
              </p>
              <TextField
                label="Nhập mật khẩu mới"
                // className={classes.titleSetting}
                fullWidth
                error={errors.newPassword}
                name="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
              />
              <p class="error" className={classes.err}>
                {errors.newPassword}
              </p>
              <TextField
                label="Nhập lại mật khẩu mới"
                // className={classes.titleSetting}
                fullWidth
                error={errors.reNewPassword}
                type="password"
                name="reNewPassword"
                value={values.reNewpassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Keyboard />
                    </InputAdornment>
                  ),
                }}
              />
              <p class="error" className={classes.err}>
                {errors.reNewPassword}
              </p>
              <div className={classes.actionSetting}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={
                    errors.password ||
                    errors.newPassword ||
                    errors.reNewPassword
                  }
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowFormChangePasswordModal} />;
}

export default FormChangePassword;
