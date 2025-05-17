import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import styles from '../styles/styles';
import { StyleSheet } from 'react-native';
const questionsData = [
  { id: 1, text: "You enjoy social gatherings." },
  { id: 2, text: "You often get excited by new ideas." },
  { id: 3, text: "You prefer working in groups rather than alone." },
  { id: 4, text: "You often feel energized by social interactions." },
  { id: 5, text: "You prefer to focus on the present rather than the future." },
  { id: 6, text: "You enjoy trying new things and taking risks." },
  { id: 7, text: "You tend to be more practical than imaginative." },
  { id: 8, text: "You often find yourself thinking about the future." },
  { id: 9, text: "You prefer to make decisions based on logic rather than feelings." },
  { id: 10, text: "You often find yourself analyzing situations objectively." },
  { id: 11, text: "You enjoy spending time with others more than being by yourself." },
  { id: 12, text: "You prefer a well-structured and organized environment." },
  { id: 13, text: "You are more comfortable with flexibility than with rules." },
  { id: 14, text: "You tend to be more spontaneous rather than planning ahead." },
  { id: 15, text: "You find it easy to make decisions based on logic and facts." },
  { id: 16, text: "You are more inclined to follow rules and traditions." },
  { id: 17, text: "You value social harmony and avoid conflict." },
  { id: 18, text: "You prefer to stay in your comfort zone rather than try new things." },
  { id: 19, text: "You are more focused on the details than the big picture." },
  { id: 20, text: "You tend to be more reserved in expressing your emotions." }
];

const QuestionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  // const { userData } = route.params || {};
  const { userData } = route.params || {};  // Extract userData from route params
  const parsedUserData = userData ? JSON.parse(userData) : {};  // Parse userData back to an object
  console.log("We are now in the Questions screen. Here is what was received: ");
  console.log(userData);
  console.log("We will be parsing this received data");
  console.log("Here is what the parsed data looks like: ", parsedUserData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = score;
    setAnswers(updatedAnswers);

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateMBTI = (answers) => {
    const E = answers.slice(0, 5).reduce((a, b) => a + b, 0);
    const S = answers.slice(5, 10).reduce((a, b) => a + b, 0);
    const T = answers.slice(10, 15).reduce((a, b) => a + b, 0);
    const J = answers.slice(15, 20).reduce((a, b) => a + b, 0);

    const extroverted = E > 15 ? "E" : "I";
    const sensing = S > 15 ? "S" : "N";
    const thinking = T > 15 ? "T" : "F";
    const judging = J > 15 ? "J" : "P";

    return extroverted + sensing + thinking + judging;
  };

  const handleTestSubmit = async () => {
    if (answers.length < questionsData.length) {
      console.error('All questions must be answered');
      alert('Please answer all questions before submitting.');
      router.push({
        pathname: 'personalitytestresults',
        params: { userData },  // Make sure you're passing the userData object, not just the string
      })
      return;
    }

    const result = calculateMBTI(answers);  // Calculate the MBTI result
    console.log('MBTI Result:', result);

    try {
      // Send the MBTI result to the backend to save it
      console.log('Sending MBTI result:', {
        email: parsedUserData.email,  // Use parsedUserData.email here
        mbtiResult: result
      });

      const response = await axios.post('http://10.0.2.2:5003/save-mbti', {
        email: parsedUserData.email,  // Send the user's email
        mbtiResult: result,           // Send the calculated MBTI result
      });

      if (response.data.status === 'ok') {
        // Navigate to the results screen with the MBTI result
        router.push({
          pathname: '/personalitytestresults',
          params: { mbti: result, userData },
        });
        console.log("We have just passed the data to the next screen. Here is what was passed: ");
        console.log(userData);
      } else {
        alert('Error saving MBTI result');
      }
    } catch (error) {
      console.error('Error saving MBTI result:', error);
      alert('Failed to save MBTI result');
    }
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {questionsData[currentQuestion].text}
      </Text>

      <View style={styles.questionbuttonContainer}>
        <TouchableOpacity
          style={styles.agreeButton}
          onPress={() => handleAnswer(5)}
        >
          <Text style={styles.answerText}>Agree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.neutralButton}
          onPress={() => handleAnswer(3)}
        >
          <Text style={styles.answerText}>Neutral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.disagreeButton}
          onPress={() => handleAnswer(1)}
        >
          <Text style={styles.answerText}>Disagree</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.questionCounter}>
        Question {currentQuestion + 1} of {questionsData.length}
      </Text>

      {/* Display the Finish button only when the last question is answered */}
      {currentQuestion === questionsData.length - 1 && answers.length === questionsData.length && (
        <TouchableOpacity style={styles.submitButton} onPress={handleTestSubmit}>
          <Text style={styles.submitButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionsScreen;