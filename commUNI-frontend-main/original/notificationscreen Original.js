import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const notifications = [
  { id: 1, name: 'Nicole Cubillas', action: 'reacted 😊 to your comment', time: 'Just now', image: '1001' },
  { id: 2, name: 'Prince Magsalos', action: 'replied to your comment on his post', time: 'Just now', image: '1002' },
  { id: 3, name: 'Sheen Ocon', action: 'liked your post', time: 'Just now', image: '1003' },
  { id: 4, name: 'Lorenz Largosa', action: 'reacted 😊 to your comment', time: '30m', image: '1004' },
  { id: 5, name: 'Aljohn Arranguez', action: 'reposted your post', time: '45m', image: '1005' },
  { id: 6, name: 'John Smith', action: 'commented on your post', time: '1h', image: '1006' },
  { id: 7, name: 'John Smith', action: 'reacted 😊 to your post', time: '1h', image: '1006' },
  { id: 8, name: 'Emily Doe', action: 'shared your post', time: '2h', image: '1008' },
  { id: 9, name: 'Anna Cruz', action: 'followed you', time: '3h', image: '1009' },
  { id: 10, name: 'Brian Lee', action: 'liked your photo', time: '4h', image: '1010' },
];

export default function App() {
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

const NotificationCard = ({ name, action, time, image }) => (
  <View style={styles.notificationCard}>
    <Image
      source={{ uri: `https://picsum.photos/id/${image}/50/50` }}
      style={styles.avatar}
    />
    <View style={styles.textContainer}>
      <Text style={styles.name}>
        <Text style={styles.bold}>{name}</Text> {action}
      </Text>
      <Text style={styles.time}>{time}</Text>
    </View>
    <View style={styles.dot}></View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0f62fe',
    marginRight: 10,
  },
});
