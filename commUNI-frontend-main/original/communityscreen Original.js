// CommunityScreen.js
import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles"; // Adjust this path as needed
import images from "../../assets/images"; // Import the images object


const communityData = [
  // { id: 1, name: "AI Pioneers", tags: ["Artificial Intelligence", "Machine Learning"], logo: images.aipioneers },
  { id: 1, name: "Blockchain Builders", tags: ["Blockchain", "Crypto"], logo: images.blockchainBuilders },
  { id: 2, name: "AI Coders Hub", tags: ["AI", "Coding", "Projects"], logo: images.aiCodersHub },
  { id: 3, name: "Data Science Hub", tags: ["Data Science", "Analytics"], logo: images.dataScienceHub }, //
  { id: 4, name: "CyberSec Experts", tags: ["Cybersecurity", "Ethical Hacking"], logo: images.cyberSecExperts },
  { id: 5, name: "Cloud Heroes", tags: ["Cloud Computing", "AWS", "Azure"], logo: images.cloudHeroes },
  { id: 6, name: "Tech Innovators Guild", tags: ["Technology", "AI", "Web Dev"], logo: images.techInnovatorsGuild }, //
  { id: 7, name: "Startup Founders", tags: ["Innovation", "Business"], logo: images.startupFounders },
  { id: 8, name: "Open Source Contributors", tags: ["Open Source", "GitHub"], logo: images.openSourceContributors },
  { id: 9, name: "AI Think Tank", tags: ["Artificial Intelligence", "Deep Learning"], logo: images.aiThinkTank },
  { id: 10, name: "Grishaverse Fans", tags: ["Six of Crows", "Shadow and Bone", "Fantasy"], logo: images.grishaverseFans }, //
  { id: 11, name: "Fourth Wing", tags: ["Fourth Wing", "Fantasy", "Young Adult"], logo: images.fourthWing }, //
  { id: 12, name: "Potterheads", tags: ["Harry Potter", "Wizardry", "Fantasy"], logo: images.potterheads },
  { id: 13, name: "Literature", tags: ["Fantasy", "Dystopia", "Literature"], logo: images.literature },
  { id: 14, name: "Game Developers", tags: ["Game Dev", "Unity", "Unreal"], logo: images.gameDevelopers },
  // { id: 15, name: "Literature", tags: ["Fantasy", "Dystopia", "Literature"], logo: images.literature },
  { id: 15, name: "AI Pioneers", tags: ["Artificial Intelligence", "Machine Learning"], logo: images.aipioneers },
];


const CommunityScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardPosition = new Animated.Value(0);

  const handleLike = () => {
    animateCard(true);
  };

  const handlePass = () => {
    animateCard(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const animateCard = (liked) => {
    const offset = liked ? 500 : -500;
    Animated.timing(cardPosition, {
      toValue: offset,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      cardPosition.setValue(0);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % communityData.length);
    });
  };

  return (
    <View style={styles.dashboardContainer}>
      {currentIndex < communityData.length ? (
        <Animated.View style={[styles.cardContainer, { transform: [{ translateX: cardPosition }] }]}>
          <ImageBackground
            source={communityData[currentIndex].logo}
            style={styles.cardImageBackground}
            imageStyle={styles.cardImage}
            onLoad={handleImageLoad}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{communityData[currentIndex].name}</Text>
              <View style={styles.cardTags}>
                {communityData[currentIndex].tags.map((tag, index) => (
                  <Text key={index} style={styles.cardTag}>
                    {tag}
                  </Text>
                ))}
              </View>
              {isImageLoading && (
                <ActivityIndicator size="large" color="white" style={styles.loader} />
              )}
              <View style={styles.cardButtons}>
                <TouchableOpacity onPress={handlePass} style={styles.button}>
                  <Ionicons name="close-circle" size={100} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike} style={styles.button}>
                  <Ionicons name="add-circle" size={100} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      ) : (
        <Text style={styles.noMoreText}>No more communities!</Text>
      )}
    </View>
  );
};

export default CommunityScreen;