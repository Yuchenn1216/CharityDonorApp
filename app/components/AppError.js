import React from 'react';

import { Text,StyleSheet, Platform,View } from 'react-native';

function AppError({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {children} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
    },
    text:{
        fontSize:15,
        color:"red",
        fontFamily: Platform.OS === 'android' ? "monospace" : "Avenir-Roman"
    },
})


export default AppError;