import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImageMediaScreen from './ChatMediaScreen/ImageMediaScreen';
import FileMediaScreen from './ChatMediaScreen/FileMediaScreen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { useDispatch, useSelector } from 'react-redux'
import { getMediaCurrentConversation } from '../redux/actions/getConversationMediaAction';

const MediaTab = () => {

    const Tab = createMaterialTopTabNavigator();
    
    const optionTabBar = {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
    }

    const dispatch = useDispatch();
    const conversation = useSelector(state => state.currentConversationsReducer.data);
    const {auth}= useSelector(state => state);
    
    useEffect(() => {
        if (conversation){
           
            dispatch(getMediaCurrentConversation(conversation._id,auth.token));
       
       }
    }, [conversation])

    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    title: 'Ảnh/Video',
                    tabBarLabelStyle: { ...optionTabBar }
                }}
                name="ImageMediaScreen"
                component={ImageMediaScreen}
            />
            <Tab.Screen
                options={{
                    title: 'File',
                    tabBarLabelStyle: { ...optionTabBar }
                }}
                name="FileMediaScreen"
                component={FileMediaScreen}
            />
        </Tab.Navigator>
    )
}

export default MediaTab
