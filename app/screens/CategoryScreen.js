import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, FlatList,Platform } from 'react-native';
import AppScreen from '../components/AppScreen';
import AppColors from '../config/AppColors';
import AppLogo from '../components/AppLogo';
import AppCategory from '../components/AppCategory';
import DataManager from '../config/DataManager';
import {useNavigation} from '@react-navigation/native'
import AppText from '../components/AppText';

//the category buttons we want to display
const categories = [
  { label: 'Environment', value: 1, iconImg: require('../assets/environment.png') },
  { label: 'Healthcare', value: 2, iconImg: require('../assets/disease.png') },
  { label: 'Research', value: 3, iconImg: require('../assets/research.png') },
  { label: 'Children', value: 4, iconImg: require('../assets/children.png') },
  { label: 'Scholarhip', value: 5, iconImg: require('../assets/scholarship.png') },
  { label: 'Animal', value: 6, iconImg: require('../assets/kangaroo.png') },
];

const getCharitiesByCategory = (categoryLabel) => {
  //create a DataManager object so we can access the methods and arrays
  const DataManagerInstance = DataManager.getInstance();
  //get user id, we have set the user id in when user loggin
  const userId = DataManagerInstance.getUserID();
  //get all charities of this user
  const charities = DataManagerInstance.getCharities(userId);
  //filter all the charities and only return the charities have the category label
  // equals to the category button user has clicked
  return charities.filter((charity) => charity.category === categoryLabel);
};

function CategoryScreen({ navigation }) {

  //this function will pass the filtered charities to CharityByCategory page
    const handleCategoryClick = (categoryLabel) => {
      const filteredCharities = getCharitiesByCategory(categoryLabel); 
      //console.log(JSON.stringify(filteredCharities, null, 2));
      navigation.navigate('CharityByCategory', { charities: filteredCharities},);
    };

  return (
    <AppScreen style={styles.container}>

      <View style={styles.headerContainer}>
          <AppText style={styles.text} >Browse By Categories</AppText>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          keyExtractor={(category) => category.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategoryClick(item.label)}>
                <AppCategory image={item.iconImg} label={item.label} />
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primaryColor,
    marginTop: 0,
    flex: 1,
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
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default CategoryScreen;
