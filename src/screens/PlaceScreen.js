import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
    View,
    Text,
    ImageBackground,
    Image
} from "react-native"
import { HeaderBar, TextIconButton } from "../components"
import { icons } from "../utils"
import { Colors, SIZES, FONTS, } from "../values"

export function PlaceScreen({ route, navigation }){
    const  [selectedPlace, setSelectedPlace] = useState(null)

    useEffect(() => {
        let { selectedPlace } = route.params
        setSelectedPlace(selectedPlace)
    }, [])

    return (
       <ImageBackground
        source={selectedPlace?.image}
        style={{
            width: "100%",
            height: "100%",
        }}
       >
           <StatusBar style="dark" />
           <HeaderBar 
                title=""
                leftOnPress={() => navigation.goBack()}
                containerStyle={{
                    marginTop : SIZES.padding * 2
                }}
           />

            {/* Detail section */}
           <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding * 2,
                    justifyContent: "flex-end",
                    marginBottom: 100,
                }}
           >
               {/* Name & Ratings */}
               <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
               >
                   <Text style={{ color: Colors.white, ...FONTS.largeTitle }}>{selectedPlace?.name}</Text>

                   {/* Rating View */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ marginRight: 5, color: Colors.white, ...FONTS.h3 }}>{selectedPlace?.rate}</Text>
                        <Image source={icons.star} style={{ width: 20, height: 20 }}/>
                    </View>
               </View>

               {/* Description */}
               <Text style={{ marginTop: SIZES.base, color: Colors.white, ...FONTS.body3 }}>{selectedPlace?.description}</Text>

               {/* Text Icon Button */}
               <TextIconButton 
                    label="Book a flight"
                    icon={icons.aeroplane}
                    customContainerStyle={{
                        marginTop: SIZES.padding,
                    }}
                    onPress={() => console.log("Book a flight")}
               />
           </View>
       </ImageBackground>
    )
}
