import React from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  Platform, 
  TouchableOpacity,
  Image,
}  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { icons, images } from "../utils"
import { Colors, Strings, SIZES, FONTS,  } from "../values"

export function MainScreen({ navigation }){

  function renderHeader(){
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
        }}
      >
        {/* Side Drawer */}
        <TouchableOpacity
          style={[
            styles.center,
            {
              width: 45, height: 45,
            }
          ]}
          onPress={() => console.log("Side Drawer")}
        >
          <Image 
            source={icons.side_drawer}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>

        {/* Label/Title */}
        <View style={[{ flex: 1}, styles.center]}>
          <Text style={{ color: Colors.white, ...FONTS.h3 }}>ASIA</Text>
        </View>

        {/* Profile */}
        <TouchableOpacity
          onPress={() => console.log("Profile")}
        >
          <Image 
            source={images.profile_pic}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
            }}
          />
        </TouchableOpacity>

      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {renderHeader()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.black,
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