import React from 'react';
import {StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import AppText from './AppText';
import AppColors from '../config/AppColors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
//<Image source={image} style={styles.image}/>
function AppCard({image,title,subtitle,onSwipeLeft,onPress}) {
    return (
       
         <View style={styles.container}>
            {isFinite(image)? <Image source={image} style={styles.image}/> :<Image source={{uri: image}} style={styles.image}/>}
        </View>
          
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.otherColor,
        borderRadius:20,
        height:100,
        width:100,
        marginTop:10,
        marginBottom:20,
        overflow:"hidden",
        margin:5,
    },
    image:{
        borderRadius:20,
        height:100,
        width:"100%",
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        paddingLeft:20,
    },
    subtitle:{
        paddingLeft:20,
    }

})


export default AppCard;