import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { Contacts, ExitToApp, Settings, Sms } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import {
  showFormChangePasswordModal,
  showFormSettingModal,
} from "../../redux/actions/modalAction";
import useStyles from "./styles";
function NavLeft() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const countWaitingAddFriend = auth.user?.friendsQueue.length;
  const navItems = [
    {
      icon: <Sms color="secondary" />,
      badge: 0,
      path: "/messenger",
      tooltip: "Nhắn tin",
    },
    {
      icon: <Contacts color="secondary" />,
      badge: countWaitingAddFriend,
      path: "/phonebook",
      tooltip: "Liên hệ",
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleShowOptionButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (path) => {
    history.push(path);
  };
  const handleLogout = () => {
    if (window.confirm("Bạn có muốn đăng xuất không ?")) dispatch(logout());
  };
  const handleFormSetting = () => {
    handleClose();
    dispatch(showFormSettingModal());
  };
  const handleFormChangePassword = () => {
    handleClose();
    dispatch(showFormChangePasswordModal());
  };
  return (
    <div className={classes.navleft}>
      <Avatar
        className={classes.avatar}
        src={process.env.PUBLIC_URL + "logo1.png"}
      />
      <Divider />
      <div className={classes.list}>
        {/* LIST ITEM */}
        <List component="nav" aria-label="nav-left">
          {navItems.map((item, i) => (
            <Tooltip title={item.tooltip}>
              <ListItem
                button
                selected={location.pathname === item.path ? true : false}
                key={i}
                onClick={() => handleClickItem(item.path)}
              >
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        {/* LIST ACTION */}
        <List component="nav" aria-label="nav-left">
          <Divider />
          <Tooltip title="Cài đặt thông tin cá nhân">
            <ListItem button>
              <div component="ul" aria-label="action">
                <IconButton size="small" onClick={handleShowOptionButton}>
                  <Settings color="secondary" />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                >
                  <MenuItem onClick={handleFormChangePassword}>
                    Đổi mật khẩu
                  </MenuItem>
                  <MenuItem onClick={handleFormSetting}>
                    Cập nhật thông tin cá nhân
                  </MenuItem>
                </Menu>
              </div>
            </ListItem>
          </Tooltip>
          <Tooltip title="Đăng xuất">
            <ListItem button onClick={handleLogout}>
              <ExitToApp color="secondary" />
            </ListItem>
          </Tooltip>
        </List>
      </div>
    </div>
  );
}

export default NavLeft;
