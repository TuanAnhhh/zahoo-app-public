import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Lock, Phone } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDataAPI } from "../../api";
import DescriptionAlerts from "../../components/Alert/Alert";
import { firebase } from "../../util/firebase";
import AuthLaylout from "./../../components/Layout/AuthLayout";
import { validationForgotPassword } from "./../../util/Validation";
import useStyles from "./styles";

function ForgotPasswordPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { auth } = useSelector((state) => state);
  useEffect(() => {
    if (auth.token) {
      history.push("/messenger");
    }
  }, [auth, history, dispatch]);
  useEffect(() => {
    document.title = "Trang quên mật khẩu";
  });

  // config
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "forgot-password-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendSms();
        },

        defaultCountry: "IN",
      }
    );
  };

  const handleSendSms = (values) => {
    configureCaptcha();
    const phoneNumber = "+84" + values.phoneNumber.slice(1);
    const appVerifier = window.recaptchaVerifier;
    console.log("appver: ", appVerifier);

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("SMS not sent", error);
      });
  };

  const handleSubmitForm = async (values) => {
    const data = {
      phoneNumber: values.phoneNumber,
    };

    const res = await postDataAPI("auth/check-numberphone", data);
    if (res.data.msg === false) {
      const dt = {
        phoneNumber: values.phoneNumber,
        password: values.password,
      };
      handleSendSms(values);

      history.replace({
        pathname: "/confirm-forgot-password",
        data: dt,
      });
    } else {
      alert("Không tìm thấy tài khoản");
    }
  };

  return (
    <AuthLaylout>
      <DescriptionAlerts />

      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
          cf_password: "",
        }}
        validationSchema={validationForgotPassword}
        onSubmit={(values, setSubmitting, resetForm) => {
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
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" color="primary" align="center">
              Lấy lại mật khẩu
            </Typography>

            <TextField
              label="Số điện thoại"
              error={errors.phoneNumber}
              helperText={errors.phoneNumber}
              touched={touched.phoneNumber}
              variant="filled"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />

            <TextField
              label="Nhập mật khẩu mới"
              error={errors.password}
              helperText={errors.password}
              touched={touched.password}
              type="password"
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              name="password"
              onChange={handleChange}
            />
            <TextField
              label="Nhập lại mật khẩu mới"
              error={errors.cf_password}
              helperText={errors.cf_password}
              touched={touched.cf_password}
              type="password"
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              name="cf_password"
              onChange={handleChange}
            />

            <div style={{ display: "flex", width: "100%" }}>
              <Button variant="secondary" onClick={resetForm}>
                Xóa Trống
              </Button>{" "}
              <div id="forgot-password-button"> </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Tiếp theo
              </Button>
            </div>
            <div className={classes.action}>
              <Link to="/login">Quay lại</Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLaylout>
  );
}

export default ForgotPasswordPage;
