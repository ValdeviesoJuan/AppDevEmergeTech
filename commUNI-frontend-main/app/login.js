import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter, useNavigation } from 'expo-router'; // Use Link for navigation
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/styles'; // Import your styles
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state for login
  const navigation = useNavigation();
  const router = useRouter();


  const handleLogin = () => {
    // Validation: Ensure email and password are not empty
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true); // Set loading to true before making the request
    console.log('Email:', email);
    console.log('Password:', password);

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post('http://10.0.2.2:5003/login-user', userData)
      .then((res) => {
        setLoading(false); // Set loading to false once the response is received

        // Check if the login was successful
        if (res.data.status === 'ok') {
          const { userData, selectedInterests } = res.data;
          console.log("Log In button clicked! Here is the user data: ", userData, "and selected interests: ", selectedInterests);

          Alert.alert('Success', 'Logged in successfully!');
          navigation.navigate('dashboard', {
            userData: JSON.stringify(userData),
            selectedInterests: selectedInterests,
          });
        } else {
          // Display an invalid login error message
          Alert.alert('Error', 'Invalid email or password');
        }
      })
      .catch((err) => {
        setLoading(false); // Set loading to false in case of error
        console.error('Login Error:', err);
        Alert.alert('Error', 'Invalid email or password');
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {/* Logo */}
      <View style={styles.loginLogoContainer}>
        <Image source={require('../assets/star.png')} style={styles.loginLogo} />
      </View>

      {/* Title */}
      <Text style={styles.loginTitle}>Log In</Text>

      {/* Scrollable Login Form */}
      <ScrollView style={styles.loginFormContainer}>
        {/* Email Input */}
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginLabel}>Email or ID number</Text>
          <View style={styles.loginInputRow}>
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.loginInput}
              keyboardType="email-address" // Ensures correct keyboard type
              autoCapitalize="none" // Prevents auto-capitalization for email
            />
            {email ? (
              <MaterialCommunityIcons name="check-circle" size={20} color="green" />
            ) : (
              <MaterialCommunityIcons name="check-circle" size={20} color="#ccc" />
            )}
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginLabel}>Password</Text>
          <View style={styles.loginInputRow}>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.loginInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.loginForgotPassword}>
          <Text style={styles.loginForgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Or Login With */}
        <Text style={styles.loginOrText}>Or login with</Text>
        <View style={styles.loginSocialContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="facebook" size={32} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="apple" size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Register Redirect */}
      <Text style={styles.loginFooterText}>
        Don’t have an account?{' '}
        <Text style={styles.loginFooterLink} onPress={() => router.replace('register')} >
          Sign up
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;
