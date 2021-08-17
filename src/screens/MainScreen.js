import React from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  Platform, 
  TouchableOpacity,
}  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export function MainScreen({ navigation }){

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={[styles.content, styles.center]}>
        <Text>Open MainScreen.js to start working on your app!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(Strings.screen_place)}
        >
          <Text>Navigate to Place</Text>
        </TouchableOpacity>
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
  center: {
    alignItems: 'center', 
    justifyContent: 'center',
  }
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