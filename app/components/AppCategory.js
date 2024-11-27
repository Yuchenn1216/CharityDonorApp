import React from 'react';
import { StyleSheet,Text,View,Image} from 'react-native';
import AppColors from '../config/AppColors';


function AppCategory({image,label,style}) {
    return (
            <View style={[styles.button,style,styles.shadowProp]}>
                <Image source={image} style={styles.image}/>
                <Text style={styles.text}>{label}</Text>  
            </View>
    );
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:AppColors.otherColor,
        borderRadius:20,
        height:110,
        width:110,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    image:{
        height:25,
        width:25,
    },
    text:{
        color:AppColors.black,
        fontSize:16,
        marginTop:10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 3,
    },
    
})

export default AppCategory;