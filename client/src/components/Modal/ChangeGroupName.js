import {
  Button,
  Fade,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_Current_Conversation_GroupName } from "../../redux/actions/currentConversation";
import { hideModal } from "../../redux/actions/modalAction";
import { validateionChangeGroupName } from "../../util/Validation";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
function ChangeGroupName() {
  const classes = useStyles();
  const { isShowChangeGroupName } = useSelector((state) => state.modal);
  const { auth, socket } = useSelector((state) => state);
  const { data } = useSelector((state) => state.currentConversation);
  const dispatch = useDispatch();

  const handleSubmitForm = React.useCallback(
    (values) => {
      const { label } = values;
      if (label === data.label) {
        handleHideModal();
      }
      dispatch(
        change_Current_Conversation_GroupName(data, label, auth, socket)
      );
      handleHideModal();
    },
    [data, auth, dispatch, socket]
  );

  const handleHideModal = () => {
    dispatch(hideModal("isShowChangeGroupName"));
  };

  const body = (
    <Fade in={isShowChangeGroupName}>
      <Paper className={classes.paper} id="modal-add-friend">
        <h3>Đổi tên nhóm</h3>
        <Formik
          initialValues={{
            label: "",
          }}
          validationSchema={validateionChangeGroupName}
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
                label="Tên nhóm mới"
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
              <div className={classes.actions}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={resetForm}>
                  Xóa trắng
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowChangeGroupName} />;
}

export default ChangeGroupName;
