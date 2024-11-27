import React , {useState} from 'react';
import {StyleSheet,View,Image,TouchableOpacity,Modal,Button} from 'react-native';
import AppText from './AppText';
import AppColors from '../config/AppColors';
import AppScreen from './AppScreen';

//<Image source={image} style={styles.image}/>
function AppCard({image,title,description}) {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        {isFinite(image)? <Image source={image} style={styles.image}/> :<Image source={{uri: image}} style={styles.image}/>}
                        <AppText style={styles.title}>{title}</AppText>
                    </View>
                </View> 
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
            <AppScreen>
                <Button title="Close" onPress={() => setModalVisible(false)}/>
                <View style={styles.headerContainer}>
                    <AppText style={styles.header} >More info</AppText>
                </View>

                <View style={styles.textContainer}>
                    <AppText>{description}</AppText>
                </View>
            </AppScreen> 
        </Modal>

        {/* <Menu>
            <MenuTrigger>
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions>
            <MenuOption onSelect={() => handleMenuSelect('delete')} text="Delete" />
            <MenuOption onSelect={() => handleMenuSelect('edit')} text="Edit" />
            <MenuOption text="Cancel" />
            </MenuOptions>
      </Menu> */}
       

        </>

// </Swipeable>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.otherColor,
        borderRadius:20,
        height:180,
        marginTop:10,
        marginBottom:0,
        overflow:"hidden",
    },
    image:{
        borderRadius:20,
        height:150,
        width:"100%",
    },
   
    title:{
        fontWeight:"bold",
        fontSize:18,
        paddingLeft:20,
    },
    headerContainer:{
        marginTop:40,
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    header:{
        fontSize:20,
        fontWeight:"bold",
    },
    textContainer:{
        marginTop:5,
        marginHorizontal:10,
    }

})


export default AppCard;