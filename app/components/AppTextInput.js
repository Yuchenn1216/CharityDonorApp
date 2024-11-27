import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppColors from '../config/AppColors';


function AppTextInput({icon,style, ...otherProps}) {
    return (
        <View style={[styles.container,style]}>
            {icon && <MaterialCommunityIcons name={icon} size={25}/>}
            <TextInput style={styles.textInput} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    
    container:{
        backgroundColor:AppColors.white,
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 25, 
        padding: 10,
        marginVertical: 15,
        marginRight:10,
        marginLeft:10,
    },
    textInput:{
        fontSize:18,
        color:AppColors.black,
        fontFamily: Platform.OS === 'android' ? "monospace" : "Avenir-Roman",
        marginLeft: 20,
        flex:1,
    },
})
export default AppTextInput;