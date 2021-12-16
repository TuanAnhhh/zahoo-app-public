import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    FlatList, StyleSheet, Text, View
} from "react-native";
import {
    useTheme
} from "react-native-paper";
import {
    responsiveHeight
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import FriendItem from "../components/FriendItem";
import HeaderSearchBar from "../components/HeaderSearchBar";
import ResultUserBySearchUser from "../components/ResultUserBySearchUser";
import { getUserByPhoneNumber } from "../redux/actions/userResultSearchByPhoneNumberAction";


export default function SearchScreen() {

    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

    const friends = useSelector((state) => state.userReducer.data);

    const resultUsers = useSelector((state) => state.userResultSearchByPhoneNumberAction.data);

    const [sdt, setSdt] = useState('')

    const handleSearchWhenTextChange = (text) => {
        setSdt(text)
    }

    useEffect(() => {
        if (sdt !== '') {
            dispatch(getUserByPhoneNumber(sdt, token))
        }
    }, [sdt])

    return (
        <View style={styles.container}>

            <HeaderSearchBar callBack={setSdt} isType={true} />

            <View >
                {
                    sdt != ''
                        ? resultUsers != {} && resultUsers != undefined && resultUsers != null
                            ? (
                                <ResultUserBySearchUser friend={resultUsers} />
                            )
                            : (
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <Text>Không tìm thấy người dùng</Text>
                                </View>
                            )
                        : (
                            <FlatList
                                data={friends}
                                renderItem={({ item }) => <FriendItem friend={item} />}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
    },

    darkBackground: {
        backgroundColor: "#3a3b3c",
    },
    lightBackground: {
        backgroundColor: "#e6e6e6",
    },
    searchBar: {
        borderRadius: responsiveHeight(50),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.8),
        height: 50
    },
    iconSearch: {
        marginLeft: 5
    },
    textInput: {
        marginLeft: 10,
        width: '100%'
    },
    action: {
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#909297',
        width: '100%',
        height: 40

    },
    header: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        marginLeft: 90,
    },

});