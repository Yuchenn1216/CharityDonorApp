import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CategoryScreen from '../screens/CategoryScreen';
import CharityByCategoryScreen from '../screens/CharityByCategoryScreen';



const AppStack =  createStackNavigator();

const CategoryNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="category" component={CategoryScreen} options={{headerShown:false}}/>
         <AppStack.Screen name="CharityByCategory" component={CharityByCategoryScreen} />
    </AppStack.Navigator>
)

export default CategoryNavigator;