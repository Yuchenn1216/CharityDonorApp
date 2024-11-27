import React from 'react';
import { Image,View,StyleSheet,TouchableOpacity,FlatList,Platform } from 'react-native';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import {useNavigation} from '@react-navigation/native'
import AppColors from '../config/AppColors';
import AppListItem from '../components/AppListItem';
import AppLogo from '../components/AppLogo';
import DataManager from '../config/DataManager';
import AppImage from '../components/AppImage';

//get all charities related to this user
const getCharities = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserID();
    return commonData.getCharities(user);
}

function HomeScreen({navigation,route}) {
    //pass the charities list to the AllCharities screen
    const passCharities = () => {
        //get all chatities by calling getCharities function
        const allCharities = getCharities();
        //pass to the AllCharities screen
        navigation.navigate('AllCharities', { charities: allCharities});
    }

    const charityList = getCharities();
   // console.log(charityList);
    return (
        <AppScreen style={styles.container}>
          
            <View style={styles.logoContainer}>
                <AppLogo></AppLogo>
            </View>

            <View style={styles.profileContainer}>
                <Image source={require('../assets/profilePic.jpeg')} style={styles.profilePic}/>
                <View style={styles.textContainer}>
                    <AppText style={styles.name}>{route.params.paramsName}</AppText>
                    <AppText>{route.params.paramsEmail}</AppText>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <View style={styles.logoutContainer}>
                        <AppText>log out</AppText>
                     </View>
                </TouchableOpacity>
            </View>

            <View style={styles.AppListContainer}>
                 <AppListItem iconName="apps" title="Browse All Charities" onPress={() => passCharities()}/>
                <AppListItem iconName="information-outline" title="About Us"onPress={() => navigation.navigate("AboutUs")}/>
            </View>
   
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.primaryColor,
        marginTop:0,
        flex:1,
    },
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop: Platform.OS === 'android' ? 50:20,  
    },

    profileContainer:{
        flex:1,
        flexDirection:"column",
        padding:3,
        alignItems: "center", 
        marginTop:35,
             
    },
    profilePic:{
        height: 75,
        width: 75,
        borderRadius: 37,
    
    }, 
    textContainer:{
        alignItems: "center", 
        justifyContent:"center",   
    },
    name:{
        fontSize:20,
        fontWeight:"bold",
    },
    logoutContainer:{
     
    },
    AppListContainer:{
        flex:3,
        alignItems:'center',
        paddingTop:100,
    },
    charityContainer:{
        flex:5,
        marginVertical:15,
        marginHorizontal:0,
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',
    },

    
})

export default HomeScreen;