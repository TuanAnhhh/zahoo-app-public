import { useNavigation } from '@react-navigation/core';
import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import { getMediaCurrentConversation } from '../../redux/actions/getConversationMediaAction';

export default function ImageMediaScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const width = Dimensions.get("window").width / 4;

    let listMedia = useSelector(state => state.getConversationMediaReducer.media);
    
    const [medias, setMedias] = useState([])
    useEffect(() => {
        if (listMedia) {
            setMedias(listMedia)
        }
    }, [listMedia])

    let i = 0;
    return (
        <ScrollView >
            <View style={{ width: "100%", height: "100%", flexDirection: "row", flexWrap: "wrap", }}>
                {medias.map((item) => {
                    return (
                        <View
                            key={item.media.url + i++}
                            style={{ width: width, height: width, borderWidth: 1, borderColor: "#ddd", padding: 1 }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={()=>{navigation.navigate('ImageFullScreen', {urlImg : item.media.url, type:item.media.type})}}
                            >
                                {
                                    item.media.type.includes("image") && 
                                    <Image
                                    source={{
                                        uri: item.media.url
                                    }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                                }

                                {
                                    item.media.type.includes("video") && 
                                    <Video
                                    source={{
                                        uri: item.media.url
                                    }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    style={{ width: "100%", height: "100%" }}
                                />
                                }

                                

                            </TouchableOpacity>

                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}
