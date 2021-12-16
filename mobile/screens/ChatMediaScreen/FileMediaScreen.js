import React, { useCallback } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function FileMediaScreen() {


    const listMedia = useSelector(state => state.getFileConversationReducer.media);

  
    const OpenURLButton = ({ url, children, type }) => {
        
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url,type]);

        return <TouchableOpacity title={children} onPress={handlePress} style={styles.content} >
            <Text style={{ color: 'blue',marginLeft:10}}> 
                 {url.split("/")[3] + '.'+type.split("/")[1]}
             </Text>
        </TouchableOpacity>
    };
    return (
        <ScrollView>
            {
                listMedia?.map( (item, key) => (
                    <OpenURLButton key={key} url={item.media.url} type={item.media.type} />
             
            ))
            }

        </ScrollView>
    )
}

const styles= StyleSheet.create({
    content:{
        width:'100%',
        height:50,
        backgroundColor: '#e6e6e6',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderRadius: 10,
         
        justifyContent:'center'
    }
})
