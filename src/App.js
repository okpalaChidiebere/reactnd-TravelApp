import { StatusBar } from "expo-status-bar"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import MainNavigator from "./navigation"
import { Colors } from "./values"


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={Colors.theme_primary_dark}/>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}