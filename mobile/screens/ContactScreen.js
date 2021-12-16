import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, PermissionsAndroid, FlatList, ActivityIndicator, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactItem from '../components/ContactItem';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../api';
import ComponentWrapper from '../components/ComponentWrapper';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { theme as themeCore } from '../core/theme';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

const ContactScreen = () => {

    const { token, user } = useSelector((state) => state.auth);
    const theme = useTheme()

    const [contacts, setContacts] = useState([{
        name: '',
        phoneNumber: '',
        avatarText: '',
    }]);
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);

    const isDarkTheme = useSelector(state => state.theme);

    const loadContact = async () => {
        setLoading(true)
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                setContacts(data.map((item) => {
                    return {
                        name: item.name,
                        phoneNumber: item.phoneNumbers[0].number ?? 'Lỗi khi đọc',
                        avatarText: item.name.charAt(0)?.toUpperCase(),
                    };
                }))

                const res = await postDataAPI(
                    `users/contacts/`,
                    {
                        contacts: await data.map((item) =>
                            item.phoneNumbers[0].number ?? 'Lỗi khi đọc'
                        )
                    },
                    token
                )

                setTimeout(async () => {
                    try {
                        await setContacts(res.data)
                        setLoading(false)
                    } catch (e) {
                        console.log(e);
                    }
                }, 1)
            }
        }
    }
    useEffect(() => {
        (loadContact)();
    }, []);

    return (
        <ScrollView style={{
            backgroundColor: isDarkTheme ? '#000' : '#fff', height: "100%"
        }}>
            {loading
                ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center",height: "100%" }}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
                :
                <ComponentWrapper titleWrapper="Người dùng trên danh bạ" seperate={true}>
                    <TouchableOpacity
                        onPress={loadContact}
                        style={styles.reloadWrapper}
                    >
                        <View style={[styles.reloadButton, {backgroundColor: theme.colors.primary}]}>
                            <Text style={styles.reloadButtonText}>Làm mới</Text>
                            <MaterialCommunityIcons name="reload" size={24} color={"#fff"} />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={contacts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ContactItem contact={item} />
                        )}
                        scrollEnabled={false}
                    />
                </ComponentWrapper>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    reloadWrapper :{
        alignSelf: "flex-end",
        margin: 10,
    },
    reloadButton:{
        height: responsiveHeight(5.5),
        backgroundColor: themeCore.colors.primary,
        paddingHorizontal: responsiveHeight(2),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 99,
    },
    reloadButtonText:{
        fontSize: responsiveHeight(2), color: "#fff", marginRight: 5
    }
})

export default ContactScreen
