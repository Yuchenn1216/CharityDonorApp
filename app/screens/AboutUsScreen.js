import React from 'react';
import { View, StyleSheet} from 'react-native';
import AppText from '../components/AppText';
import AppColors from '../config/AppColors';
import AppScreen from '../components/AppScreen';

function AboutUsScreen(props) {
    return (
        <AppScreen style={styles.container}>
            <View style={styles.headerContainer}>
                <AppText style={styles.header} >About Us</AppText>
            </View>
            <View style={styles.textContainer}>
                <AppText>CharitEase, the revolutionary charity app created by Yuchen Han. Released in May 2023, our app puts the power of philanthropy in your hands. With CharitEase, users can not only explore and donate to existing charities but also create their own charitable initiatives. Additionally, our app allows you to effortlessly update and delete charities, ensuring flexibility and transparency in your giving journey. Join us and make a difference today.</AppText>
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:AppColors.primaryColor,
        marginTop:0,
    },
    headerContainer:{
        marginTop:50,
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    header:{
        fontSize:20,
        fontWeight:"bold",
    },
    textContainer:{
        marginHorizontal:20,
    }
})

export default AboutUsScreen;