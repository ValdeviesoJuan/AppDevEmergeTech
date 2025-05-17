// CommunityScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Animated, Alert, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles"; // Adjust this path as needed
import images from "../../assets/images"; // Import the images object
import HomeScreen, { addNewPosts } from "./homescreen";
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const communityData = [
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
  { id: 15, name: "AI Pioneers", tags: ["Artificial Intelligence", "Machine Learning"], logo: images.aipioneers },
  { id: 16, name: "Creative Writing Club", tags: ["Fiction", "Poetry", "Writing"], logo: images.creativeWritingClub },
  { id: 17, name: "Meditation & Mindfulness", tags: ["Meditation", "Wellness", "Self-care"], logo: images.meditationClub },
  { id: 18, name: "Digital Media Creators", tags: ["Social Media", "Content Creation", "Marketing"], logo: images.digitalMediaCreators },
  { id: 19, name: "Cultural Exchange Society", tags: ["Language Exchange", "Culture", "Travel"], logo: images.culturalExchange },
  { id: 20, name: "Cybersecurity Warriors", tags: ["Cybersecurity", "Ethical Hacking", "Security"], logo: images.cybersecurityWarriors },
  { id: 21, name: "Climate Action Group", tags: ["Climate Change", "Sustainability", "Activism"], logo: images.climateAction },
  { id: 22, name: "Self-Development & Growth", tags: ["Self-development", "Mental Health", "Motivation"], logo: images.selfDevelopment },
  { id: 23, name: "Slam Poetry Collective", tags: ["Slam Poetry", "Poetry", "Spoken Word"], logo: images.slamPoetry },
  { id: 24, name: "Guitarists Collective", tags: ["Guitar", "Music", "Creativity"], logo: images.guitaristsCollective },
  { id: 25, name: "Sports Enthusiasts", tags: ["Basketball", "Football", "Sports"], logo: images.sportsEnthusiasts },
  { id: 26, name: "Yoga and Wellness Society", tags: ["Yoga", "Wellness", "Fitness"], logo: images.yogaWellness },
  { id: 27, name: "Film Buffs", tags: ["Films", "Cinema", "Movies"], logo: images.filmBuffs },
  { id: 28, name: "Tech Entrepreneurs", tags: ["Innovation", "Entrepreneurship", "Startups"], logo: images.techEntrepreneurs },
  { id: 29, name: "Healthy Living Club", tags: ["Nutrition", "Self-care", "Healthy Lifestyle"], logo: images.healthyLiving },
  { id: 30, name: "Environmental Science Club", tags: ["Environmental Science", "Sustainability", "Nature"], logo: images.environmentalScience },
  { id: 31, name: "Virtual Reality Pioneers", tags: ["Virtual Reality", "Tech", "Gaming"], logo: images.virtualRealityPioneers },
  { id: 32, name: "Self-Care Society", tags: ["Mental Health", "Self-care", "Relaxation"], logo: images.selfCareSociety },
  { id: 33, name: "Global Travel Network", tags: ["Travel", "Culture", "Language Exchange"], logo: images.globalTravel },
  { id: 34, name: "Creative Arts Collective", tags: ["Poetry", "Literature", "Art"], logo: images.creativeArtsCollective },
  { id: 35, name: "Food Lovers Club", tags: ["Food", "Sushi", "Culinary Arts"], logo: images.foodLoversClub },
  { id: 36, name: "Bollywood Dance Society", tags: ["Bollywood", "Dance", "Cultural Arts"], logo: images.bollywoodDance },
  { id: 37, name: "J-Pop & K-Pop Fans", tags: ["J-Pop", "K-Pop", "Music"], logo: images.jPopKPopFans },
  { id: 38, name: "Social Impact Network", tags: ["Social Development", "Activism", "Community Service"], logo: images.socialImpactNetwork },
  { id: 39, name: "Culinary Innovation Society", tags: ["Food", "Culinary Arts", "Innovation"], logo: images.culinaryInnovation },
  { id: 40, name: "Bhangra Dance Crew", tags: ["Bhangra", "Dance", "Culture"], logo: images.bhangraDanceCrew },
  { id: 41, name: "Startup Incubators", tags: ["Startups", "Innovation", "Business"], logo: images.startupIncubators },
  { id: 42, name: "Gospel Music Collective", tags: ["Gospel", "Music", "Community"], logo: images.gospelMusicCollective },
  { id: 43, name: "Music Production Club", tags: ["Music", "Production", "Sound"], logo: images.musicProductionClub },
  { id: 44, name: "Entrepreneurship Network", tags: ["Business", "Startups", "Innovation"], logo: images.entrepreneurshipNetwork },
  // { id: 45, name: "Photography Club", tags: ["Photography", "Arts", "Creativity"], logo: images.photographyClub },
  // { id: 46, name: "Digital Designers", tags: ["Design", "Tech", "Creative"], logo: images.digitalDesigners },
  // { id: 47, name: "Tech Startup Founders", tags: ["Startups", "Innovation", "Business"], logo: images.techStartupFounders },
  // { id: 48, name: "Young Adult Fiction Society", tags: ["Young Adult", "Literature", "Books"], logo: images.youngAdultFiction },
  // { id: 49, name: "Film Production Group", tags: ["Film Production", "Movies", "Cinema"], logo: images.filmProductionGroup }
];

const CommunityScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const { userData, selectedInterests } = route.params || {};
  const parsedUserData = userData ? JSON.parse(userData) : {};
  const email = parsedUserData.email;
  const firstName = parsedUserData.firstName;
  const mbtiType = parsedUserData.mbtiType || retrievedMbtiType || "";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardPosition = new Animated.Value(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track likeCount with state
  const [recommendedCommunities, setRecommendedCommunities] = useState([]);
  const [retrievedMbtiType, setRetrievedMbtiType] = useState(null); // Variable to store MBTI type
  const [retrievedInterests, setRetrievedInterests] = useState([]); // Array to store interests

  console.log("We are now in the Community screen");
  console.log("Here is the received data: ");
  console.log("User data: ", userData);
  console.log("Selected interests nasa ubos: ");
  console.log(selectedInterests);
  console.log("MBTI Type: ", mbtiType);

  // Fetch data when the component mounts
  useEffect(() => {
    getUserPreferences(email);
  }, []);

  useEffect(() => {
    console.log('mbtiType:', mbtiType);
    console.log('selectedInterests:', selectedInterests);
    // Calculate the matched communities whenever the mbtiType or selected interests change
    const matchedCommunities = matchCommunities(mbtiType, selectedInterests);
    setRecommendedCommunities(matchedCommunities);
  }, [mbtiType, selectedInterests]);

  const getUserPreferences = async (email) => {
    try {
      const response = await axios.post('http://10.0.2.2:5003/get-user-preferences', {
        email,
      });

      if (response.status === 200) {
        const { selectedInterests, mbtiType } = response.data.data;
        setRetrievedInterests(selectedInterests || []); // Store interests array
        setRetrievedMbtiType(mbtiType || null); // Store MBTI type
      } else {
        setError('Failed to fetch preferences');
      }
    } catch (error) {
      setError('Error fetching user preferences');
      console.error('Error fetching user preferences:', error);
    } finally {
      setLoading(false); // Done loading
    }
  };

  const matchCommunities = (mbtiType, selectedInterests) => {
    const matchedCommunities = [];

    const interests = [
      ...(typeof retrievedInterests === "string" ? retrievedInterests.split(",") : retrievedInterests || []),
      ...(typeof selectedInterests === "string" ? selectedInterests.split(",") : selectedInterests || [])
    ];

    // const interests = typeof selectedInterests === "string" ? selectedInterests.split(",") : selectedInterests;
    // const mbtiType = retrievedMbtiType || mbtiType; // Assign retrievedMbtiType to mbtiType if it exists
    const traits = mbtiType ? [mbtiType] : []; // Wrap mbtiType in an array if it's not undefined

    console.log("nanako sa matchCommunities function");
    console.log("Our selected interests look like this now: ");
    console.log(interests);

    communityData.forEach(community => {
      let score = 0;

      /// Check for MBTI match
      if (mbtiType && community.tags.includes(mbtiType)) {
        score += 2;
      }

      // Check for interest matches
      interests.forEach(interest => {
        if (community.tags.includes(interest.trim())) { // Use trim() for safe matching
          score += 1;
        }
      });

      if (score > 0) {
        matchedCommunities.push({ ...community, score });
      }
    });

    matchedCommunities.sort((a, b) => b.score - a.score);

    return matchedCommunities;
  };

  const renderCommunity = ({ item }) => (
    <View style={styles.communityCard}>
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.communityName}>{item.name}</Text>
      <Text style={styles.communityDescription}>{item.tags.join(', ')}</Text>
      <Text style={styles.communityScore}>Match Score: {item.score}</Text>
    </View>
  );

  const saveLikeCountToDatabase = (email, count) => {
    // Ensure userId and count are valid before making the request
    if (!email || count === undefined) {
      console.error('Invalid userId or count');
      return;
    }

    fetch('http://10.0.2.2:5003/updateLikeCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        likeCount: count,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Check if response is OK (status code 2xx)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Successfully saved like count
        console.log('Like count saved:', data);
        // AsyncStorage.setItem('dashboard/profilescreen', JSON.stringify(data));
      })
      .catch((error) => {
        // Handle errors (network errors, or response issues)
        console.error('Error saving like count:', error.message);
      });
  };

  const handleLike = () => {
    animateCard(true);
    setIsModalVisible(true);
    setLikeCount((prevLikeCount) => {
      const newLikeCount = prevLikeCount + 1;
      saveLikeCountToDatabase(email, newLikeCount); // Save the updated like count
      return newLikeCount;
    });
    console.log(likeCount); // Logs the updated likeCount
    console.log("Email: ", email); // Logs the updated likeCount
    console.log("Name: ", firstName); // Logs the updated likeCount
    console.log(userData); // Logs the updated likeCount
  };

  // const handleLikesUpdate = () => {
  //   addNewPosts();
  //   addNewNotifications();
  //   addNewMessages();
  // };

  // useEffect(() => {
  //   if (likeCount >= 5) {
  //     handleLikesUpdate();
  //     likeCount = 0; // Reset the counter
  //   }
  // }, [likeCount]);

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

  // return (
  //   <View style={styles.dashboardContainer}>
  //     {currentIndex < communityData.length ? (
  //       <Animated.View style={[styles.cardContainer, { transform: [{ translateX: cardPosition }] }]}>
  //         <ImageBackground
  //           source={communityData[currentIndex].logo}
  //           style={styles.cardImageBackground}
  //           imageStyle={styles.cardImage}
  //           onLoad={handleImageLoad}
  //         >
  //           <View style={styles.cardOverlay}>
  //             <Text style={styles.cardTitle}>{communityData[currentIndex].name}</Text>
  //             <View style={styles.cardTags}>
  //               {communityData[currentIndex].tags.map((tag, index) => (
  //                 <Text key={index} style={styles.cardTag}>
  //                   {tag}
  //                 </Text>
  //               ))}
  //             </View>
  //             {isImageLoading && (
  //               <ActivityIndicator size="large" color="white" style={styles.loader} />
  //             )}
  //             <View style={styles.cardButtons}>
  //               <TouchableOpacity onPress={handlePass} style={styles.button}>
  //                 <Ionicons name="close-circle" size={100} color="red" />
  //               </TouchableOpacity>
  //               <TouchableOpacity onPress={handleLike} style={styles.button}>
  //                 <Ionicons name="add-circle" size={100} color="green" />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </ImageBackground>
  //       </Animated.View>
  //     ) : (
  //       <Text style={styles.noMoreText}>No more communities!</Text>
  //     )}


  //     <Modal
  //       visible={isModalVisible}
  //       animationType="fade"
  //       transparent={true}
  //       onRequestClose={() => setIsModalVisible(false)}
  //     >
  //       <View style={modalStyles.modalOverlay}>
  //         <View style={modalStyles.modalContainer}>
  //           <Text style={modalStyles.modalText}>Request Sent</Text>
  //           <TouchableOpacity onPress={() => setIsModalVisible(false)} style={modalStyles.modalButton}>
  //             <Text style={modalStyles.modalButtonText}>OK</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );

  return (
    <View style={styles.dashboardContainer}>
      {currentIndex < recommendedCommunities.length ? (
        <Animated.View style={[styles.cardContainer, { transform: [{ translateX: cardPosition }] }]}>
          <ImageBackground
            source={recommendedCommunities[currentIndex].logo}
            style={styles.cardImageBackground}
            imageStyle={styles.cardImage}
            onLoad={handleImageLoad}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{recommendedCommunities[currentIndex].name}</Text>
              <View style={styles.cardTags}>
                {recommendedCommunities[currentIndex].tags.map((tag, index) => (
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
        <Text style={styles.noMoreText}>Keep swiping for more soon!</Text>
      )}

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalText}>Request Sent</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={modalStyles.modalButton}>
              <Text style={modalStyles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    // fontWeight: "bold",
    color: "#635EE2",
  },
  modalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#635EE2",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});


export default CommunityScreen;