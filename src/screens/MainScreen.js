import React, { useState, useCallback } from "react"
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
import { CountryListItem, PlacesListItem } from "../components"
import { icons, images, dummyData } from "../utils"
import { Colors, Strings, SIZES, FONTS, } from "../values"

const COUNTRIES_ITEM_SIZE = SIZES.width/3 //define the size of each country listItem
const PLACES_ITEM_SIZE = Platform.OS === "ios" ? SIZES.width/1.25 :  SIZES.width/1.2
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2 //the width for the two item empty item at the begining and end of the Places Flatlist. Its thesame to what we did for countries flatlist as well

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


export function MainScreen({ navigation }){

  /** We want to keep track of the animated value of the contry flatlist scroll position */
  const countryScrollX = useSharedValue(0)

  //we want to capture the scrollPosition for Places flatlist as well
  const placesScrollX = useSharedValue(0)

  /**
   * Whenever we click on the explore button we want to capture the current index of 
   * the place for a country the user selected so that we can navigate to the placeDetail
   *  screen accordingly
   */
  const [placesScrollPosition, setPlacesScrollPosition] = useState(0)

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

  /**
   * 
   * Initialize our list of Places
   * 
   * We want our selected Places to always be in the middle
   */
  const [places, setPlaces] = useState([
    { id: -1 }, //prepend an empty object
    ...dummyData.countries[0].places,
    { id: -2 } //postpend an empty object
  ])

  const handleExploreButtonPress = useCallback(() => {
    //Get the index of the place selected
    const currIndex = parseInt(placesScrollPosition, 10) + 1
    //console.log(places[currIndex])

    //navigate to the Place Screen
    navigation.navigate(Strings.screen_place, { selectedPlace: places[currIndex] })
  })

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
        onMomentumScrollEnd={(event) => {
          /**
           * Whenever we scroll through the country we need to change the places accordingly
           * as well 
           * 
           * we calculate the scroll ending position in here which helps us get 
           * the position(the current Index the user scrolled to) of the FlatList when the user is done scrolling
           * */
          const position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE).toFixed(0)

          //we can now set the place now we have gotten the position
          setPlaces([
            { id: -1 }, //prepend an empty object
            ...dummyData.countries[position].places,
            { id: -2 } //postpend an empty object
          ])
        }}
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

  function renderPlaces(){
    return (
      <AnimatedFlatList 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          alignItems: "center"
        }}
        snapToAlignment="center"
        snapToInterval={Platform.OS === "ios" ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={useAnimatedScrollHandler((e) => {
          placesScrollX.value = e.contentOffset.x
        })}
        onMomentumScrollEnd={(event) => {
          //Calculate position
          const position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)

          //Set place position
          setPlacesScrollPosition(position)
        }}
        renderItem={({ item, index }) => {
          //If it the first or last item
          return (
            index === 0 || index === countries.length - 1
            //we return an empty view
          ? (
              <View 
                style={{
                  width: EMPTY_ITEM_SIZE
                }}
              />
            )
          : <PlacesListItem item={item} animation={placesScrollX} indexPosition={index} handleExploreButtonPress={handleExploreButtonPress}/>
          )
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      {renderHeader()}

      <ScrollView>
        <View style={{ height: 700 }}>
          {/* Contries */}
          <View>
            {renderCountries()}
          </View>

          {/* Places */}
          <View style={{ height: Platform.OS === "ios" ? 500 : 450 }}>
            {renderPlaces()}
          </View>
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