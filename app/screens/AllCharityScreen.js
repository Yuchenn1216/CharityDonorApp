import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppScreen from '../components/AppScreen';
import DataManager from '../config/DataManager';
import AppCard from '../components/AppCard';

function AllCharityScreen({ route }) {
  const { newCharities } = route.params;
  const [charityList, setCharityList] = useState([]);

  useEffect(() => {
    const loadCharities = async () => {
      if (newCharities) {
        setCharityList(newCharities);
      } else {
        const commonData = DataManager.getInstance();
        const userId = commonData.getUserID();
        const charities = commonData.getCharities(userId);
        setCharityList(charities);
      }
    };
    loadCharities();
  }, [newCharities]);

  return (
    <AppScreen style={styles.container}>
      <FlatList
        data={charityList.slice().reverse()}
        keyExtractor={(charity) => charity.charityid.toString()}
        renderItem={({ item }) => (
          <AppCard image={item.image} title={item.title} description={item.subtitle} />
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
});

export default AllCharityScreen;
