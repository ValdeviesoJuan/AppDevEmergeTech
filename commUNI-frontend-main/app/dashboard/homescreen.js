import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const HomeScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const { userData, selectedInterests } = route.params || {};
  const parsedUserData = userData ? JSON.parse(userData) : {};
  const firstName = parsedUserData.firstName;
  const lastName = parsedUserData.lastName;
  const fullName = `${firstName} ${lastName}`;
  const yearlevel = parsedUserData.yearlevel;
  const [profilePicture, setProfilePicture] = useState(parsedUserData.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');

  console.log('userData:', userData);
  console.log('parsedUserData:', parsedUserData);
  console.log(firstName);
  console.log(parsedUserData.firstName);

  const [posts, setPosts] = useState([
    {
      id: "1",
      user: "AI Pioneers",
      time: "15 mins ago",
      content: "Excited to announce our upcoming webinar on Machine Learning trends in 2024! Join us to explore cutting-edge advancements and network with industry experts.",
      image: "https://picsum.photos/400/200?random=1",
      likes: 13,
      comments: [],
      likedByUser: false,  // Initialize likedByUser
    },
    {
      id: "2",
      user: "Tech Innovators Guild",
      time: "1 hr ago",
      content: "Our latest blog post dives into the future of web development. Discover the new frameworks and tools that will shape the industry in 2025.\n\nCheck out: https://www.techinnovators.com",
      likes: 147,
      comments: ["Can't wait!", "Good luck everyone!"],
      likedByUser: false,  // Initialize likedByUser
    },
    {
      id: "3",
      user: "Fourth Wing Club",
      time: "2 hours ago",
      content: "Violet and Liam's letters",
      image: "https://i.ibb.co/S5sRvTG/your-image.jpg",  // Correct image import
      likes: 352,
      comments: ["Sounds fun!", "I'm joining!"],
      likedByUser: false,  // Initialize likedByUser
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.log("User canceled image picker");
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        console.log("No image selected");
        return;
      }

      setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  // const handleAddPost = () => {
  //   if (newPost.trim() === "" && !selectedImage) return;
  //   const newPostData = {
  //     id: Date.now().toString(),
  //     user: fullName,
  //     time: "Just now",
  //     content: newPost,
  //     image: selectedImage,
  //     likes: 0,
  //     comments: [],
  //     likedByUser: false,
  //   };
  //   setPosts([newPostData, ...posts]);
  //   setNewPost("");
  //   setSelectedImage(null);
  // };

  const handleAddPost = async () => {
    if (newPost.trim() === "" && !selectedImage) return;

    const newPostData = {
      id: Date.now().toString(),  // This ensures a unique id
      user: fullName,
      content: newPost,
      image: selectedImage,
      likes: 0,
      comments: [],
      likedByUser: false,
    };

    // Save the post to the backend database
    try {
      const response = await fetch('http://10.0.2.2:5003/savePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: parsedUserData.email, // Assuming userEmail is used for identification
          post: newPostData,
        }),
      });

      if (response.ok) {
        // Successfully saved the post to the database
        // Optionally fetch the updated posts here (if needed)

        // Update the local state (or you can directly fetch the posts again)
        setPosts([newPostData, ...posts]);
        setNewPost("");
        setSelectedImage(null);
      } else {
        console.error("Error saving post:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
            ...post,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          }
          : post
      )
    );
  };

  const getRandomProfileImage = (id) => {
    return `https://picsum.photos/seed/${id}/50`;
  };

  const myProfileImage = profilePicture;

  return (
    <View style={styles.homeContainer}>

      <View style={styles.homeheader}>
        <Image source={require('../../assets/communi-styled.png')} style={styles.communilogo}></Image>
      </View>
      <View style={styles.postInputContainer}>
        <Image
          source={{ uri: myProfileImage }}
          style={styles.avatar}
        />
        <TextInput
          style={styles.postInput}
          placeholder="Share something..."
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="images" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: item.user === fullName ? myProfileImage : getRandomProfileImage(item.id) }}
                style={styles.postAvatar}
              />
              <View>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons
                  name={item.likedByUser ? "heart" : "heart-outline"}
                  size={20}
                  color="red"
                  accessibilityLabel="Like button"
                />
                <Text>{item.likes} Likes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;