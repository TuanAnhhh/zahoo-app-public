import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Title, useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/core';

export default function HeaderScreenGroup() {
    const theme = useTheme();
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            {/* <Title>Nhóm</Title> */}
            <DrawerItem
                label=''
                icon={({ color, size }) => (
                    <MaterialIcons name="group-add" size={40} color={theme.colors.primary} />
                )}
                style={styles.drawerItemLabel}
                onPress={() => { navigation.navigate('AddFriendToGroup') }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginLeft: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerItemLabel: {
        fontSize: responsiveFontSize(2),
        width: 60
    },
})
