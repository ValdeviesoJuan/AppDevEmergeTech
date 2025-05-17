import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import ChatScreen from "./chatscreen";  // Import the ChatScreen component

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Sample groups
  const groups = [
    { id: "1", name: "Tech Innovators Guild", message: "Don’t miss this opportunity guys!" },
    { id: "2", name: "Chess Club USC", message: "Need to warm up before the regional match!" },
    { id: "3", name: "Student Government Ass.", message: "Speaking of the showcase, just a heads up..." },
    { id: "4", name: "R3D ONE", message: "Yo, practice tomorrow at 7 PM in the gym!" },
    { id: "5", name: "Lens Masters Society", message: "Make sure your subject is complete..." },
    { id: "6", name: "Photography Club", message: "Photo walk on Saturday, don't forget your gear!" },
    { id: "7", name: "Music Band Collective", message: "Rehearsal at 5 PM today. Let's nail it!" },
    { id: "8", name: "Debate Society", message: "Preparing for the national championship. Focus, team!" },
    { id: "9", name: "Art Students Collective", message: "Art exhibition this weekend, be there!" },
    { id: "10", name: "Dance Crew", message: "Practice starts at 6 PM sharp, everyone be there!" },
    { id: "11", name: "Film Buffs Society", message: "Movie night at my place on Friday. Who’s in?" },
    { id: "12", name: "Foodies Union", message: "Let's meet at the new cafe tomorrow for lunch!" },
    { id: "13", name: "Environmental Club", message: "Meeting tomorrow at 3 PM, let's talk sustainability!" },
    { id: "14", name: "Robotics Team", message: "Robotics competition this weekend! Stay sharp!" },
    { id: "15", name: "Sports Enthusiasts", message: "Who’s up for a football game on Sunday?" },
  ];

  // Render group list
  const renderGroup = ({ item }) => (
    <TouchableOpacity style={styles.chatGroupItem} onPress={() => setSelectedGroup(item)}>
      <View style={styles.chatGroupContent}>
        <Image
          source={{ uri: `https://picsum.photos/50?random=${item.id}` }} // Random image for each group
          style={styles.chatGroupImage}
        />
        <View style={styles.textContent}>
          <Text style={styles.chatGroupName}>{item.name}</Text>
          <Text style={styles.chatGroupMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.chatContainer}>
      {/* Home Screen */}
      {!selectedGroup ? (
        <>
          <Text style={styles.chatHeader}>Messages</Text>
          <FlatList data={groups} renderItem={renderGroup} keyExtractor={(item) => item.id} />
        </>
      ) : (
        /* Chat Screen */
        <ChatScreen group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 20, // Added some padding to avoid top cutoff
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  chatGroupItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center", // Ensure items are aligned properly
  },
  chatGroupContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatGroupImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 15, // Space between image and text
  },
  textContent: {
    flex: 1, // Ensure text content takes up available space
  },
  chatGroupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Ensure the name text is visible
  },
  chatGroupMessage: {
    color: "#888",
    marginTop: 3,
  },
});

export default App;
