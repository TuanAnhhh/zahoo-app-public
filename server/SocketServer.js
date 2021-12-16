let users = [];

const SocketServer = (socket) => {
  // Connect - Disconnect
  socket.on("joinUser", (user) => {
    users.push({
      id: user._id,
      socketId: socket.id,
      friends: user.friends,
      username: user.username,
      profilePicture: user.profilePicture,
      phoneNumber: user.phoneNumber,
    });
  });
  socket.on("disconnect", () => {
    const data = users.find((user) => user.socketId === socket.id);

    if (data) {
      let clients = users.filter((user) =>
        data.friends.find((item) => item._id === user.id)
      );
      clients = clients.map((friend) => {
        const { friends, ...other } = friend;
        return other;
      });

      if (clients.length > 0) {
        clients.forEach((client) => {
          const { friends, ...other } = data;
          socket.to(`${client.socketId}`).emit("CheckUserOffline", other);
        });
      }
      if (data.call) {
        const callUser = users.find((user) => user.id === data.call);
        if (callUser) {
          users = EditData(users, callUser.id, null);
          socket.to(`${callUser.socketId}`).emit("callerDisconnect");
        }
      }
    }
    users = users.filter((user) => user.socketId !== socket.id);
  });
  // Message
  socket.on("addMessage", (msg) => {
    msg.member.forEach((element, index) => {
      const user = users.find((user1) => user1.id === element._id);
      user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
    });
    return;
  });
  // Check User Online
  socket.on("checkUserOnline", (data) => {
    const user = users.find((user) => user.id === data._id);
    let friends = users.filter((user) =>
      data.friends.find((item) => item._id === user.id)
    );
    friends = friends.map((friend) => {
      const { friends, ...other } = friend;
      return other;
    });
    socket.emit("checkUserOnlineToMe", friends);

    if (friends.length > 0) {
      friends.forEach((client) => {
        socket.to(`${client.socketId}`).emit("checkUserOnlineToClient", user);
      });
    }
  });

  // Call User
  const EditData = (data, id, call) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, call } : item
    );
    return newData;
  };
  // Call User
  socket.on("callUser", (data) => {
    users = EditData(users, data.sender, data.recipient);

    const client = users.find((user) => user.id === data.recipient);

    if (client) {
      if (client.call) {
        socket.emit("userBusy", data);
        users = EditData(users, data.sender, null);
      } else {
        users = EditData(users, data.recipient, data.sender);
        socket.to(`${client.socketId}`).emit("callUserToClient", data);
      }
    }
  });

  socket.on("endCall", (data) => {
    const client = users.find((user) => user.id === data.sender);

    if (client) {
      socket.to(`${client.socketId}`).emit("endCallToClient", data);
      users = EditData(users, client.id, null);

      if (client.call) {
        const clientCall = users.find((user) => user.id === client.call);
        clientCall &&
          socket.to(`${clientCall.socketId}`).emit("endCallToClient", data);

        users = EditData(users, client.call, null);
      }
    }
  });
  //notify
  socket.on("requestAddFriend", (data) => {
    // console.log(data);
    const client = users.find((user) => user.id === data.recipient);

    if (client) {
      socket.to(`${client.socketId}`).emit("requestAddFriendToClient", data);
    }
  });
  // accept add friend
  socket.on("acceptAddFriend", (data) => {
    const client = users.find((user) => user.id === data.recipient);

    if (client) {
      socket.to(`${client.socketId}`).emit("acceptAddFriendToClient", data);
    }
  });
  // deniedAddFriend
  socket.on("deniedAddFriend", (data) => {
    const client = users.find((user) => user.id === data.recipient);

    if (client) {
      socket.to(`${client.socketId}`).emit("deniedAddFriendToClient", data);
    }
  });
  // cancel add friend
  socket.on("cancelRequestAddFriend", (data) => {
    const client = users.find((user) => user.id === data.recipient);
    if (client) {
      socket
        .to(`${client.socketId}`)
        .emit("cancelRequestAddFriendToClient", data.sender);
    }
  });
  // change group name
  socket.on("changeGroupName", (data) => {
    // console.log("connect")
    const { member, ...other } = data;
    // console.log(other)
    data.member.forEach((element, index) => {
      const user = users.find((user1) => user1.id === element);
      user &&
        socket.to(`${user.socketId}`).emit("changeGroupNameToClient", other);
    });
    return;
  });
  // on typing text
  socket.on("onTypingText", (data) => {
    // console.log(data)
    data.member.forEach((element, index) => {
      const user = users.find((user1) => user1.id === element);
      user &&
        socket.to(`${user.socketId}`).emit("onTypingTextToClient", {
          conversationId: data.conversationId,
          sender: data.sender,
          isTyping: true,
        });
    });
    return;
  });
  // on typing text
  socket.on("offTypingText", (data) => {
    // console.log(data)
    data.member.forEach((element, index) => {
      const user = users.find((user1) => user1.id === element);
      user &&
        socket.to(`${user.socketId}`).emit("offTypingTextToClient", {
          conversationId: data.conversationId,
          sender: data.sender,
          isTyping: false,
        });
    });
    return;
  });

  // delete  friend
  socket.on("deleteFriend", (data) => {
    console.log("connect");

    const client = users.find((user) => user.id === data.recipient);

    if (client) {
      socket.to(`${client.socketId}`).emit("deleteFriendToClient", data);
    }
  });

  // kick member out group
  socket.on("kickMember", (data) => {
    const { conversation, userID, memberID } = data;
    const listMember = conversation.member.filter((m) => m._id !== userID);

    listMember.forEach((element) => {
      const user = users.find((user1) => user1.id === element._id);
      user && socket.to(`${user.socketId}`).emit("kickMemberToClient", data);
    });

    return;
  });

  //  out group
  socket.on("outGroup", (data) => {
    const { conversation, memberID } = data;

    conversation.member
      .filter((m) => m._id !== memberID)
      .forEach((element, index) => {
        const client = users.find((user) => user.id === element._id);

        client &&
          socket.to(`${client.socketId}`).emit("outGroupToClient", data);
      });

    return;
  });
  //  delete group
  socket.on("deleteGroup", (data) => {
    const { conversation, userID } = data;

    conversation.member
      .filter((m) => m._id !== userID)
      .forEach((element, index) => {
        const client = users.find((user) => user.id === element._id);

        client &&
          socket.to(`${client.socketId}`).emit("deleteGroupToClient", data);
      });

    return;
  });

  //add friend to group
  socket.on("addFriendToGroup", (data) => {
    const { conversation, member, user } = data;

    const list = conversation.member
      .concat(member)
      .filter((a) => a._id !== user._id);

    list.forEach((element, index) => {
      const client = users.find((u) => u.id === element._id);
      client &&
        socket.to(`${client.socketId}`).emit("addFriendToGroupToClient", {
          conversation: conversation,
          member: member,
        });
    });
    return;
  });

  //active user
  socket.on("activeUser", (data) => {
    const client = users.find((u) => u.id === data._id);
    client &&
      socket.to(`${client.socketId}`).emit("activeUserToClient", { data });
    return;
  });

  // add conversation
  socket.on("addConversation", (data) => {
    const { conversation, user } = data;
    const list = conversation.member.filter((a) => a._id !== user._id);
    console.log("list", list);
    list.forEach((element, index) => {
      const client = users.find((u) => u.id === element._id);
      console.log("client", users);

      client &&
        socket
          .to(`${client.socketId}`)
          .emit("addConversationtoclient", { conversation: conversation });
    });
    return;
  });
};

module.exports = SocketServer;
