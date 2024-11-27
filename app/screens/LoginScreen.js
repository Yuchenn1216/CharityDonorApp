import React from 'react';
import { StyleSheet,ImageBackground,View,TouchableOpacity,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {Formik} from 'formik';
import * as Yup from 'yup';

import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppError from '../components/AppError';
import DataManager from '../config/DataManager';

//define validation schema using Yup
const schema = Yup.object().shape(
    {
        email: Yup.string().required().email().label("Email"),
        password:  Yup.string().required().min(4).max(8).label("Password"),
    }
);

//validate user login credentials, if length>0 means we can find the user in dataManager with same email input
const validateUser = ({email, password}) => {
    let commonData = DataManager.getInstance();
    return(
        commonData.users.filter((user) => user.email === email && user.password === password).length>0
        );
}

//get user data based on email
const getUser = ({email}) => {
    let commonData = DataManager.getInstance();
    return commonData.users.find((user) => user.email === email);
}
//when login, create a user and set the userid. 
//After using this function, we can access all charities related to this user based on this userid
const createUser = ({email}) => {
    let commonData = DataManager.getInstance();
    let userId = getUser({email}).id;
    commonData.setUserId(userId);
}

function LoginScreen({navigation}) {
    return (
        <AppScreen>
            <ImageBackground 
            source={require("../assets/backgroundImage.png")}
            style={styles.background}>

                <View style={styles.logoContainer}>
                     <Image style={styles.logo} source={require('../assets/logo.png')}/>
                </View>
                
                <Formik
                    initialValues={{email:'', password:'',}}
                    onSubmit = {(values, {resetForm}) => {
                        if(validateUser(values)){
                            console.log(getUser(values))
                            resetForm(); 
                            createUser(values);
                            navigation.navigate("HomeAuth",{
                                screen:"HomeTab",
                                params:{
                                    screen:"Home",
                                    params:{
                                        paramsEmail:values.email,
                                        paramsName:getUser(values).name,
                                    },
                                }
                            });
                        } else {
                            resetForm();
                            alert("Invalid Login Details")
                        }
                    }}
                    validationSchema={schema}
                    >
                {({values,handleChange, handleSubmit,errors,setFieldTouched,touched}) => (
                    <>
                  <View style={styles.inputContainer} >
                    <AppTextInput 
                    icon="email" 
                    placeholder='Email Address'
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    value={values.email}
                    onBlur = {() => setFieldTouched("email")}
                    onChangeText = {handleChange("email")}
                    />
                   {touched.email && <AppError>{errors.email}</AppError>}

                    <AppTextInput 
                    icon="lock" 
                    placeholder='Password'
                    autoCapitalize="none"
                    secureTextEntry
                    textContentType="password"
                    autoCorrect={false}
                    value={values.password}
                    onBlur = {() => setFieldTouched("password")}
                    onChangeText = {handleChange("password")}
                    />  
                    {touched.password &&<AppError>{errors.password}</AppError>}
                </View>    

                <AppButton title="Login" style={styles.buttons} onPress={handleSubmit}/>
                 </>
                )}

                </Formik>

                <View style={styles.registerTextContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                         <View style={styles.registerTextRow}>
                            <AppText>Don't have an account? </AppText>
                            <AppText style={styles.registerText}>Sign Up</AppText>
                         </View>
                     </TouchableOpacity>
                </View>

            </ImageBackground>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
    },
    logoContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:260,
        marginBottom:30,
    },

    logo:{
        height:40,
        width:200,
    },
    WelcomeText:{
        fontSize:30,
        fontWeight:'bold',
        fontStyle:'italic',
    },
 
    buttons:{
        marginVertical: 10,
        marginRight:10,
        marginLeft:10,
    },
    registerTextContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom:20,
    },
    registerText:{
        fontWeight:'bold',
        textDecorationLine:'underline',
    },
    registerTextRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },  
})
export default LoginScreen;