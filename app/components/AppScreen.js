import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


function AppScreen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen,style]}>
            <View style={styles.paddingView}>
                {children}
            </View>
        </SafeAreaView>

    );
}
 
const styles = StyleSheet.create({
    screen:{
        flex:1,
       // marginTop: Constants.statusBarHeight,
       marginTop:0,
        marginBottom:0,
    },
    paddingView:{
        flex:1,
    }
})

export default AppScreen;
