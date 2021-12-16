import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux'
import BubbleMultiAvatar from '../components/BubbleMultiAvatar'
import { Text as PaperText } from 'react-native-paper'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { GLOBALTYPES } from '../redux/actionType'

import {
    mediaDevices
} from 'react-native-webrtc';

const CallScreen = () => {

    // =============
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const { call, auth, peer, socket, currentConversationsReducer } = useSelector(state => state)
    const currentConver = currentConversationsReducer.data
    const labelConver = currentConver.label;
    const user = auth.user;

    const isGroup = labelConver != undefined;
    const otherUsers = currentConver.member.filter(itemUser => itemUser._id != user._id);
    const otherUser = otherUsers[0];
    const label = isGroup ? chatRoom.label : otherUser.username;
    let otherUserProfilePicture = 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
    if (!isGroup && otherUser !== undefined && otherUser?.profilePicture == '')
        otherUserProfilePicture = otherUse?.profilePicture;

    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const [second, setSecond] = useState(0)
    const [total, setTotal] = useState(0)

    const [answer, setAnswer] = useState(false)
    const youVideo = useRef()
    const otherVideo = useRef()
    const [tracks, setTracks] = useState(null)
    const [newCall, setNewCall] = useState(null)
    // =============

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
        console.log(sourceInfos);
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                videoSourceId = sourceInfo.deviceId;
            }
        }
        mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: (isFront ? "user" : "environment"),
                deviceId: videoSourceId
            }
        })
            .then(stream => {
                console.log("stream", stream);
            })
            .catch(error => {
                console.log("error", error);
            });
    });
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // Set Time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1)
            setTimeout(setTime, 1000)
        }
        setTime()

        return () => setTotal(0)
    }, [])

    useEffect(() => {
        setSecond(total % 60)
        setMins(parseInt(total / 60))
        setHours(parseInt(total / 3600))
    }, [total])

    useEffect(() => {
        if (answer) {
            setTotal(0)
        } else {
            const timer = setTimeout(() => {
                dispatch({ type: GLOBALTYPES.CALL, payload: null })
                navigation.goBack();
            }, 15000)
            return () => clearTimeout(timer)
        }
    }, [dispatch, answer, call]) //, socket, addCallMessage

    // End Call
    const handleEndCall = () => {
        dispatch({ type: GLOBALTYPES.CALL, payload: null })
        navigation.goBack();
    }
    // Answer Call
    const handleAnswer = () => {
        setAnswer(true)
    }
    return (
        <View style={styles.container}>
            <View style={styles.inforWrapper}>
                <BubbleMultiAvatar otherUsers={otherUsers} styleFormat={{ width: responsiveHeight(16), height: responsiveHeight(16) }} />
                <PaperText style={styles.name}>{label}</PaperText>
                <View style={styles.statusCall}>
                    {
                        call != null && call.video
                            ? <PaperText>Calling video...</PaperText>
                            : <PaperText>Calling audio...</PaperText>
                    }
                </View>
                <View style={styles.timer}>
                    <PaperText>
                        {mins.toString().length < 2 ? '0' + mins : mins}
                        :{second.toString().length < 2 ? '0' + second : second}
                    </PaperText>
                </View>
            </View>
            <View style={styles.callMenu}>
                <TouchableOpacity
                    style={[styles.buttonCall, { backgroundColor: "red" }]}
                    activeOpacity={0.7}
                    onPressOut={handleEndCall}
                >
                    <MaterialIcons name="call-end" size={32} color="#fff" />
                </TouchableOpacity>
                {
                    call != null && call.video
                        ? <TouchableOpacity
                            style={[styles.buttonCall, { backgroundColor: "#6bb32a" }]}
                            activeOpacity={0.7}
                            onPressOut={handleAnswer}
                        >
                            <FontAwesome5 name="video" size={24} color="#fff" />
                        </TouchableOpacity>
                        : <TouchableOpacity
                            style={[styles.buttonCall, { backgroundColor: "#6bb32a" }]}
                            activeOpacity={0.7}
                            onPressOut={handleAnswer}
                        >
                            <Ionicons name="call" size={30} color="#fff" />
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",

    },
    inforWrapper: {
        flexDirection: "column",
        alignItems: "center",
    },
    name: {
        fontSize: responsiveFontSize(3),
    },
    statusCall: {
        marginTop: 15,
    },
    timer: {
    },
    callMenu: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonCall: {
        backgroundColor: 'black',
        width: responsiveHeight(10),
        height: responsiveHeight(10),
        borderRadius: responsiveHeight(10),
        justifyContent: "center",
        alignItems: "center"
    },
})

export default CallScreen
