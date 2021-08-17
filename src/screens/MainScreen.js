import React, { useState } from "react"
import { 
  Text, 
  View, 
  StyleSheet, 
  Platform, 
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
}  from "react-native"
import Animated, {
  useAnimatedScrollHandler, 
  useSharedValue, 
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { CountryListItem } from "../components"
import { icons, images, dummyData } from "../utils"
import { Colors, Strings, SIZES, FONTS, } from "../values"

const COUNTRIES_ITEM_SIZE = SIZES.width/3 //define the size of each country listItem

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


export function MainScreen({ navigation }){

  /** We want to keep track of the animated value of the contry flatlist scroll position */
  const countryScrollX = useSharedValue(0)

  /** 
   * React State for our Country list
   * 
   * We want the list of selected country to always be in the middle, we need to 
   * prepend and postpend empty objects this react state hook  */
  const [countries, setCountries] = useState([
    { id: -1 }, //prepend an empty object
    ...dummyData.countries,
    { id: -2 } //postpend an empty object
  ])

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

  function renderCountries(){
    return(
      <AnimatedFlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={item => `${item.id}`}
        onScroll={useAnimatedScrollHandler((e) => {
          countryScrollX.value = e.contentOffset.x
        })}
        renderItem={({ item, index }) => {
          //If it the first or last item
          return (
            index === 0 || index === countries.length - 1
            //we return an empty view
          ? (
              <View 
                style={{
                  width: COUNTRIES_ITEM_SIZE
                }}
              />
            )
          : <CountryListItem item={item} animation={countryScrollX} indexPosition={index}/>
          )
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      {renderHeader()}

      <ScrollView 
        /*contentContainerStyle={{ 
          paddingBottom: Platform.OS === "ios" ? 40 : 0 //we dont
        }}*/
      >
        <View style={{ height: 700 }}>
          {/* Contries */}
          <View>
            {renderCountries()}
          </View>

          {/* Places */}

        </View>
      </ScrollView>
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