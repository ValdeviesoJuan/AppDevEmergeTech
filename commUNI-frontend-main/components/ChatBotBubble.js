import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
import { Dialogflow_V2 } from "react-native-dialogflow";

const ChatBotBubble = () => {
  const pathname = usePathname();
  const hideOnScreens = ["/login", "/register", ,"/startscreen", "/questions", "/interests", "/results"];

  if (hideOnScreens.includes(pathname)) return null;

  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about clubs at USTP!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    Dialogflow_V2.requestQuery(
      text,
      (res) => {
        const reply = res.result.fulfillment.speech;
        const botMessage = { sender: "bot", text: reply };
        setMessages((prev) => [...prev, botMessage]);
      },
      (err) => console.error(err)
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.bubbleButton}
      >
        <Text style={{ color: "white" }}>💬</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.chatContainer}>
            {messages.map((msg, index) => (
              <Text
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#cce5ff" : "#e6ffe6",
                  padding: 8,
                  marginVertical: 2,
                  borderRadius: 8,
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </Text>
            ))}
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask me something..."
            />
            <TouchableOpacity onPress={() => sendMessage(input)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeBtn}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bubbleButton: {
    position: "absolute",
    bottom: 70,
    right: 15,
    backgroundColor: "#1e90ff",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    zIndex: 999,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chatContainer: {
    backgroundColor: "#fff",
    padding: 16,
    maxHeight: "70%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  send: {
    fontWeight: "bold",
    color: "#1e90ff",
  },
  closeBtn: {
    backgroundColor: "#eee",
    alignItems: "center",
    padding: 10,
  },
});

export default ChatBotBubble;
