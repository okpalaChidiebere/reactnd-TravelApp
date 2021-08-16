import React from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  Platform, 
}  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export function MainScreen({ navigation }){

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.content}>
        <Text>Open MainScreen.js to start working on your app!</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  content: Platform.select({
    ios: {
      flex: 1,
      backgroundColor: Colors.empty
    },
    android: {
      flex: 1
    }
  }),
})

export function MainScreenOptions(){
  return {
      title: Strings.app_name,
      headerTintColor: Colors.back,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.theme_primary,
      },
  }
}