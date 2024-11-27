import React from 'react';
import { TouchableOpacity,StyleSheet,Text,Image } from 'react-native';
import AppColors from '../config/AppColors';

function AppPickerItem({onPress,label,iconImg}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={iconImg} style={styles.image}/>
            <Text style={styles.text}>{label}</Text>     
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical: 10,
        marginTop:20,
        alignItems:"center",       
    },
    image:{
        height:25,
        width:25,
    },
    text:{
        color:AppColors.black,
        fontSize:16,
        marginTop:10,
        marginLeft:20,
        
    },
})
export default AppPickerItem;