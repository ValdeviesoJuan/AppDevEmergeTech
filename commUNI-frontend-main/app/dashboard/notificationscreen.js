import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const notifications = [
  { id: 1, name: 'Nicole Cubillas', action: 'accepted your request to Fourth Wing', time: 'Just now', image: '1001' },
  { id: 2, name: 'Prince Magsalos', action: 'accepted your request to Tech Innovators Guild', time: 'Just now', image: '1002' },
  { id: 3, name: 'Sheen Ocon', action: 'accepted your request to AI Pioneers', time: 'Just now', image: '1003' },
  { id: 4, name: 'Lorenz Largosa', action: 'liked your comment', time: '30m', image: '1004' },
  { id: 5, name: 'Aljohn Arranguez', action: 'commented on your post', time: '45m', image: '1005' },
  { id: 6, name: 'John Smith', action: 'commented on your post', time: '1h', image: '1006' },
  { id: 7, name: 'John Smith', action: 'accepted your request to Blockchain Builders', time: '1h', image: '1006' },
  { id: 8, name: 'Emily Doe', action: 'started following you', time: '2h', image: '1008' },
  { id: 9, name: 'Anna Cruz', action: 'started following you', time: '3h', image: '1009' },
  { id: 10, name: 'Brian Lee', action: 'liked your photo', time: '4h', image: '1010' },
];

export default function App() {
  // const [isNewUser, setIsNewUser] = useState(true); // Add state to determine if the user is new
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionHeader}>New</Text>
        {notifications.slice(0, 3).map((item) => (
          <NotificationCard
            key={item.id}
            name={item.name}
            action={item.action}
            time={item.time}
            image={item.image}
          />
        ))}
        <Text style={styles.sectionHeader}>Earlier</Text>
        {notifications.slice(3).map((item) => (
          <NotificationCard
            key={item.id}
            name={item.name}
            action={item.action}
            time={item.time}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const NotificationCard = ({ name, action, time, image }) => {
  // const actionParts = action ? action.split(' to ') : [];

  const actionParts = action ? action.split(' to ') : [];

  return (
    <View style={styles.notificationCard}>
      <Image
        source={{ uri: `https://picsum.photos/id/${image}/50/50` }}
        style={styles.avatar}
      />
      {/* <View style={styles.textContainer}>
        <Text style={styles.name}>
          <Text style={styles.bold}>{name}</Text> {action}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View> */}
      {/* <View style={styles.textContainer}>
        <Text style={styles.name}>
          <Text style={styles.bold}>{name}</Text> {actionParts[0]}
          {actionParts[1] && (
            <Text style={styles.boldAction}> to {actionParts[1]}</Text>
          )}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View> */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          <Text style={styles.bold}>{name}</Text> {actionParts[0]}
          {actionParts[1] && (
            <>
              <Text> to </Text>
              <Text style={styles.boldAction}>{actionParts[1]}</Text>
            </>
          )}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.dot}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    // fontWeight: 'bold',
    padding: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    // paddingVertical: 5
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    // fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: '#333',
  },
  bold: {
    fontFamily: "Inter-SemiBold",
  },
  boldAction: {
    fontFamily: "Inter-SemiBold",
    color: '#000', // You can change the color if you want it to stand out more
  },
  time: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: '#888',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0f62fe',
    marginRight: 10,
  },
  emptyNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyNotificationsText: {
    fontSize: 18,
    color: '#888',
  },
});