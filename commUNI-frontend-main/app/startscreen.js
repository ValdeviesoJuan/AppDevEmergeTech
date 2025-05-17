import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';  // Correct router
import { useRoute } from '@react-navigation/native';  // Correct hook for accessing route params
import styles from '../styles/startscreenstyles';  // Import your custom styles
import Interests from './interests';

const StartScreen = () => {
  const router = useRouter();
  const route = useRoute();  // Access the current route
  const { userData } = route.params || {};  // Extract userData from route params
  console.log("We are now in the Start Screen. Here is the received data: ");
  console.log(userData);

  // Check if userData exists
  if (!userData) {
    return (
      <View style={styles.testContainer}>
        <Text>Failed to load user data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.testContainer}>

      <Image
        source={require('../styles/starstars.png')} // Adjust the path as necessary
        style={styles.testImage} // Add style for the image
        resizeMode="contain" // Ensure it scales correctly
      />
      <View style={styles.testHeader}>
        <Text style={styles.testTitle}>Take the Personality Test</Text>
        <View style={styles.testSubtitleWrapper}>
          <Text style={styles.testSubtitle}>
            Answer a few quick questions to help us personalize your experience.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.testButtonPrimary}
        onPress={() => {
          // Pass userData to the next screen (QuestionsScreen)
          router.push({
            pathname: 'questions',  // The path to the questions screen
            params: { userData },  // Pass userData as params
          });
          console.log("We have just passed data to the Questions screen. Here is what was passed: ");
          console.log(userData);
        }}
      >
        <Text style={styles.testButtonText}>Take the test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testButtonSecondary}
        onPress={() => {
          // Pass userData to the next screen (Interests Screen)
          router.navigate({
            pathname: 'interests',  // The path to the interests screen
            params: { userData },  // Pass userData as params
          });
          console.log("We have just passed data to the Interests screen cus we skipped the Personality Test. Here is what was passed: ");
          console.log(userData);
        }}
      >
        <Text style={styles.testButtonTextSecondary}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
