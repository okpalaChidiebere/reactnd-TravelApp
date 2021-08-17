import React, { useEffect, useState, useRef } from "react"
import { StatusBar } from "expo-status-bar"
import {
    View,
    Text,
    ImageBackground,
    Image,
} from "react-native"
import SlidingUpPanel from "rn-sliding-up-panel"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { HeaderBar, TextIconButton } from "../components"
import { icons, mapStyle } from "../utils"
import { Colors, SIZES, FONTS, } from "../values"

export function PlaceScreen({ route, navigation }){
    const  [selectedPlace, setSelectedPlace] = useState(null)
    const [selectedHotel, setSelectedHotel] = useState(null)
    const _panel = useRef() //enables us to control the slidingUp panel programmatically

    useEffect(() => {
        let { selectedPlace } = route.params
        setSelectedPlace(selectedPlace)
    }, [])

    function renderPlace(){
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
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
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

    function renderMap(){
        return (
            <SlidingUpPanel
                ref={_panel}
                draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
                showBackdrop={false}
                snappingPoints={[SIZES.height + 120]}
                height={SIZES.height + 120}
                friction={0.7}
            >
                <View style={{ flex: 1, backgroundColor: "transparent" }} >
                    {/* Panel Header */}
                    <View
                        style={{
                            height: 120,
                            backgroundColor: "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image source={icons.up_arrow} style={{ width: 20, height: 20, tintColor: Colors.white }}/>
                        <Text style={{ color: Colors.white, ...FONTS.h3 }}>SWIPE FOR DETAILS</Text>
                    </View>

                    {/* Panel Details - which is the Map */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: Colors.white,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/*
                            Learn more customizations for you maps here https://www.youtube.com/watch?v=qlELLikT3FU
                            
                            FYI: https://docs.expo.dev/versions/v42.0.0/sdk/map-view/ no exta configurations is needed when you run with Expo
                            as stated here
                            https://www.reddit.com/r/reactnative/comments/gwegag/does_reactnativemaps_require_api_key/
                            But dont expect to use the customMapStyle and maybe other features that need API key.
                            They will only work when you build this expo project with  with `expo build:ios or expo build:android`

                            https://www.byprogrammers.com/2020/11/how-to-generate-google-maps-api-key-for-mobile-app/

                        */}
                        <MapView
                            /*provider={PROVIDER_GOOGLE} //will uncomment for expo build apk*/
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            customMapStyle={mapStyle}
                            initialRegion={selectedPlace?.mapInitialRegion}
                        >
                            {selectedPlace?.hotels.map((hotel, index) => (
                                <Marker 
                                    key={index}
                                    coordinate={hotel.latlng} //we renders the marker(s) in our map according to our given coordinates
                                    identifier={hotel.id}
                                    onPress={() => setSelectedHotel(hotel)}
                                >
                                    <Image 
                                        source={selectedHotel?.id === hotel.id ? icons.bed_on : icons.bed_off} 
                                        resizeMode="contain" style={{ width: 50, height: 50 }}
                                    />
                                </Marker>
                            ))}
                        </MapView>

                        {/* Header Bar */}
                        <HeaderBar 
                            title={selectedPlace?.name}
                            leftOnPress={() => _panel.current.hide()} /**we want to hide the panel when the backIcon in the header is pressed */
                            right={true}
                            containerStyle={{
                                position: "absolute",
                                top: SIZES.padding * 2,
                            }}
                        />
                    </View>
                </View>
            </SlidingUpPanel>
        )
    }

    return (
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
           {renderPlace()}
           {renderMap()}
       </View>
    )
}
