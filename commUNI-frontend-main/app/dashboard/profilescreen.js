import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';


export default function ProfileScreen() {
  const router = useRouter();
  const route = useRoute();
  const { userData, selectedInterests, newPost } = route.params || {};
  const parsedUserData = userData ? JSON.parse(userData) : {};

  let processedInterests = selectedInterests;

  if (typeof selectedInterests === "string") {
    processedInterests = selectedInterests.split(",").map((selectedInterests) => selectedInterests.trim());
  }

  const [interestsArray, setInterestsArray] = useState([]);
  const userEmail = parsedUserData.email;
  const firstName = parsedUserData.firstName;
  const lastName = parsedUserData.lastName;
  const fullName = `${firstName} ${lastName}`;
  const department = parsedUserData.department;
  const program = parsedUserData.program;
  const yearlevel = parsedUserData.yearlevel;
  const [profilePicture, setProfilePicture] = useState(parsedUserData.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
  const [headerImage, setHeaderImage] = useState(parsedUserData.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts'); // Track active tab
  const [mediaItems, setMediaItems] = useState([]); // To store all media
  const [likedCommunitiesCount, setLikedCommunitiesCount] = useState(0);


  const getRandomProfileImage = (id) => {
    return `https://picsum.photos/seed/${id}/50`;
  };
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        newPost.id === id
          ? {
            ...newPost,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? newPost.likes - 1 : newPost.likes + 1,
          }
          : newPost
      )
    );
  };

  useEffect(() => {
    fetchUserImagesAndInterests();
    if (typeof selectedInterests === 'string') {
      setInterestsArray(selectedInterests.split(','));
    } else {
      setInterestsArray(selectedInterests || []);
    }
  }, [selectedInterests]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserPosts();
    }, [userData.email])
  );

  // useEffect(() => {
  //   fetchLikedCommunitiesCount(); // Call function to fetch count when ProfileScreen is loaded
  // }, []);


  const fetchLikedCommunitiesCount = async () => {
    try {
      const email = parsedUserData.email; // Replace with dynamic email of the logged-in user
      const response = await fetch(`http://10.0.2.2:5003/likedCommunitiesCount?email=${email}`); // Corrected to use email as a URL parameter
      console.log(email);
      if (!response.ok) {
        throw new Error('Failed to fetch liked communities count');
      }

      const data = await response.json();
      setLikedCommunitiesCount(data.count); // Assuming the backend sends { count: 10 }
    } catch (error) {
      console.error('Error fetching likedCommunitiesCount:', error);
    }
  };

  useEffect(() => {
    // Fetch liked communities count initially
    fetchLikedCommunitiesCount();

    // Poll every 5 seconds for updates
    const intervalId = setInterval(fetchLikedCommunitiesCount, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [parsedUserData.email]); // Dependencies include email if it changes dynamically


  const fetchUserImagesAndInterests = async () => {
    fetchUserPosts();

    try {
      const response = await fetch('http://10.0.2.2:5003/get-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsedUserData.email }),
      });

      const rawText = await response.text();
      try {
        const data = JSON.parse(rawText);
        if (data.status === 'ok') {
          setProfilePicture(data.user.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
          setHeaderImage(data.user.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');
          setInterestsArray(data.user.selectedInterests || []);
        } else {
          // Alert.alert('Error', data.message || 'Failed to fetch user data.');
        }
      } catch {
        console.error('Server returned invalid JSON:', rawText);
        Alert.alert('Error', 'Invalid server response.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'An error occurred while fetching user data.');
    }
  };

  const myProfileImage = profilePicture;

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5003/get-user-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsedUserData.email }),
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setPosts(data.posts); // Assuming the posts are returned as an array
      } else {
        console.log('Error fetching posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'An error occurred while fetching posts.');
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    router.replace('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const saveImages = async () => {
    try {
      const response = await fetch("http://<YOUR_BACKEND_URL>/update-profile-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsedUserData.email,
          profilePicture,
          headerImage,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Profile images updated successfully!");
      } else {
        alert("Error updating profile images: " + data.data);
      }
    } catch (error) {
      console.error("Error saving profile images:", error);
      alert("An error occurred while saving your images.");
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {/* Header */}
          <View style={styles.header}>
            <Image source={{ uri: headerImage }} style={styles.headerImage} />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.bio}>
              {program}{"\n"}{department}{"\n"}{yearlevel}
            </Text>
            <Text style={styles.communities}>{likedCommunitiesCount} communities joined</Text>

            {/* Followers and Following */}
            <View style={styles.followSection}>
              <View style={styles.followBox}>
                <Text style={styles.followNumber}>0</Text>
                <Text style={styles.followLabel}>Followers</Text>
              </View>
              <View style={styles.followBox}>
                <Text style={styles.followNumber}>0</Text>
                <Text style={styles.followLabel}>Following</Text>
              </View>
            </View>

            {/* Interests */}
            <View style={styles.tagsContainer}>
              {interestsArray.map((selectedInterests, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{selectedInterests}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({
                    pathname: '/editprofilescreen',
                    params: { userData, selectedInterests },
                  })
                }
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            {/* <View style={styles.tabsContainer}>
              <Text style={[styles.tabText, styles.activeTab]}>Posts</Text>
              <Text style={styles.tabText}>Media</Text>
            </View> */}
            {/* <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => handleTabChange('posts')}>
                <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTab]}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTabChange('media')}>
                <Text style={[styles.tabText, activeTab === 'media' && styles.activeTab]}>Media</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </>
      }

      data={activeTab === 'posts' ? posts : []}  // Only show posts when 'Posts' tab is active
      renderItem={({ item }) => {
        if (activeTab === 'posts') {
          return (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: myProfileImage }}
                  style={styles.postAvatar}
                />
                <View style={styles.postHeaderText}>
                  <Text style={styles.postTitle}>{fullName}</Text>
                  <Text style={styles.postTime}>
                    {item.time
                      ? formatDistanceToNow(new Date(item.time), { addSuffix: true })
                      : 'Unknown time'}
                  </Text>
                </View>
              </View>

              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>

              {item.image && (
                <Image source={{ uri: item.image }} style={styles.postImage} />
              )}

              <View>
                <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
                  <Ionicons
                    name={item.likedByUser ? "heart" : "heart-outline"}
                    size={20}
                    color="red"
                    accessibilityLabel="Like button"
                  />
                  <Text style={styles.likeText}>{item.likes} Likes</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }

        if (activeTab === 'media') {
          // Show the user's media
          return (
            <View style={styles.mediaContainer}>
              {/* Profile Image */}
              {profilePicture !== 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg' && (
                <Image source={{ uri: profilePicture }} style={styles.mediaImage} />
              )}
              {/* Header Image */}
              {headerImage !== 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg' && (
                <Image source={{ uri: headerImage }} style={styles.mediaImage} />
              )}
              {/* Posted Images */}
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.mediaImage} />
              )}
            </View>
          );
        }
      }}

      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    height: 150,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    padding: 15,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  name: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    // fontWeight: 'bold',
    marginVertical: 5,
  },
  bio: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
  communities: {
    fontFamily: "Inter-Regular",
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  followSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  followBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  followNumber: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    // fontWeight: 'bold',
  },
  followLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: '#555',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#e7e7f3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    fontFamily: "Inter-Regular",
    color: '#555',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: "#A2A8B0",
    opacity: 0.9,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTab: {
    color: '#333',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#333',
    paddingBottom: 5,
  },
  likeText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  postsSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderText: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    // fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  postSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: '#888',
  },
  postContent: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

