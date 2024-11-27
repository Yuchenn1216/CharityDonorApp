import React from 'react';
import { StyleSheet,TouchableOpacity,Text,View} from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';

function AppButton({title,style,onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button,style]}>
                <AppText style={styles.text}>{title}</AppText>
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:AppColors.secondaryColor,
        borderRadius:25,
        padding:15,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:AppColors.black,
        fontSize:20,
        fontWeight:'bold',
    }
    
})

export default AppButton;