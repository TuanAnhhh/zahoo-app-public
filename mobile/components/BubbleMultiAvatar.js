import React from 'react'
import { View, Text, Image } from 'react-native'
import { StyleSheet } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { useSelector } from 'react-redux';

const BubbleMultiAvatar = ({ otherUsers, styleFormat, isGroup }) => {
    if (isGroup == undefined || isGroup == null) {
        isGroup = true;
    }
    const isDarkTheme = useSelector(state => state.theme)

    const { user } = useSelector(state => state.auth);

    let otherUsersCount = otherUsers?.length;
    let listProfilePictures = [];

    if (otherUsersCount > 4) {
        otherUsers.filter(userItem => userItem._id != user._id).slice(0, 3).forEach(userItem => {
            // if(userItem._id == user._id){
            //     console.log("userItem",userItem.username);
            // }
            listProfilePictures.push(userItem?.profilePicture != ''
                ? userItem?.profilePicture
                : 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
        });
    }
    else if (isGroup == true) {
        otherUsers?.forEach(userItem => {
            listProfilePictures.push(userItem?.profilePicture != ''
                ? userItem?.profilePicture
                : 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
        });
    }
    else {
        const otheruser = otherUsers?.filter(userItem => userItem._id != user._id)[0];
        listProfilePictures.push(otheruser?.profilePicture != ''
            ? otheruser?.profilePicture
            : 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
        otherUsersCount = 0
    }

    let i = 0; //reset key với trường hợp trùng key item
    return (
        <View style={[styles.container, otherUsersCount < 4 && { flexDirection: 'column' }, { ...styleFormat }]}>
            {listProfilePictures.map((item) => {
                return (
                    <View
                        key={item + i++}
                        style={[
                            styles.imageWrapper,
                            otherUsersCount < 2 && { width: '100%' },
                            otherUsersCount < 3 && { height: '100%' }
                        ]}>
                        <Image
                            source={{
                                uri: '' + item,
                            }}
                            style={styles.userAvatar}
                        />
                    </View>
                )
            })}
            {otherUsersCount > 4 &&
                <View style={styles.moreUserTextWrapper}>
                    <Text style={styles.moreUserText}>
                        {otherUsersCount - 3}+
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        borderRadius: responsiveHeight(100),
        marginHorizontal: 8,
        overflow: 'hidden',
        backgroundColor: '#e6e6e6',
        alignItems: 'stretch',
    },
    imageWrapper: {
        position: 'relative',
        width: '50%',
        height: '50%',
        flexGrow: 1,
        padding: 0.5,
    },
    userAvatar: {
        height: '100%',
    },
    activeIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 18,
        height: 18,
        borderRadius: 10,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: '#18be12'
    },
    moreUserTextWrapper: {
        position: 'relative',
        width: '50%',
        height: '50%',
        flexGrow: 1,
        padding: 0.5,
        borderRadius: responsiveHeight(8),
    },
    moreUserText: {
        textAlign: 'center'
    }
})
export default BubbleMultiAvatar;
