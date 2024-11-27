import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';

import AboutUsScreen from '../screens/AboutUsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import AllCharityScreen from '../screens/AllCharityScreen';
import NewCharityScreen from '../screens/NewCharityScreen';

const AppStack = createStackNavigator();


const HomeNavigator = () => (
  <AppStack.Navigator option={{presentation:"modal"}}>
    <AppStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <AppStack.Screen name="AllCharities" component={AllCharityScreen} />
    <AppStack.Screen name="AboutUs" component={AboutUsScreen} />
    <AppStack.Screen name="NewCharity" component={NewCharityScreen} options={{ headerShown: false }}/>
  </AppStack.Navigator>
);

export default HomeNavigator;
