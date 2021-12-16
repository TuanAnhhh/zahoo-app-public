import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { theme } from '../core/theme'

// title để hiện thị label nhóm nếu có, seperate (boolean) nếu cần ngăn cách ở cuối thì thêm vào
export default function ComponentWrapper({ children, titleWrapper, seperate }) {
    const currTheme = useTheme();
    return (
        <View style={styles.componentWrapper}>
            <View style={styles.container}>
                {titleWrapper && <Text style={[styles.titleWrapper, {color: currTheme.dark ? "#F9F9F9" : theme.colors.primary}]}>{titleWrapper}</Text>}
                {children}
                {seperate && <View style={[styles.seperate, currTheme.dark ? {backgroundColor: "#222"} : {backgroundColor: "#e6e6e6"}]}></View>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    componentWrapper: {
        // paddingBottom: 10,
        // backgroundColor: "#e6e6e6",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "stretch"
    },
    seperate: {
        height: 10,
        // backgroundColor: "#e6e6e6",
    },
    titleWrapper: {
        paddingLeft: responsiveHeight(3),
        color: theme.colors.primary,
        fontSize: responsiveFontSize(1.8),
        fontWeight: "bold",
        paddingVertical: 5
    }
})
// export default ComponentWrapper
