import {
  IconButton,
  InputBase,
  List,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import { GroupAdd, PersonAdd, Search } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  showAddFriendModal,
  showAddGroupModal,
} from "./../../redux/actions/modalAction";
import {
  getConversationsByUserId,
  search,
} from "../../redux/actions/conversationsAction";
function SearchBox({ setIsSearch }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [inputSearch, setInputSearch] = useState("");

  const handleAddFriend = () => {
    dispatch(showAddFriendModal());
  };
  const handleAddGroupChat = () => {
    dispatch(showAddGroupModal());
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    if (text === "") {
      setInputSearch("");
      dispatch(getConversationsByUserId(auth.user._id, auth.token));
      return;
    } else {
      setInputSearch(text);
      dispatch(search(text, auth));
      return;
    }
  };
  return (
    <>
      <Toolbar style={{ padding: "0" }}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Tìm kiếm..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            // inputProps={{ 'aria-label': 'search' }}
            value={inputSearch}
            onChange={handleSearch}
          />
        </div>
        <List>
          <Tooltip title="Thêm bạn">
            <IconButton onClick={handleAddFriend}>
              <PersonAdd color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tạo nhóm">
            <IconButton onClick={handleAddGroupChat}>
              <GroupAdd color="primary" />
            </IconButton>
          </Tooltip>
        </List>
      </Toolbar>
    </>
  );
}

export default SearchBox;
