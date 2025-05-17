import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import for image picking
import { useRouter } from 'expo-router'; // For navigation
import { useRoute } from '@react-navigation/native'; // For accessing route params

export default function EditProfileScreen() {
    const router = useRouter(); // Initialize router for navigation
    const route = useRoute(); // Access route params
    const { userData, selectedInterests } = route.params || {}; // Extract user data and interests
    const parsedUserData = userData ? JSON.parse(userData) : {}; // Parse user data from JSON

    // States
    const [profilePicture, setProfilePicture] = useState(
        parsedUserData.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg'
    );
    const [headerImage, setHeaderImage] = useState(
        parsedUserData.headerImage || 'https://i.ibb.co/2Yy9JM4/your-image.jpg'
    );
    // const [interests, setInterests] = useState(selectedInterests || []);

    const [interests, setInterests] = useState(selectedInterests && Array.isArray(selectedInterests) ? selectedInterests : []);


    console.log("Nanata sa Edit Profile Screen");
    console.log(userData);
    console.log(selectedInterests);
    // Static list of interests
    const interestList = [
        'AI', 'Cybersecurity', 'Data Science', 'Cloud Computing', 'Innovation',
        'Photography', 'Sports', 'Basketball', 'Skateboarding', 'Gymnastics',
        'Jiu-jitsu', 'Free diving', 'Running', 'Walking', 'Home workouts',
        'Gym', 'Mental health awareness', 'Self-care', 'Meditation', 'Skincare',
        'Self-development', 'Social development', 'Climate change', 'Voter rights',
        'Slam poetry', 'Poetry', 'Stand-up comedy', 'Guitarists', 'Singing',
        'Fortnite', 'Instagram', 'Spotify', 'TikTok', 'Theatre', 'Films',
        'Young Adult', 'Fantasy', 'Fiction', 'Literature', 'Reading', 'Harry Potter',
        'Potterhead', 'Dystopia', '90s kid', 'Travel', 'Language exchange',
        'Foodie tour', 'Café hopping', 'Gin & tonic', 'Sushi', 'Maggi',
        'Bollywood', 'Bhangra', 'Hip hop', 'K-Pop', 'J-Pop', 'Gospel',
        'Social justice', 'Social activism', 'Innovation', 'Tech startups',
        'Environmental science', 'Urban planning', 'Philosophy', 'Science fiction',
        'Youth empowerment', 'Community service', 'Political science', 'Civic engagement',
        'Health & wellness', 'Food science', 'Culinary arts', 'Cooking', 'Nutrition',
        'Sustainable living', 'Technology', 'Engineering', 'Architecture', 'Mathematics',
        'Physics', 'Chemistry', 'Physics education', 'Science education', 'STEM education',
        'Entrepreneurship', 'Freelance', 'Digital media', 'Photography', 'Creative arts'
    ];

    // Toggle interest selection
    // const toggleInterest = (interest) => {
    //     if (interests.includes(interest)) {
    //         setInterests(interests.filter((item) => item !== interest));
    //     } else if (interests.length < 10) {
    //         setInterests([...interests, interest]);
    //     } else {
    //         Alert.alert('Limit Reached', 'You can select up to 10 interests only.');
    //     }
    // };
    // const toggleInterest = (interest) => {
    //     if (selectedInterests.includes(interest)) {
    //         // Remove interest if already selected
    //         setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    //     } else if (selectedInterests.length < 10) {
    //         // Add interest if less than 6 are selected
    //         setSelectedInterests([...selectedInterests, interest]);
    //     } else {
    //         // Alert user if trying to select more than 6 interests
    //         Alert.alert('Limit Reached', 'You can select up to 10 interests only.');
    //     }
    // };

    // Pick image from gallery

    const toggleInterest = (interest) => {
        // if (!Array.isArray(interests)) return;

        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest));
        } else if (interests.length < 10) {
            setInterests([...interests, interest]);
        } else {
            Alert.alert('Limit Reached', 'You can select up to 10 interests only.');
        }
    };


    const pickImage = async (setImageField, type) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri; // Get the URI of the selected image
                console.log("Picked image URI:", imageUri);

                // Upload the image to Cloudinary
                const uploadedUrl = await uploadToCloudinary(imageUri);

                if (uploadedUrl) {
                    setImageField(uploadedUrl); // Update the image state with the Cloudinary URL
                    saveImageToDatabase(uploadedUrl, type); // Save the image URL to the database
                }
            } else {
                console.log("Image picker was canceled.");
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "An error occurred while selecting the image.");
        }
    };


    // Upload to Cloudinary
    const uploadToCloudinary = async (imageUri) => {
        if (!imageUri) {
            console.error("Image URI is missing.");
            Alert.alert("Error", "No image selected for upload.");
            return null;
        }

        const data = new FormData();
        data.append('file', {
            uri: imageUri,
            type: 'image/jpeg', // Adjust if needed for other image types
            name: 'profile_image.jpg', // Provide a generic file name
        });
        data.append('upload_preset', 'communi_preset'); // Your unsigned preset name

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dkkvg2spy/image/upload', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                console.error("Cloudinary upload failed:", response.statusText);
                Alert.alert("Error", "Failed to upload image to Cloudinary.");
                return null;
            }

            const json = await response.json();
            console.log("Uploaded image URL:", json.secure_url);
            return json.secure_url; // Return the Cloudinary URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            Alert.alert("Error", "An error occurred while uploading the image.");
            return null;
        }
    };


    // Save image URL to the database
    const saveImageToDatabase = async (imageUrl, type) => {
        try {
            const response = await fetch('http://10.0.2.2:5003upload-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: parsedUserData.email,
                    type, // 'profile' or 'header'
                    image: imageUrl, // The Cloudinary image URL
                }),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                Alert.alert('Success', 'Image updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update image in the database.');
            }
        } catch (error) {
            console.error("Error saving image to database:", error);
            Alert.alert('Error', 'An error occurred while saving your image.');
        }
    };


    // Save profile changes
    const saveChanges = async () => {
        try {
            // Save interests to the backend
            console.log("na trigger ang saveChanges na function");
            console.log("Interests before processing:", interests);

            let processedInterests = interests;
            if (typeof interests === "string") {
                processedInterests = interests.split(",").map((interest) => interest.trim());
            }
            console.log("Processed Interests (as array):", processedInterests);

            const response = await fetch('http://10.0.2.2:5003/save-interests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: parsedUserData.email,
                    selectedInterests: processedInterests,
                }),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                Alert.alert('Success', 'Profile updated successfully!');
                console.log("Success! Profile updated successfully.");
                const userData = data.user; // Extract the userData from the API response
                const processedInterests = data.user.interests; // Extract or process the interests
                // router.push('/dashboard/profilescreen', {
                //     userData,
                //     selectedInterests: processedInterests,
                // });
                // router.replace({
                //     pathname: '/dashboard/profilescreen',
                //     params: { userData, selectedInterests: processedInterests },
                // });
                router.replace({
                    pathname: '/dashboard/profilescreen',
                    params: { userData: JSON.stringify(userData), selectedInterests: processedInterests },
                });
                console.log(JSON.stringify(userData));
                console.log(selectedInterests);
            } else {
                Alert.alert('Error', 'Failed to update interests.');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            Alert.alert('Error', 'An error occurred while saving your changes.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.name}>Edit Profile</Text>
            </View>

            {/* Header Image */}
            {/* <Text style={styles.bio}>Header Image</Text> */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => pickImage(setHeaderImage, 'header')}>
                    <Image source={{ uri: headerImage }} style={styles.headerImage} />
                </TouchableOpacity>
            </View>

            {/* Profile Picture */}
            {/* <Text style={styles.bio}>Profile Picture</Text> */}
            <View style={styles.profileSection}>
                <TouchableOpacity onPress={() => pickImage(setProfilePicture, 'profile')}>
                    <Image source={{ uri: profilePicture }} style={styles.profileImage} />
                </TouchableOpacity>
                {/* Interests */}
                <Text style={styles.bio}>Interests</Text>
                <View style={styles.tagsContainer}>
                    {interestList.map((interest, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tag,
                                interests.includes(interest) ? { backgroundColor: '#635EE2' } : null,
                            ]}
                            onPress={() => toggleInterest(interest)}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    interests.includes(interest) ? { color: '#fff' } : null,
                                ]}
                            >
                                {interest}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* <TouchableOpacity style={styles.button} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity> */}
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Reuse your ProfileScreen styles here
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 10,
        // marginHorizontal: 10
    },
    headerContainer: {
        // padding: 10,
        marginLeft: 10,
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
        marginTop: -1,
        marginBottom: 7,
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
        fontFamily: "Poppins-Bold",
        // fontWeight: 'bold',
        marginTop: 20,
        padding: 10,
        marginBottom: 15
    },
    bio: {
        marginTop: 40,
        marginBottom: 10,
        fontFamily: "Inter-Bold",
        fontSize: 20,
        textAlign: 'center',
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
    buttonWrapper: {
        marginBottom: 15,
        alignItems: "center"
    },
    button: {
        backgroundColor: 'rgba(99, 94, 226, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        // marginHorizontal: 10,
        alignItems: 'center',
        alignContent: "center",
        marginVertical: 3,
        height: 45,
        width: "97%"
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        color: '#fff',
        fontWeight: '500',
        fontSize: 20,
    },
});