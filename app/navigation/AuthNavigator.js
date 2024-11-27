import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import RegisterScreen from '../screens/RegisterScreen';
const AppStack =  createStackNavigator();

const AuthNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
         <AppStack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
         <AppStack.Screen name="HomeAuth" component={TabNavigator} options={{headerShown:false}}/>
    </AppStack.Navigator>
)

export default AuthNavigator;