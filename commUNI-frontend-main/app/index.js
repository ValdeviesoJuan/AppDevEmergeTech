import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, SplashScreen } from 'expo-router'; // Import useRouter for navigation
import styles from '../styles/styles'; // Import styles
import logo from '../assets/communi-logo.png'; // Path to logo file
import { useFonts } from 'expo-font';


const Index = () => {
  const router = useRouter(); // Initialize router


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <LinearGradient
      colors={['#E8A0A0', '#A0C4E8']}
      style={styles.gradientContainer}
    >
      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image source={logo} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>CommUNI</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Connect, Discover, Engage: {'\n'}Your Campus Community Awaits!
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Log In Button */}
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => router.push('/login')} // Navigate to Register
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* Create Account Button */}
          <TouchableOpacity
            style={[styles.button, styles.createButton,]}
            onPress={() => router.push('/register')} // Navigate to Register
          >
            <Text style={styles.buttonTextDark}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Index;
