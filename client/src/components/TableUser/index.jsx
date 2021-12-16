import { Button, IconButton, TextField } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  getUserByPhoneNumber,
  isActiveUser,
} from "../../redux/actions/usersAction";
import useStyles from "./styles";

export default function DataTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { auth, socket } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const classes = useStyles();

  let _users = users?.data;
  _users = _users.map(function (obj) {
    obj["createdAt"] = moment(obj["createdAt"]).format("MM/DD/YYYY, h:mm:ss a");
    return obj;
  });

  const listUser = _users.filter((user) => user._id !== auth.user._id);
  const data = { userId: auth.user._id };

  const handleChangePage = React.useCallback(
    (value) => {
      if (value === -1) {
        if (page > 1) {
          setPage(page - 1);
          dispatch(getAllUser(auth.token, page - 1, 15));
        }
      } else {
        setPage(page + 1);
        dispatch(getAllUser(auth.token, page + 1, 15));
      }
    },
    [dispatch, auth.token, page]
  );

  const handleClick = (id) => {
    dispatch(isActiveUser(id, data, auth.token, socket));
  };
  const handleChangeTextSearch = (e) => {
    dispatch(getUserByPhoneNumber(e.target.value, auth.token));
  };

  return (
    <div className={classes.container}>
      <TextField
        id="outlined-basic"
        style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }}
        label="Tìm kiếm"
        variant="outlined"
        onChange={handleChangeTextSearch}
      />

      <div className={classes.userTable}>
        <table className={classes.table} border="1">
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>

          {listUser?.map((item, index) => (
            <tr
              key={index + 1}
              style={{ backgroundColor: index % 2 === 0 ? "#dddddd" : "#fff" }}
            >
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{item.gender ? "Nam" : "Nữ"}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.createdAt}</td>
              <td>{item.status ? "Đang hoạt động" : "Đang bị chặn"}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    item.status
                      ? window.confirm(
                          "Bạn có chắc chắn muốn chặn tài khoản " +
                            item.username +
                            " không ?"
                        ) && handleClick(item._id)
                      : window.confirm(
                          "Bạn có chắc chắn muốn kích hoạt lại tài khoản " +
                            item.username +
                            " không ?"
                        ) && handleClick(item._id);
                  }}
                  style={{
                    width: "180px",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {item.status ? "Chặn" : "Kích hoạt lại"}
                </Button>
              </td>
            </tr>
          ))}
        </table>

        <div>
          <IconButton onClick={() => handleChangePage(-1)}>
            <NavigateBefore />
          </IconButton>
          <input
            style={{ width: "20px", fontWeight: "bold", border: "0" }}
            type="text"
            value={page}
          />
          <IconButton onClick={() => handleChangePage(1)}>
            <NavigateNext />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
