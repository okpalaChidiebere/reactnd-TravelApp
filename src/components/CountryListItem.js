import React from "react"
import { 
  Platform,
}  from "react-native"
import Animated, {
  interpolate, 
  Extrapolate, 
  useAnimatedStyle,
} from "react-native-reanimated"
import { Colors, FONTS, SIZES } from "../values"

const COUNTRIES_ITEM_SIZE = SIZES.width/3 //define the size of each country listItem


export function CountryListItem({ animation, indexPosition, item }){

    /**
     * We will use the interpolate function to animate the opacity, mapIconSize, and textSize whenever a country is being selected
     */

    const inputRange = [
        (indexPosition - 2) * COUNTRIES_ITEM_SIZE, //position of the country before the the selected Index
        (indexPosition - 1) * COUNTRIES_ITEM_SIZE, //position of the current country being selected
        indexPosition * COUNTRIES_ITEM_SIZE, //position of the country after the the selected Index
    ]

    const animatedCountryListItemText = useAnimatedStyle(() => {
        const fontSizeInterpolate = interpolate(
            animation.value,
            inputRange,
            [15, 25, 15],
            Extrapolate.CLAMP
        )

        return {
            fontSize: fontSizeInterpolate
        }
    })

    const animatedCountryListItemMapSize = useAnimatedStyle(() => {
        const mapSizeInterpolate = interpolate(
          animation.value,
          inputRange,
          [
            25, 
            Platform.OS === "ios" ? 80 : 60,
            25,
          ],
          Extrapolate.CLAMP
        ) 

        return {
          width: mapSizeInterpolate,
          height: mapSizeInterpolate,
        }
    })

    const animatedSelectedCoutryListItemContainer = useAnimatedStyle(() => {
        const opacityInterpolate = interpolate(
          animation.value,
          inputRange,
          [0.3, 1, 0.3],
          Extrapolate.CLAMP
        )

        return {
          opacity: opacityInterpolate,
        }
    })

    return (
        <Animated.View
            style={[
                {
                    height: 130,
                    width: COUNTRIES_ITEM_SIZE,
                    justifyContent: "center",
                    alignItems: "center",
                },
                animatedSelectedCoutryListItemContainer,
            ]}
        >
            <Animated.Image 
                source={item.image}
                resizeMode="contain"
                style={[
                    {
                      width: 80,
                      height: 80,
                      tintColor: Colors.white,
                    },
                    animatedCountryListItemMapSize,
                ]}
            />
                <Animated.Text 
                    style={[
                        { 
                            marginTop: 3, 
                            color: Colors.white, 
                            ...FONTS.h1, 
                            fontSize: 25
                        },
                        animatedCountryListItemText,
                    ]}
                >{item.name}</Animated.Text>
        </Animated.View>
    )
}