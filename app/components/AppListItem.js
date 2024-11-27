import React from 'react';
import { TouchableOpacity,StyleSheet, View,Text} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppColors from '../config/AppColors';
import AppText from './AppText';


function AppListItem({iconName,title,onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container,styles.shadowProp]}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                                name= {iconName} 
                                size={25}
                                color={AppColors.black}
                                style={styles.icon}/>
                </View>

                <View style={styles.titleContainer}>
                    <AppText style={styles.title}>{title}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:AppColors.otherColor,
        marginHorizontal:20,
        marginBottom:15,
        borderRadius:25,
        height:55,
        width:350,
    },
    iconContainer:{
        justifyContent:'center',
        marginRight:15,
        marginLeft:15,
    },
    titleContainer:{
        justifyContent:'center',
    },
    title:{
        fontSize:18,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
})

export default AppListItem;