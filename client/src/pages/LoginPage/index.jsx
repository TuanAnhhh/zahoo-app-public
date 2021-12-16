import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Lock, Phone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import DescriptionAlerts from "../../components/Alert/Alert";
import { login } from "../../redux/actions/authAction";
import AuthLaylout from "./../../components/Layout/AuthLayout";
import useStyles from "./styles";
function LoginPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });
  useEffect(() => {
    if (auth.token && auth.user.isAdmin) {
      history.replace("/admin");
    } else if (auth.token) {
      history.replace("/messenger");
    }
  }, [auth, history, dispatch]);
  useEffect(() => {
    document.title = "Trang đăng nhập";
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };
  return (
    <AuthLaylout>
      <DescriptionAlerts />
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h4" color="primary" align="center">
          Đăng nhập
        </Typography>
        <TextField
          label="Số điện thoại"
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
          onChange={handleChangeInput}
        />
        <TextField
          label="Mật khẩu"
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
          onChange={handleChangeInput}
        />
        <Button type="submit" variant="contained" color="primary">
          Đăng nhập
        </Button>
        <div className={classes.action}>
          <Link to="/forgot-password">Quên mật khẩu?</Link>
          <Link to="/register">Đăng ký</Link>
        </div>
      </form>
    </AuthLaylout>
  );
}

export default LoginPage;
