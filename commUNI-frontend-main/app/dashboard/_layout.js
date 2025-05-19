import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; // Import router for navigation
import { useRoute } from '@react-navigation/native'; // Import useRoute to access params
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { initDialogflow } from "../../dialogflowConfig";
import ChatBotBubble from "../../components/ChatBotBubble";

const DashboardLayout = () => {
  useEffect(() => {
    initDialogflow();
  }, []);

  console.log("We're in the Dashboard");
  const router = useRouter(); // Initialize the router
  const route = useRoute();  // Access the route object
  const { userData, selectedInterests } = route.params || {};   

  console.log("Here is what was received from the Interests screen: ");
  console.log(userData);
  console.log(selectedInterests);

  const navToProfile = () => {
    console.log("navToProfile function called");
    console.log(userData);
    console.log(selectedInterests);
    router.push({
      pathname: '/dashboard/profilescreen',
      params: { userData, selectedInterests },
    });
  };

  const navToFeed = () => {
    console.log("navToFeed function called");
    console.log("UserData tehee: ", userData);
    router.push({
      pathname: '/dashboard/homescreen',
      params: { userData, selectedInterests },
    });
  };

  const navToCom = () => {
    console.log("navtoCom function called");
    console.log("UserData tehee: ", userData);
    router.push({
      pathname: '/dashboard/communityscreen',
      params: { userData, selectedInterests },
    });
  };

  return (
    <>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#ffffff', // Tab bar background color
              borderTopWidth: 0, // Hide the top border
              elevation: 5, // Shadow for Android
              height: 50, // Taller height for the tab bar
              alignItems: 'center', // Center the items horizontally
              justifyContent: 'center', // Center the items vertically
              paddingTop: 7, // Optional: Add padding to the bottom for better alignment
            },
          }}
        >
          <Tabs.Screen
            name="communityscreen"
            options={{
              title: 'Community',
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 40, // adjust size as needed
                    height: 40,
                    borderRadius: 20, // makes it round
                    backgroundColor: focused ? '#635EE2' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? 'cards' : 'cards'}
                    size={24}
                    color={focused ? '#ffffff' : 'black'}
                  />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}  // Spread default tabBarButton props
                  onPress={navToCom}  // Custom onPress function
                />
              ),
            }}
          />
          <Tabs.Screen
            name="homescreen"
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 40, // adjust size as needed
                    height: 40,
                    borderRadius: 20, // makes it round
                    backgroundColor: focused ? '#635EE2' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? 'home' : 'home'}
                    size={24}
                    color={focused ? '#ffffff' : 'black'}
                  />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}  // Spread default tabBarButton props
                  onPress={navToFeed}  // Custom onPress function
                />
              ),
            }}
          />
          <Tabs.Screen
            name="notificationscreen"
            options={{
              title: 'Notifications',
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 40, // adjust size as needed
                    height: 40,
                    borderRadius: 20, // makes it round
                    backgroundColor: focused ? '#635EE2' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? 'bell' : 'bell'}
                    size={24}
                    color={focused ? '#ffffff' : 'black'}
                  />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: 'Chat',
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 40, // adjust size as needed
                    height: 40,
                    borderRadius: 20, // makes it round
                    backgroundColor: focused ? '#635EE2' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? 'chat' : 'chat'}
                    size={24}
                    color={focused ? '#ffffff' : 'black'}
                  />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="profilescreen"
            options={{
              title: 'Profile',
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 40, // adjust size as needed
                    height: 40,
                    borderRadius: 20, // makes it round
                    backgroundColor: focused ? '#635EE2' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? 'account' : 'account'}
                    size={24}
                    color={focused ? '#ffffff' : 'black'}
                  />
                </View>
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}  // Spread default tabBarButton props
                  onPress={navToProfile}  // Custom onPress function
                />
              ),
            }}
          />
        </Tabs>
        <ChatBotBubble userId={userData.userId} />
    </>
  );
};

export default DashboardLayout;
