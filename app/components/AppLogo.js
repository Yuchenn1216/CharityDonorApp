import React from 'react';
import { View,Image,StyleSheet} from 'react-native';

function AppLogo({style}) {
    return (
        <View style={[styles.logoContainer,style]}>
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        height:40,
        width:200,
        marginTop:30,
    },
    
})

export default AppLogo;