import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
    const router = useRouter();
    const route = useRoute();
    const { userData, selectedInterests } = route.params || {}; // Extract user data and interests
    const parsedUserData = userData ? JSON.parse(userData) : {};

    // States for profile and header images
    const [profilePicture, setProfilePicture] = useState(parsedUserData.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
    const [headerImage, setHeaderImage] = useState(parsedUserData.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');
    const [interestsArray, setInterestsArray] = useState([]);

    const fullName = `${parsedUserData.firstName} ${parsedUserData.lastName}`;
    const department = parsedUserData.department;
    const program = parsedUserData.program;
    const yearlevel = parsedUserData.yearlevel;

    useEffect(() => {
        fetchUserImagesAndInterests();
    }, []);

    // const fetchUserImagesAndInterests = async () => {
    //   try {
    //     const response = await fetch('http://192.168.1.53:5003/get-user-data', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email: parsedUserData.email }),
    //     });

    //     const data = await response.json();
    //     if (data.status === 'ok') {
    //       // Update images and interests if available
    //       setProfilePicture(data.user.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
    //       setHeaderImage(data.user.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');
    //       setInterestsArray(data.user.selectedInterests || []);
    //     } else {
    //       console.error('Failed to fetch user data:', data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //     Alert.alert('Error', 'An error occurred while fetching user data.');
    //   }
    // };

    const fetchUserImagesAndInterests = async () => {
        try {
            const response = await fetch('http://192.168.1.53:5003/get-user-data', {
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

    const handleLogout = () => {
        console.log('Logging out...');
        router.replace('/login');
    };

    return (
        <ScrollView style={styles.container}>
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
                <Text style={styles.communities}>0 communities joined</Text>

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
                    {interestsArray.map((interest, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{interest}</Text>
                        </View>
                    ))}
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            router.push({
                                pathname: '/editprofilescreen', // Navigate to edit profile screen
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
                <View style={styles.tabsContainer}>
                    <Text style={[styles.tabText, styles.activeTab]}>Posts</Text>
                    <Text style={styles.tabText}>Reposts</Text>
                    <Text style={styles.tabText}>Replies</Text>
                    <Text style={styles.tabText}>Media</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'rgba(99, 94, 226, 0.8)',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 1,
        alignItems: 'center',
    },
    buttonText: {
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
});


