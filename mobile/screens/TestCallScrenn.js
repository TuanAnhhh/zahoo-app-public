import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    mediaDevices
} from 'react-native-webrtc';

export class TestCallScrenn extends Component {

    constructor(props){
        super(props)
    }
    
    componentDidMount() {
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log(sourceInfos);
            // let videoSourceId;
            // for (let i = 0; i < sourceInfos.length; i++) {
            //     const sourceInfo = sourceInfos[i];
            //     if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
            //         videoSourceId = sourceInfo.deviceId;
            //     }
            // }
            // mediaDevices.getUserMedia({
            //     audio: true,
            //     video: {
            //         width: 640,
            //         height: 480,
            //         frameRate: 30,
            //         facingMode: (isFront ? "user" : "environment"),
            //         deviceId: videoSourceId
            //     }
            // })
            //     .then(stream => {
            //         console.log("stream", stream);
            //     })
            //     .catch(error => {
            //         console.log("error", error);
            //     });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default TestCallScrenn
