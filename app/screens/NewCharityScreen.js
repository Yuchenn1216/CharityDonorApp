import React,{useState} from 'react';
import { View,StyleSheet,Image,TouchableOpacity,Platform} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppError from '../components/AppError';
import AppScreen from '../components/AppScreen';
import AppPicker from '../components/AppPicker';
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';


//Values of AppPicker options
const categories =[
    {label:"Environment", value:1,iconImg:require('../assets/environment.png')},
    {label:"Disease", value:2,iconImg:require('../assets/disease.png')},
    {label:"Research", value:3,iconImg:require('../assets/research.png')},
    {label:"Children", value:4,iconImg:require('../assets/children.png')},
    {label:"Scholarship", value:5,iconImg:require('../assets/scholarship.png')},
    {label:"Animal", value:6,iconImg:require('../assets/kangaroo.png')},
];


function NewCharityScreen({navigation,route}) {
    //set the intial value for textinput,category picker and image picker
    const[name, setName] = useState("");
    const[description, setDescription]=useState("");
    const[category, setCategory] = useState("");
    const[image, setImage] = useState(null);

    //set the intial value of erros for each input, intital value are all null
    const[nameError, setNameError]=useState("");
    const[descriptionError, setDescriptionError]=useState("");
    const[categoryError, setCategoryError]=useState("");
    const[imageError, setImageError]=useState("");

    //access the image using image picker 
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!"); //ask for permission 
        return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();


        if (pickerResult.canceled === true) { //be able to cancel the image page
            return;
        }
        setImage({path: pickerResult.assets[0].uri}); //set the selected image by useState 
    }

    //if any input hasn't been added, doErrorCheck will return false
    //when click the add button, it will check if all input are there. 
    const doErrorCheck = () => {
        console.log(name,description,category.label);
        setNameError( name.length>0 ? "": "Please set a valid charity name");
        setDescriptionError(description.length>0 ? "": "Please write down a valid description");
        setCategoryError(category? "": "Please pick a category from the list" );
        setImageError(image? "": "Please pick an image");
        return ((name.length>0) && (description.length>0) && (category) && (image)? true: false)
    }

    const addCharity = async () =>{
        //create a DataManager object so we can access the methods and arrays
        let commonData = DataManager.getInstance(); 
        //get user id, we have set the user id in when user loggin
        let userId = commonData.getUserID(); 
       //get all charities of this user
        const charities = commonData.getCharities(userId); 
        const charityId = charities.length+1; //the next charity id is the number of charity plus 1
        //create a new charity object and assign value to its attributes
        const newCharity = {  
            userid: userId,
            charityid:charityId,
            title:name,
            subtitle:description,
            category:category.label,
            image: image.path,
        };
       // console.log(newCharity);
        commonData.addCharity(newCharity); 
        //Get all charities including the new added charity
        const newCharities = commonData.getCharities(userId);  
        //pass all the chatities to the AllCharityScreen
        navigation.navigate('AllCharities', { newCharities }); 
    };

    //if do error check successfully, reset all forms to empy 
    const resetForm = () => {
        setName("");
        setCategory("");
        setDescription("");
        setImage("");
    }


    return (
        <AppScreen style={styles.container}>
            <View style={styles.headerContainer}>
                <AppText style={styles.text} >Create a New Charity</AppText>
            </View>

            
            <AppTextInput
                icon="hand-heart"
                placeholder="Charity Name"
                autoCapitalize="none"
                textContentType="organizationName"
                value = {name}
                autoCorrect={false}
                onChangeText={(inputText) => setName(inputText)}
            /> 
            {nameError.length>0 ?<AppError>{nameError}</AppError> :<></>} 

            <AppPicker 
                selectedItem={category}
                onSelectItem = {item => setCategory(item)}
                data={categories} 
                icon="apps" 
                placeholder="Categories"
            />
            {categoryError.length>0 ?<AppError>{categoryError}</AppError> :<></>}

            <AppTextInput 
                icon="rename-box" 
                placeholder='Description'
                autoCapitalize="none"
                textContentType="none"
                value = {description}
                onChangeText={(inputText) => setDescription(inputText)}
                //multiline ={true}
                scrollEnabled={true}
                style={styles.descriptionContainer}
            />     
            {descriptionError.length>0 ?<AppError>{descriptionError}</AppError> :<></>}

            <TouchableOpacity style={styles.imageButton} onPress={openImagePickerAsync}>
                <MaterialCommunityIcons name="camera" size={40}/>
                {image && <Image source={{uri: image.path}} style={{height:80, width:80, marginLeft: 20,}}/>}
            </TouchableOpacity>

            {imageError.length>0 ? <AppError>{imageError}</AppError> :<></>}
                 
            <AppButton style={styles.buttons} title="Add Charity" onPress={() => { 
                //if no errors, we will add the new charity to the DataManager, 
                //otherwise, display errors on the screen
                        if(doErrorCheck()){ 
                            resetForm(); //call the function to reset all input value to empty 
                            addCharity();
                            
                        }
                     }}/>
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
        marginTop: Platform.OS === 'android' ? 80:30, 
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
    },
    buttons:{
        marginRight:10,
        marginLeft:10,
    },
    descriptionContainer:{
        height:150,
        alignItems:"flex-start",
        textAlignVertical:"top",
    },
    imageButton:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginBottom: 30,
    }
})

export default NewCharityScreen;