import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImageMediaScreen from './ChatMediaScreen/ImageMediaScreen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ContactScreen from './ContactScreen';
import FriendsScreen from './FriendsScreens';
import InviteAddFriend from './InviteAddFriend'

const FriendsAndContactsScreen = () => {
    
    const Tab = createMaterialTopTabNavigator();
    const optionTabBar = {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700'
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    title: 'Bạn bè',
                    tabBarLabelStyle: { ...optionTabBar }
                }}
                name="FriendsScreen"
                component={FriendsScreen}
            />
            <Tab.Screen
                name="ContactScreen"
                options={{
                    title: 'Danh bạ',
                    tabBarLabelStyle: { ...optionTabBar }
                }}
                component={ContactScreen}
            />
        </Tab.Navigator>
    )
}

export default FriendsAndContactsScreen
