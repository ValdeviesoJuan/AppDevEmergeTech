import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

const RootLayout = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaProvider> 
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="register"/>
            <Stack.Screen name="login"/>
            <Stack.Screen name="interests"/>
            <Stack.Screen name="startscreen"/>
            <Stack.Screen name="questions"/>
            <Stack.Screen name="results"/>
            <Stack.Screen name="dashboard"/>
          </Stack> 
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootLayout;
