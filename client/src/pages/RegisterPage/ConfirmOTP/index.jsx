import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import DescriptionAlerts from "../../../components/Alert/Alert";
import { register } from "../../../redux/actions/authAction";
import { firebase } from "../../../util/firebase";
import AuthLaylout from "./../../../components/Layout/AuthLayout";
import { validateionOTP } from "./../../../util/Validation";
import useStyles from "./styles";

function ConfirmOTP() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();

  const data = location.data;

  const { auth } = useSelector((state) => state);
  useEffect(() => {
    if (auth.token) {
      history.push("/messenger");
    }
  }, [auth, history, dispatch]);
  useEffect(() => {
    document.title = "Trang xác nhận";
  });

  // config
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendOTP();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const handleSendOTP = (values) => {
    configureCaptcha();
    const phoneNumber = "+84" + data.phoneNumber.slice(1);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent", error);
      });
  };

  const handleSubmitForm = (values) => {
    window.confirmationResult
      .confirm(values.otp)
      .then((result) => {
        const dt = {
          username: data.username,
          phoneNumber: data.phoneNumber,
          password: data.password,
        };
        dispatch(register(dt));
      })
      .catch((error) => {
        alert("Mã xác nhận không chính xác");
      });
  };
  return (
    <AuthLaylout>
      <DescriptionAlerts />

      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={validateionOTP}
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
              Nhập mã xác nhận
            </Typography>

            <TextField
              label="Nhập mã xác nhận"
              error={errors.otp}
              helperText={errors.otp}
              touched={touched.otp}
              type="text"
              fullWidth
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              name="otp"
              onChange={handleChange}
            />
            <div id="sign-in-button"> </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Button variant="secondary" onClick={() => handleSendOTP(values)}>
                Gửi lại mã
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Xác nhận
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

export default ConfirmOTP;
