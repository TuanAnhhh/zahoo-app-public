import { useRoute } from '@react-navigation/core';
import { Video } from 'expo-av';
import React, { useState } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageFullScreen = () => {

    const { urlImg } = useRoute().params;
    const { type } = useRoute().params;
    const [imgHeigth, setImgHeigth] = useState(20);
    const [imgWidth, setImgWidth] = useState(20);

    if(type.includes("image")){
        Image.getSize(urlImg, (width, height) => {
            setImgHeigth(height); 
            setImgWidth(width);
        });
    
    }
    return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            {
                type.includes("image") && 
                <Image
                source={{
                    uri: urlImg + ''
                }}
                style={{ height: imgHeigth, width: windowWidth, maxWidth: "95%", maxHeight: "95%" }}
            />
            }

            {
                type.includes("video") && 
                <Video
                source={{
                    uri: urlImg 
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={{  width: '90%',height:'50%' }}
            />
            }
            
        </View>
    )
}

export default ImageFullScreen
