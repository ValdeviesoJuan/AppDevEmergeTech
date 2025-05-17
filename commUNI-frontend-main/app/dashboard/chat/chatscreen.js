import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const ChatScreen = ({ group, onBack }) => {
    // Use the message from the group as the initial message
    const [messages, setMessages] = useState([
        { id: "1", text: group.message, sender: "bot" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        const userMessage = { id: Date.now().toString(), text: newMessage, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setNewMessage("");
    };

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.chatMessage,
                item.sender === "user" ? styles.chatUserMessage : styles.chatBotMessage,
            ]}
        >
            <Text style={styles.chatMessageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.chatContainer}>
            {/* Header */}
            <View style={styles.chatHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.chatBackButton}>←</Text>
                </TouchableOpacity>
                <View style={styles.chatHeaderContent}>
                    <Image
                        source={{ uri: `https://picsum.photos/50?random=${group.id}` }} // Random image for each group
                        style={styles.chatHeaderImage}
                    />
                    <Text style={styles.chatHeaderTitle}>{group.name}</Text>
                </View>
            </View>

            {/* Messages */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
            />

            {/* Input */}
            <View style={styles.chatInputContainer}>
                <TextInput
                    style={styles.chatInput}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.chatSendButton} onPress={sendMessage}>
                    <Text style={styles.chatSendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    chatHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
    },
    chatBackButton: {
        color: "black",
        fontSize: 20,
        marginRight: 10,
    },
    chatHeaderContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    chatHeaderImage: {
        width: 40,
        height: 40,
        borderRadius: 20, // Circular image
        marginRight: 10, // Space between image and text
    },
    chatHeaderTitle: {
        color: "black",
        fontSize: 17,
        // fontWeight: "bold",
        fontFamily: "Inter-SemiBold"
    },
    chatList: {
        flex: 1,
        padding: 10,
    },
    chatMessage: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",
    },
    chatUserMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#dcf8c6",
    },
    chatBotMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#e5e5ea",
    },
    chatMessageText: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
    chatInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        backgroundColor: "#fff",
    },
    chatInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    chatSendButton: {
        backgroundColor: "#323b4c",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    chatSendButtonText: {
        color: "#fff",
        // fontWeight: "bold",
        fontFamily: "Inter-Bold"
    },
});

export default ChatScreen;
