import React, { useState } from 'react';
import { View, StyleSheet,TouchableWithoutFeedback,Modal, Button,TouchableOpacity,FlatList } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppText from './AppText';
import AppColors from '../config/AppColors';
import AppScreen from './AppScreen';
import AppButton from './AppButton';
import AppPickerItem from './AppPickerItem';

function AppPicker({data,icon, placeholder,selectedItem,onSelectItem}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <>
    <TouchableWithoutFeedback onPress= {() => setModalVisible(true)}>
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={25}/>}
            <AppText style={styles.text}>{selectedItem? selectedItem.label : placeholder}</AppText>
            <MaterialCommunityIcons name="chevron-down" size={25}/>
        </View>
    </TouchableWithoutFeedback>

    <Modal visible={modalVisible} animationType='slide'>
        <AppScreen style={styles.modalContainer} >
             <Button title="Close" style={styles.button} onPress= {() => setModalVisible(false)} />
             <FlatList
                 data={data}
                 keyExtractor={item => item.value.toString()}
                 renderItem = {({item}) => 
                 <AppPickerItem
                     onPress={()=> {
                        setModalVisible(false);
                        onSelectItem(item);
                     }
                    }
                     label={item.label}
                     iconImg={item.iconImg}
                     />}
            />
        </AppScreen>
    </Modal>
    
    </>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.white,
        borderWidth: 2,
        flexDirection: 'row',
        borderRadius: 25, 
        padding: 10,
        marginVertical: 15,
        marginRight:10,
        marginLeft:10,
    },
    text:{
        fontSize:18,
        marginLeft:5,
        flex:1,
    },

})

export default AppPicker;