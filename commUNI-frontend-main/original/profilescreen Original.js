import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import router for navigation
import { useRoute } from '@react-navigation/native'; // Import useRoute to access params

export default function ProfileScreen() {
  const router = useRouter(); // Initialize the router
  const route = useRoute(); // Access the route object
  const { userData, selectedInterests } = route.params || {}; // Extract userData and selectedInterests from route.params
  const parsedUserData = userData ? JSON.parse(userData) : {}; // Parse userData back to an object

  const [interestsArray, setInterestsArray] = useState([]);
  const firstName = parsedUserData.firstName;
  const lastName = parsedUserData.lastName;
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    // Check if selectedInterests is a string and convert it to an array
    if (typeof selectedInterests === 'string') {
      setInterestsArray(selectedInterests.split(','));
    } else {
      setInterestsArray(selectedInterests || []);
    }
  }, [selectedInterests]); // Only rerun when selectedInterests changes

  const handleLogout = () => {
    // Logic for logging out can go here, such as clearing tokens or state
    console.log('Logging out...');
    router.replace('/login'); // Navigate to the login screen
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.ibb.co/yYCw8QC/unsplash-8u-ZPyn-Iu-r-Q.png' }}
          style={styles.headerImage}
        />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.ibb.co/W5ZQsnB/Unsplash-Avatars-0001s-0008-aiony-haust-so-K2-Bdjzrng-unsplash.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.bio}>
          Bachelor of Science of Information Technology{"\n"}CITC Department{"\n"}Senior
        </Text>
        <Text style={styles.communities}>15 communities joined</Text>

        {/* Followers and Following */}
        <View style={styles.followSection}>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>157</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>241</Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.tagsContainer}>
          {interestsArray.map((interest, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{interest}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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
        <View style={styles.tabsContainer}>
          <Text style={[styles.tabText, styles.activeTab]}>Posts</Text>
          <Text style={styles.tabText}>Reposts</Text>
          <Text style={styles.tabText}>Replies</Text>
          <Text style={styles.tabText}>Media</Text>
        </View>
      </View>

      <View style={styles.postsSection}>
        {/* <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/post-icon/50/50' }}
              style={styles.postAvatar}
            />
            <View>
              <Text style={styles.postTitle}>Fanny Price</Text>
              <Text style={styles.postSubtitle}>{fullName} · Senior · BSIT · 2 months</Text>
            </View>
          </View>
          <Text style={styles.postContent}>Test</Text>
        </View> */}

        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://i.ibb.co/W5ZQsnB/Unsplash-Avatars-0001s-0008-aiony-haust-so-K2-Bdjzrng-unsplash.png' }}
              style={styles.postAvatar}
            />
            <View>
              <Text style={styles.postTitle}>Fanny Price</Text>
              <Text style={styles.postSubtitle}>{fullName} · Senior · BSIT · 2 months ago</Text>
            </View>
          </View>
          <Text style={styles.postContent}>Look at this lovely view I took today!</Text>
          <Image
            source={{ uri: 'https://i.ibb.co/nwgZCGP/your-image.jpg' }}
            style={styles.postImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%', // Make the image take the full width of the post
    height: 250,   // Set the height of the image
    borderRadius: 10, // Optional: Adds rounded corners
    marginTop: 10,    // Adds spacing between the text and the image
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
    fontWeight: 'bold',
    marginVertical: 5,
  },
  bio: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
  communities: {
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  followLabel: {
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
    color: '#555',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row', // Keep buttons in a row
    marginVertical: 10,
    justifyContent: 'space-around', // Space out the buttons evenly
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(99, 94, 226, 0.8)', // #635EE2 with 80% opacity
    paddingVertical: 8, // Maintain compact padding
    paddingHorizontal: 20,
    borderRadius: 10, // Slightly rounded corners
    marginHorizontal: 1,
    alignItems: 'center', // Center the text
  },
  buttonText: {
    color: '#fff', // White text for contrast
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
  postsSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
  },
});