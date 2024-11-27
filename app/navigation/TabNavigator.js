import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
const AppTab = createBottomTabNavigator();

import NewCharityScreen from '../screens/NewCharityScreen';
import AppColors from '../config/AppColors';
import HomeNavigator from './HomeNavigator';
import CategoryNavigator from './CategoryNavigator';
//import MyCharityScreen from '../screens/MyCharityScreen';



function TabNavigator(props) {
    return (
        <AppTab.Navigator screenOptions={{tabBarActiveTintColor:"black",tabBarInactiveTintColor:"black",tabBarInactiveBackgroundColor:AppColors.secondaryColor, tabBarActiveBackgroundColor:AppColors.otherColor}}>
            <AppTab.Screen name="HomeTab" component={HomeNavigator} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />),headerShown: false,}} />
            <AppTab.Screen name="NewCharity" component={NewCharityScreen} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="plus-circle" color={color} size={size} />),headerShown: false,}}/>
            <AppTab.Screen name="Category" component={CategoryNavigator} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="hand-heart" color={color} size={size} />),headerShown: false,}}/>
        </AppTab.Navigator>
    );
}

export default TabNavigator;