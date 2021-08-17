import React from "react"
import {
    View,
    Platform, 
    Text
}  from "react-native"
import Animated, {
    interpolate, 
    Extrapolate, 
    useAnimatedStyle,
} from "react-native-reanimated"
import { TextButton } from "./TextButton"
import { Colors, FONTS, SIZES } from "../values"

const PLACES_ITEM_SIZE = Platform.OS === "ios" ? SIZES.width/1.25 :  SIZES.width/1.2

export function PlacesListItem({ animation, indexPosition, item, handleExploreButtonPress }){
    

    const placeItemContainerAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (indexPosition - 2) * PLACES_ITEM_SIZE,
            (indexPosition - 1) * PLACES_ITEM_SIZE,
            indexPosition * PLACES_ITEM_SIZE
        ]
    
        /** 
        * we need to calculate the activeHieght because we want to have different height for
        * different devices
        */
        let activeHeight = 0
        if(Platform.OS === "ios"){
            if(SIZES.height > 800){
                activeHeight = SIZES.height / 2
            }else{
                activeHeight = SIZES.height / 1.65
            }
        }else if(Platform.OS === "android"){
            activeHeight = SIZES.height / 1.6
        }

        const opacityInterpolate = interpolate(
            animation.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
        )

        const heightInterpolate = interpolate(
            animation.value,
            inputRange,
            [
              SIZES.height / 2.25,
              activeHeight,
              SIZES.height / 2.25,
            ],
            Extrapolate.CLAMP
        )

        return {
            opacity: opacityInterpolate,
            height: heightInterpolate,
        }
    })


    return (
        <Animated.View 
            style={[
                placeItemContainerAnimatedStyle,
                {
                    width: PLACES_ITEM_SIZE,
                    alignItems: "center",
                    borderRadius: 20,
                    padding: 10,
                }
            ]}
        >
            <Animated.Image
                source={item.image}
                resizeMode="cover"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                }}
            />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginHorizontal: SIZES.padding }}>
                {/* place title */}
                <Text style={{ color: Colors.white, marginBottom: SIZES.radius, ...FONTS.h1 }}>{item.name}</Text>

                {/* place description */}
                <Text style={{ color: Colors.white, marginBottom: SIZES.padding * 2, textAlign: "center", alignItems: "center", ...FONTS.body3 }}>{item.description}</Text>

                {/* Listitem button */}
                <TextButton 
                    label="Explore"
                    customContainerStyle={{
                        position: "absolute",
                        width: 150,
                        bottom: -20,
                    }}
                    onPress={handleExploreButtonPress}
                />
            </View>
        </Animated.View>
    )
}