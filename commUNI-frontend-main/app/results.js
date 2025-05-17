import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../styles/styles';

const ResultsScreen = () => {
  const router = useRouter();
  const { mbti } = useLocalSearchParams();

  // Map MBTI types to their descriptions
  const personalityDescriptions = {
    ENFP: {
      title: "Campaigner",
      subtitle: "ENFP-T",
      description: "You are enthusiastic, creative, and sociable free spirits who always find a reason to smile.",
    },
    ENTP: {
      title: "Debater",
      subtitle: "ENTP-T",
      description: "You are smart and curious thinkers who cannot resist an intellectual challenge.",
    },
    INFP: {
      title: "Mediator",
      subtitle: "INFP-T",
      description: "You are poetic, kind, and altruistic people, always eager to help a good cause.",
    },
    INFJ: {
      title: "Advocate",
      subtitle: "INFJ-T",
      description: "You are quiet and mystical, yet very inspiring and tireless idealists.",
    },
    ENFJ: {
      title: "Protagonist",
      subtitle: "ENFJ-T",
      description: "You are charismatic and inspiring leaders, able to mesmerize their listeners.",
    },
    ENTJ: {
      title: "Commander",
      subtitle: "ENTJ-T",
      description: "You are bold, imaginative, and strong-willed leaders, always finding a way – or making one.",
    },
    INTJ: {
      title: "Architect",
      subtitle: "INTJ-T",
      description: "You are imaginative and strategic thinkers, with a plan for everything.",
    },
    INTP: {
      title: "Logician",
      subtitle: "INTP-T",
      description: "You are innovative inventors with an unquenchable thirst for knowledge.",
    },
    ISFJ: {
      title: "Defender",
      subtitle: "ISFJ-T",
      description: "You are very dedicated and warm protectors, always ready to defend their loved ones.",
    },
    ISTJ: {
      title: "Logistician",
      subtitle: "ISTJ-T",
      description: "You are practical and fact-minded individuals, whose reliability cannot be doubted.",
    },
    ESFJ: {
      title: "Consul",
      subtitle: "ESFJ-T",
      description: "You are extraordinarily caring, social, and popular people, always eager to help.",
    },
    ESTJ: {
      title: "Executive",
      subtitle: "ESTJ-T",
      description: "You are excellent administrators, unsurpassed at managing things – or people.",
    },
    ESFP: {
      title: "Entertainer",
      subtitle: "ESFP-T",
      description: "You are spontaneous, energetic, and enthusiastic people – life is never boring around you.",
    },
    ESTP: {
      title: "Entrepreneur",
      subtitle: "ESTP-T",
      description: "You are smart, energetic, and very perceptive people, who truly enjoy living on the edge.",
    },
    ISFP: {
      title: "Adventurer",
      subtitle: "ISFP-T",
      description: "You are flexible and charming artists, always ready to explore and experience something new.",
    },
    ISTP: {
      title: "Virtuoso",
      subtitle: "ISTP-T",
      description: "You are bold and practical experimenters, masters of all kinds of tools.",
    },
  };

  const personality = personalityDescriptions[mbti] || {
    title: "Unknown",
    subtitle: "N/A",
    description: "Personality type not recognized.",
  };

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Your personality type is:</Text>
      <Text style={styles.testResultType}>{personality.title}</Text>
      <Text style={styles.testResultSubType}>{personality.subtitle}</Text>

      <Text style={styles.testIntro}>{personality.description}</Text>

      <TouchableOpacity
        style={styles.testButtonPrimary}
        onPress={() => router.push('/interests')}
      >
        <Text style={styles.testButtonText}>Choose your interests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testButtonSecondary}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.testButtonTextSecond}>Start Matching</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultsScreen;
