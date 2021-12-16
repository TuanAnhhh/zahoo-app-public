import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Text as PaperText } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Times from './util/Times';
import { color } from 'react-native-reanimated';
import ProgressiveImage from './ProgressiveImage';

const Message = ({ message, index, idRoom }) => {

    const theme = useTheme();
    const messages = useSelector(state => state.messages.data);
    const { text, sender, createdAt, media, call } = message

    const conversations = useSelector(state => state.conversations.data);
    const { token, user } = useSelector(state => state.auth);

    // TÌM TIN NHẮN TRC ĐÓ ĐỂ TẠO ĐƯỜNG LINE NGĂN CÁCH TIN NHẮN GIỮA 1 KHOẢNG T/G DÀI, SẴN TIỆN LÀM HIỆU ỨNG TIN NHẮN NẾU CẦN
    // lay tin nhan trc do
    // dung api lay message nằm trc, dùng biến index (đã dc truyền bên ChatScreen)
    // const messageBefore =
    //     Chats.find((item) => {
    //         return idRoom == item.id;
    //     })?.messages[index - 1];

    // const isSameMessOFUserBefore = messageBefore?.user.id === message.user.id;

    // lay tin nhan sau
    // dung api lay message nằm sau, dùng biến index (đã dc truyền bên ChatScreen)
    // const messageAfter =
    //     Chats.find((item) => {
    //         return idRoom == item.id;
    //     })?.messages[index + 1];
    // const isSameMessOFUserAfter = messageAfter?.user.id === message.user.id;

    // xac dinh room > 2user ?
    const userCount = conversations.length;
    const isMultiUser = userCount > 2;

    // ko can quan tam ==============================================================================
    // xac dinh vi tri message
    // const isHeader = !isSameMessOFUserBefore && isSameMessOFUserAfter;
    // const isCenter = isSameMessOFUserAfter && isSameMessOFUserBefore && messageAfter && messageBefore;
    // const isFooter = isSameMessOFUserBefore;
    // ===============================================================================================

    const isMyMessage = message.sender._id === user._id;

    // console.log("===============================");
    // console.log("sender", sender._id);
    // console.log("user  ", user._id);

    // const userImgUri = Users.find((user) => {
    //     return user.id == message.user.id;
    // }).imageUri;
    const userImgUri = message.sender.profilePicture === '' ? 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        : message.sender.profilePicture;

    const _handleOpenWithLinking = (url) => {
        Linking.openURL(url)
    };

    const OpenURLButton = ({ url, children, type }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url, type]);

        return <TouchableOpacity title={children} onPress={handlePress} >
            <Text style={[
                styles.message,
                theme.dark ? styles.darkMessage : styles.lightMessage,
                { color: 'blue' }
            ]}>
                {url.split("/")[3] + '.' + type.split("/")[1]}
            </Text>
        </TouchableOpacity>
    };

    if (isMyMessage) {
        return (
            <View style={{ flexDirection: 'column' }}>
                <View
                    style={[
                        isMyMessage ? styles.myContainer : styles.container,
                        { marginBottom: 5 }
                    ]}
                >
                    {text !== '' &&
                        <View style={styles.messageWrapper}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    styles.message,
                                    theme.dark ? styles.myDarkMessage : styles.myLightMessage
                                ]}>
                                    {message.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        media?.map((item, index) => (
                            <View style={styles.messageWrapper} key={index}>

                                {
                                    item.type.includes("video") &&

                                    <Video
                                        style={styles.imageMessage}
                                        source={{
                                            uri: item.url
                                        }}
                                        useNativeControls
                                        resizeMode="contain"
                                        isLooping

                                    />
                                }
                                {
                                    item.type.includes("image") &&
                                    <ProgressiveImage
                                        defaultImageSource={require('../assets/waitmessage.jpg')}
                                        source={{ uri: item.url }}
                                        style={styles.imageMessage}
                                        resizeMode="cover"
                                    />

                                    // <Image style={styles.imageMessage} source={{
                                    //     uri: item.url,
                                    // }} />
                                }

                                {
                                    item.type.includes("application") &&
                                    <OpenURLButton url={item.url} type={item.type} />
                                }

                            </View>

                        ))}

                    {
                        call && <View style={styles.messageWrapper}>

                            <View style={[
                                styles.message,
                                theme.dark ? styles.myDarkMessage : styles.myLightMessage
                            ]}>
                                <Text
                                    style={[
                                        // styles.message,
                                        theme.dark ? styles.myDarkMessage : styles.myLightMessage
                                    ]}
                                >
                                    <Ionicons name="call" size={24} color="black" style={[theme.dark ? styles.myDarkMessage : styles.myLightMessage]} />
                                    Cuộc gọi thoại
                                </Text>
                                <Text style={[styles.time,]}>
                                    <Times total={call.times} style={theme.dark ? styles.myDarkMessage : styles.myLightMessage} />
                                </Text>
                            </View>

                        </View>
                    }


                    {/* {!messageAfter ? //them dieu kien da seen
                    <Image source={{ uri: '' + userImgUri }} style={styles.smallAvatar} /> :
                    <View style={styles.smallAvatar} />
                } */}
                    <View style={styles.smallAvatar} />
                </View>

                {/* <View
                    style={[
                        isMyMessage ? styles.container : styles.myContainer,
                        { marginBottom: 5 }
                    ]}
                >

                </View> */}
            </View>
        )
    }
    else {
        return (
            <View style={[styles.container, { marginBottom: 5 }]}>
                <Image source={{ uri: '' + userImgUri }} style={styles.avatar} />

                {text.length > 0 &&
                    <View style={styles.messageWrapper}>
                        {/* {isMultiUser && <PaperText>{userName}</PaperText> } */}
                        <Text style={[
                            styles.message,
                            theme.dark ? styles.darkMessage : styles.lightMessage
                        ]}>
                            {text}
                        </Text>
                    </View>
                }
                {
                    call &&
                    <View style={styles.messageWrapper}>

                        <View style={[
                            styles.message,
                            theme.dark ? styles.darkMessage : styles.lightMessage
                        ]}>
                            <Text style={[theme.dark ? styles.darkMessage : styles.lightMessage]}>
                                <Ionicons name="call" size={24} color="black" style={[theme.dark ? styles.darkMessage : styles.lightMessage]} />
                                Cuộc gọi thoại
                            </Text>
                            <Text style={[styles.time,]}>
                                <Times total={call.times} style={theme.dark ? styles.darkMessage : styles.lightMessage} />
                            </Text>
                        </View>
                    </View>
                }
                {
                    media?.map((item, index) => (
                        <View style={styles.messageWrapper} key={index}>
                            {
                                item.type.includes("video") &&

                                <Video
                                    style={styles.imageMessage}
                                    source={{
                                        uri: item.url,
                                    }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping

                                />

                            }
                            {
                                item.type.includes("image") &&
                                <ProgressiveImage
                                    defaultImageSource={require('../assets/waitmessage.jpg')}
                                    source={{ uri: item.url }}
                                    style={styles.imageMessage}
                                    resizeMode="cover"
                                />


                            }

                            {
                                item.type.includes("application") &&

                                <OpenURLButton url={item.url} />

                            }

                        </View>
                    ))
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        margin: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    myContainer: {
        maxWidth: '100%',
        margin: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    messageWrapper: {
        maxWidth: '70%',
    },
    message: {
        backgroundColor: '#3a3b3c',
        color: '#fff',
        padding: 8,
        borderRadius: 20,
        paddingHorizontal: 18,
        fontSize: responsiveFontSize(1.9),
    },
    imageMessage: {
        width: 250,
        height: 250,
        borderRadius: 10
    },
    myLightMessage: {
        backgroundColor: '#64868E',
        color: '#fff'
    },
    myDarkMessage: {
        backgroundColor: '#64868E',
        color: '#fff',
    },
    lightMessage: {
        backgroundColor: '#e6e6e6',
        color: '#000',
    },
    darkMessage: {
        backgroundColor: '#3a3b3c',
        color: '#fff',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginRight: 10,
    },
    smallAvatar: {
        width: 15,
        height: 15,
        borderRadius: 50,
        marginHorizontal: 3,
    },
    messageHeader: {
        borderBottomLeftRadius: 5,
    },
    messageCenter: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    messageFooter: {
        borderTopLeftRadius: 5,
    },
    myMessageHeader: {
        borderBottomRightRadius: 5,
    },
    myMessageCenter: {
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
    myMessageFooter: {
        borderTopRightRadius: 5,
    },
    time: {
        paddingTop: 10
    }
})
export default Message
