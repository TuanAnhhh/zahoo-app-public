import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { theme as themeCore } from '../core/theme';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ProfileUserScreen({ navigation }) {

    const { token, user } = useSelector(state => state.auth);

    const myTheme = themeCore;

    const theme = useTheme();
    return (
        <View style={styles.container}>
            <View >
                <View style={[styles.userInfoSection]}>
                    {/* <ImageBackground
                        source={{ uri: user.coverPicture ? user.coverPicture : "https://nordiccoder.com/app/uploads/2018/10/react-native.png" }}
                        resizeMode="cover"
                        style={[styles.userInfoSection, { width: "100%", borderWidth: 1, borderColor: "#ddd" }]}
                    > */}
                    <View style={styles.user}>
                        <Avatar.Image
                            source={{
                                uri: user.profilePicture !== null && user.profilePicture !== '' ? user.profilePicture : 'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
                            }}
                            size={150}
                        />
                    </View>
                    <View style={[styles.UserName]}>
                        <Title style={styles.title}>{user.username}</Title>
                    </View>
                    {/* </ImageBackground> */}
                </View>

                <View style={styles.infoBoxWrapper}>
                    <View style={styles.row}>
                        <Text style={styles.textLocation}>Số điện thoại:</Text>
                        <Text style={styles.textLocation}>{user.phoneNumber}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.textLocation}>Bạn bè:</Text>
                        <Text style={styles.textLocation}>{user.friends.length}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { navigation.navigate("EditProfileUserScreen") }}>
                    <View style={styles.menuItem}>
                        {/* <MaterialIcons name="settings" size={25} color={myTheme.colors.settingText} /> */}
                        <Ionicons
                            name="settings-sharp"
                            size={20}
                            color={theme.dark ? "#525252" : "#fff"}
                            style={{
                                borderRadius: 150,
                                padding: 9,
                                paddingHorizontal: 10,
                                backgroundColor: theme.dark ? "#fff" : "#525252"
                            }}
                        />
                        <Text style={styles.menuItemText}>Thay đổi thông tin cá nhân</Text>
                    </View>
                </TouchableRipple>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        flexDirection: 'column',
    },
    userInfoSection: {
        marginVertical: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },

    user: {
        marginVertical: 15,
    },
    UserName: {
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: "center",
    },
    textLocation: {
        // color: '#777',
        marginLeft: 20,
        fontSize: responsiveFontSize(2),
        flex: 1
    },

    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'column',
        // height: responsiveHeight(10),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuWrapper: {
        marginTop: 10,
    },

    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        // paddingHorizontal: 30,
        alignItems: "center",
    },
    menuItemText: {
        color: '#777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },

})
