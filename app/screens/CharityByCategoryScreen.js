import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity,Modal,Button,View,Image} from 'react-native';
import AppScreen from '../components/AppScreen';
import AppCard from '../components/AppCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import DataManager from '../config/DataManager';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppPicker from '../components/AppPicker';
import AppColors from '../config/AppColors';
import AppError from '../components/AppError';
import * as ImagePicker from 'expo-image-picker';

//the categories we need to display in editModal page
const categories =[
    {label:"Environment", value:1,iconImg:require('../assets/environment.png')},
    {label:"Disease", value:2,iconImg:require('../assets/disease.png')},
    {label:"Research", value:3,iconImg:require('../assets/research.png')},
    {label:"Children", value:4,iconImg:require('../assets/children.png')},
    {label:"Scholarship", value:5,iconImg:require('../assets/scholarship.png')},
    {label:"Animal", value:6,iconImg:require('../assets/kangaroo.png')},
];

function CharityByCategoryScreen({ navigation, route }) {
  //for setting modal visible, intitally the modal page is invisible  
  const [modalVisible, setModalVisible] = useState(false);

 //for deleting option
  const allCharities = route.params.charities; //get all charities of this categorty by accepting the values passed from Category page
  const [filteredCharities, setFilteredCharities] = useState(allCharities); //before deleting, intial value of filteredCharities is all charities of this categorty
  
  //define a function to handle deleteing 
  const deleteCharity = (charityID) => {
    const commonData = DataManager.getInstance();
    const userID = commonData.getUserID();
    commonData.deleteCharity(charityID, userID); // find the charity with the same charityID and userID and delete it

    // Update the filtered charities by removing the deleted charity
    setFilteredCharities((prevCharities) =>
      prevCharities.filter((charity) => charity.charityid !== charityID)
    );
  };

  //For editing option
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [selectedCharityId, setSelectedCharityId] = useState(null);
  const [selectedCharityUserId, setSelectedCharityUserId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedSubtitle, setUpdatedSubtitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [initialCategory,setInitialCategory] = useState("")

  const handleEditCharity = (charity) => {
    setSelectedCharity(charity);
    setSelectedCharityId(charity.charityid)
    setSelectedCharityUserId(charity.userid)
    setUpdatedTitle(charity.title);
    setUpdatedSubtitle(charity.subtitle);
    setUpdatedImage(charity.image);
    setUpdatedCategory({label:charity.category});
    setInitialCategory({label:charity.category});
    setModalVisible(true);
  };

  const updateCharity = async () => {
    let commonData = DataManager.getInstance();
    let userId = commonData.getUserID();
  
    const updatedCharity = {
      userid: selectedCharityUserId,
      charityid: selectedCharityId,
      title: updatedTitle,
      subtitle: updatedSubtitle,
      category: updatedCategory.label,
      image: updatedImage,
    };
  
    commonData.addCharity(updatedCharity);
  
    const charitiesByCategory = commonData.getCharitiesByCategory(
        selectedCharityUserId,
        updatedCharity.category
      );
      setFilteredCharities(charitiesByCategory);

    setModalVisible(false); //After editing is finsihed, close the modal screen
};

//image picker
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();


    if (pickerResult.canceled === true) {
        return;
    }
    setUpdatedImage(pickerResult.assets[0].uri);
}

    const[nameError, setNameError]=useState("");
    const[descriptionError, setDescriptionError]=useState("");
    const[categoryError, setCategoryError]=useState("");
    const[imageError, setImageError]=useState("");

    const doErrorCheck = () => {
        //console.log(name,description,category.label);
        setNameError( updatedTitle.length>0 ? "": "Please set a valid charity name");
        setDescriptionError(updatedSubtitle.length>0 ? "": "Please write down a valid description");
        setCategoryError(updatedCategory? "": "Please pick a category from the list" );
        setImageError(updatedImage? "": "Please pick an image");
        return ((updatedTitle.length>0) && (updatedSubtitle.length>0) && (updatedCategory) && (updatedImage)? true: false)
    }
  
  return (
    <MenuProvider>
      <AppScreen style={styles.container}>
        <FlatList
          data={filteredCharities.slice().reverse()}
          keyExtractor={(charity) => charity.charityid.toString()}
          renderItem={({item}) => (
            <>
              <Menu>
                <MenuTrigger style={styles.triggerContainer}>
                  <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                </MenuTrigger>

                <MenuOptions customStyles={menuContainer}>
                  <MenuOption onSelect={() => deleteCharity(item.charityid)} text="Delete" />
                  <MenuOption onSelect={() => handleEditCharity(item)} text="Edit" />
                  <MenuOption text="Cancel"/>
                </MenuOptions>
              </Menu>

              <AppCard image={item.image} title={item.title} description={item.subtitle} />
            </>
          )}
        />

      {/* Modal screen for editing option, similar to new Charity screen */}
      {/*the initial value of these form are the name,category and description of charity which we're gonna edit */}
        <Modal visible={modalVisible} animationType="slide">
            <AppScreen style={styles.editModalContainer}>
              <Button title="Close" onPress={() => setModalVisible(false)}/>

              <View style={styles.textContainer}>
                  <AppText style={styles.text} >Update Your Charity</AppText>
              </View>

              <AppTextInput
                  icon="hand-heart"
                  placeholder="Charity Name"
                  autoCapitalize="none"
                  textContentType="organizationName"
                  value = {updatedTitle} 
                  autoCorrect={false}
                  onChangeText={(inputText) => setUpdatedTitle(inputText)}
              /> 
              {nameError.length>0 ?<AppError>{nameError}</AppError> :<></>}
              
              <AppPicker 
                  selectedItem={updatedCategory}
                  onSelectItem = {item => setUpdatedCategory(item)}
                  data={categories} 
                  icon="apps" 
                  placeholder= "Category"
              />
              {categoryError.length>0 ?<AppError>{categoryError}</AppError> :<></>}
          
              <AppTextInput 
                  icon="rename-box" 
                  placeholder='Description'
                  autoCapitalize="none"
                  textContentType="none"
                  value = {updatedSubtitle} 
                  onChangeText={(inputText) => setUpdatedSubtitle(inputText)}
                  //multiline ={true}
                  scrollEnabled={true}
                  style={styles.descriptionContainer}
              />    
              {descriptionError.length>0 ?<AppError>{descriptionError}</AppError> :<></>} 

              <TouchableOpacity style={styles.imageButton} onPress={openImagePickerAsync}>
                  <MaterialCommunityIcons name="camera" size={40}/>
                  {typeof updatedImage === 'number' ? ( <Image source={updatedImage} style={styles.image}/> )
                  :<Image source={{uri: updatedImage}} style={styles.image} />}
              </TouchableOpacity>
              {imageError.length>0 ? <AppError>{imageError}</AppError> :<></>}
                  
                 
              <AppButton style={styles.buttons} title="Update Charity" onPress={async() => { 
                          if(doErrorCheck()){ //validate the input value before doing any actions
                            deleteCharity(selectedCharityId);
                            updateCharity();
                          }
                     }}/>
            </AppScreen>
        </Modal>
        
      </AppScreen>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  headerContainer:{
    //marginTop: Platform.OS === 'android' ? 80:20, 
    marginTop:0,
    marginBottom:20,
    alignItems:'center',
    justifyContent:'center',
},
text:{
    fontSize:20,
    fontWeight:"bold",
},
  triggerContainer: {
    flexDirection: 'row-reverse',
    marginRight: 10,
    marginTop: 10,
  },
  editModalContainer:{
    flex:1,
    backgroundColor:AppColors.primaryColor,
    marginTop:0,
},
textContainer:{
    marginTop:40,
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
},
image:{
  height:80,
  width:80, 
  marginLeft: 20

}
});

const menuContainer = {
  optionsContainer: {
    width: 90,
    height:100,
    marginLeft: 280,
    marginTop: -70,
    alignItems:"center",
    justifyContent:"space-around",
    fontSize:16,
  },
 
};

export default CharityByCategoryScreen;