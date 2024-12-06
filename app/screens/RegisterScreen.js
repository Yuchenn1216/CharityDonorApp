import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppError from '../components/AppError';
import AppScreen from '../components/AppScreen';
import DataManager from '../config/DataManager';

// define validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required().min(1).max(10).label("User Name"),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).max(10).label('Password'),
});

//check if the user email has already been registered. 
//Return true if no user has the same email with input email in DataManager
const validateUser = ({ email }) => {
  let commonData = DataManager.getInstance();
  return commonData.users.filter((user) => user.email === email).length <= 0;
};

//add user to the users array in DataManager
const addUser = ({ email, password, name }) => {
  let commonData = DataManager.getInstance();
  const userId = commonData.users.length + 1;
  const newUser = { //create a new user object, assign textinput values to its attributes
    id: userId,
    name: name,
    email: email,
    password: password,
  }; 
  commonData.addUser(newUser); //call the addUser function in DataManager to add the new user
};

const RegisterScreen = ({ navigation }) => {
  return (
    <AppScreen>
      <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.background}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>

        {/* Formik component for form handling */}
        <Formik
          initialValues={{ name: '', email: '', password: ''}}
          onSubmit={(values, { resetForm }) => {
            if (validateUser(values)) {
              resetForm();
              addUser(values);
              navigation.navigate('Login');
            } else {
              resetForm();
              alert('Email address is already registered');
            }
          }}
          validationSchema={schema}
        >
          {({ values, handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
            <>
              <View style={styles.inputContainer}>
                <AppTextInput
                  icon="account"
                  placeholder="Full Name"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  value={values.name}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('name')}
                  onChangeText={handleChange('name')}
                />
                {touched.name && <AppError>{errors.name}</AppError>}

                <AppTextInput
                  icon="email"
                  placeholder="Email Address"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={values.email}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                />
                {touched.email && <AppError>{errors.email}</AppError>}

                <AppTextInput
                  icon="lock"
                  placeholder="Password"
                  autoCapitalize="none"
                  textContentType="password"
                  value={values.password}
                  secureTextEntry
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                />
                {touched.password && <AppError>{errors.password}</AppError>}
                
              </View>

              {/* Press Register button will call the handleSubmit */}
              <AppButton title="Register" style={styles.buttons} onPress={handleSubmit} />

            </>
          )}
        </Formik>

        <View style={styles.LoginTextContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.LoginTextRow}>
              <AppText>Already have an account? </AppText>
              <AppText style={styles.LoginText}>Sign In</AppText>
            </View>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 30,
  },
  logo: {
    height: 40,
    width: 200,
  },
  buttons: {
    marginVertical: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  LoginTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  LoginText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  LoginTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
