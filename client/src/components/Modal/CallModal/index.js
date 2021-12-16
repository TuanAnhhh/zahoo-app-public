import {
  Avatar,
  Fade,
  IconButton,
  List,
  Paper,
  Typography,
} from "@material-ui/core";
import { Call, CallEnd, Videocam } from "@material-ui/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMesage } from "../../../redux/actions/messagesAction";
import { GLOBALTYPES } from "../../../redux/actionType";
import BaseModal from "../../Modal/BaseModal";
import RingRing from "./../../../audio/ringring.mp3";
import useStyles from "./styles";
function CallModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { call, auth, peer, socket, currentConversation } = useSelector(
    (state) => state
  );
  const currentConver = currentConversation.data;

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);

  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);

  // Set Time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      // const getData = async (recipientId,senderId) => {
      //     let result
      //     const post = {
      //         userId: auth.user._id
      //     }
      //     const resConver = await postDataAPI(`conversations/friend/${recipientId}`,post, auth.token)
      //     const resSender = await getDataAPI(`users/${senderId}`, auth.token)
      //     Promise.all([resConver, resSender]).then(values => {
      //         result = values.map(item => item.data)

      //        result = {
      //             conversation:arr[0],
      //             sender:arr[1],
      //        }
      //       });
      //       return resConver.data

      // }
      if (call.recipient !== auth.user._id || disconnect) {
        // const data1 = getData(call.recipient,call.sender)
        //     const {member, _id} = data1
        const data = {
          conversation: currentConver._id,
          sender: auth.user,
          text: "",
          media: [],
          call: { video: call.video, times },
        };
        const member = currentConver.member;
        dispatch(addMesage({ data, auth, socket, member }));
      }
      // },[])
    },
    [dispatch, currentConver, auth, socket]
  );
  // End Call
  const handleEndCall = () => {
    tracks && tracks.forEach((track) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit("endCall", { ...call, times });

    addCallMessage(call, times);
    dispatch({ type: GLOBALTYPES.CALL, payload: null });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCall", { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      addCallMessage(data, data.times);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
    });

    return () => socket.off("endCallToClient");
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  // Stream Media
  const openStream = (video) => {
    const config = { audio: true, video };
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Answer Call
  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on("stream", function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on("call", (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on("stream", function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener("call");
  }, [peer, call.video]);

  // Disconnect
  useEffect(() => {
    socket.on("callerDisconnect", () => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch({ type: GLOBALTYPES.CALL, payload: null });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `The ${call.username} disconnect` },
      });
    });

    return () => socket.off("callerDisconnect");
  }, [socket, tracks, dispatch, call, addCallMessage, answer, total, newCall]);

  // Play - Pause Audio
  const playAudio = (newAudio) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio(RingRing);
    if (answer) {
      pauseAudio(newAudio);
    } else {
      playAudio(newAudio);
    }

    return () => pauseAudio(newAudio);
  }, [answer]);

  const body = (
    <Fade in={true}>
      <Paper className={classes.paper} id="modal-call">
        <div
          className={classes.callBox}
          style={{
            display: answer && call.video ? "none" : "flex",
            padding: "1rem 0",
          }}
        >
          <Avatar
            src={call.profilePicture}
            alt="avatar-call"
            className={classes.profilePicture}
          >
            {call.username.slice(0, 1)}
          </Avatar>
          <Typography variant="body" component="h3">
            {call.username}
          </Typography>
          <Typography variant="body">{`Từ: ${auth.user.username}`}</Typography>
          {answer ? (
            <div>
              <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
              <span>:</span>
              <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
              <span>:</span>
              <span>
                {second.toString().length < 2 ? "0" + second : second}
              </span>
            </div>
          ) : (
            <div>
              {call.video ? (
                <span style={{ color: "red" }}>Calling Video...</span>
              ) : (
                <span style={{ color: "red" }}>Calling Audio...</span>
              )}
            </div>
          )}
          {!answer && (
            <div className={classes.timer}>
              <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
              <small>:</small>
              <small>
                {second.toString().length < 2 ? "0" + second : second}
              </small>
            </div>
          )}
          <List
            component="nav"
            aria-label="nav-left"
            className={classes.action}
          >
            <IconButton color="" onClick={() => handleEndCall()}>
              <CallEnd />
            </IconButton>
            {call.recipient === auth.user._id && !answer && (
              <>
                {call.video ? (
                  <IconButton color="primary" onClick={() => handleAnswer()}>
                    {/* {call.recipient === auth.user._id && !answer && call.video? <Videocam/> : <Call/>} */}
                    <Videocam />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={() => handleAnswer()}>
                    <Call />
                  </IconButton>
                )}
              </>
            )}
          </List>
        </div>
        <div
          className={classes.showVideo}
          style={{
            opacity: answer && call.video ? "1" : "0",
          }}
        >
          <video
            ref={youVideo}
            className={classes.youVideo}
            playsInline
            muted
          />
          <video ref={otherVideo} className={classes.otherVideo} playsInline />

          <div className="time_video">
            <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
            <span>:</span>
            <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
            <span>:</span>
            <span>{second.toString().length < 2 ? "0" + second : second}</span>
          </div>

          <IconButton onClick={() => handleEndCall()}>
            <CallEnd />
          </IconButton>
        </div>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={true} />;
}

export default CallModal;
