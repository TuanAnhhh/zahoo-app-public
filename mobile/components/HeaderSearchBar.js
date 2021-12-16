import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { responsiveScreenFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useTheme, useNavigation } from '@react-navigation/native';

const HeaderSearchBar = ({ isType, callBack }) => {

    const navigation = useNavigation()
    const theme = useTheme();

    const [text, setText] = useState('')

    const handleChangeText = (text) => {
        if (isType) {
            setText(text)
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isType) {
                callBack(text)
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [text]);

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('SearchScreen') }}
            activeOpacity={0.6}
        >
            <View style={[
                styles.searchBar,
                theme.dark ? styles.darkBackground : styles.lightBackground,
            ]}>

                <View >
                    <FontAwesome name="search" size={responsiveScreenFontSize(2.2)} color="black" style={[styles.searchIcon]} />
                </View>

                {isType
                    ? <TextInput
                        style={[
                            styles.searchInput,
                            theme.dark ? styles.darkBackground : styles.lightBackground,
                        ]}
                        placeholder='Tìm kiếm'
                        placeholderTextColor='#909297'
                        underlineColor='transparent'
                        onChangeText={(text) => {
                            handleChangeText(text)
                        }}
                    />
                    : <View style={[styles.searchInput, { paddingVertical: 7 }]}>
                        <Text
                            style={[
                                styles.searchInput,
                                theme.dark ? styles.lightColor : styles.darkColor,
                            ]}
                        >
                            Tìm kiếm
                        </Text>
                    </View>
                }


            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: '#3a3b3c',
    },
    lightBackground: {
        backgroundColor: '#e6e6e6',
    },
    darkColor: {
        color: '#909297',
    },
    lightColor: {
        color: '#e6e6e6',
    },
    searchBar: {
        borderRadius: responsiveHeight(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.8),
    },
    searchIcon: {
        color: '#909297'
    },
    searchInput: {
        flex: 1,
        height: responsiveHeight(5),
        marginLeft: 10,
        fontSize: responsiveScreenFontSize(2),
        fontWeight: '600',
        color: '#fff',
    }
})

export default HeaderSearchBar
