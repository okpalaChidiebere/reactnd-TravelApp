import React, { useEffect, useState, useLayoutEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
    View,
    Text,
    ImageBackground,
    Image,
    Platform,
    StyleSheet,
} from "react-native"
import Animated, { 
    useSharedValue, 
    useAnimatedGestureHandler,
    useAnimatedStyle, 
    withSpring,
    withSequence,
    withTiming,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { HeaderBar, TextIconButton, Rating, TextButton } from "../components"
import { icons, mapStyle } from "../utils"
import { Colors, SIZES, FONTS, } from "../values"

const PANEL_HEADER_HEIGHT = 120
const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500
}
export function PlaceScreen({ route, navigation }){
    const slidingPanelOffset = useSharedValue(SIZES.height - PANEL_HEADER_HEIGHT)
    const  [selectedPlace, setSelectedPlace] = useState(null)
    const [selectedHotel, setSelectedHotel] = useState(null)

    /** 
     * Implemented the SlidingUp panel in reanimated2.
     * https://www.youtube.com/watch?v=Xp0q8ZDOeyE
     * 
    * When touching the sliding panel, it should go up and down in correspondence 
    * to our touch but also dismiss the sheet if we swipe down
    */
    const slidingPanelGestureHandler = useAnimatedGestureHandler({
        onStart(_, context){
            //FYI: any propery we add to the context becomes available throughout our gesture events
            context.startTop = slidingPanelOffset.value
        },
        onActive(event, context){
            slidingPanelOffset.value = context.startTop + event.translationY
        },
        onEnd(event){
            /**
             * As the touch ends, we want to check if the panel to be dismissed or not
             */
            const shouldBeOpened = event.translationY < (PANEL_HEADER_HEIGHT / 6) * -1 //NOTE: we multiplied by -1 because sliding from the bottom along y are negatives
            if(shouldBeOpened){ //We check to see if the touch distance is (PANEL_HEADER_HEIGHT/6) value in pixels past its initital position
                slidingPanelOffset.value = - PANEL_HEADER_HEIGHT
            }else{
                slidingPanelOffset.value = SIZES.height - PANEL_HEADER_HEIGHT
            }
        },
    })

    const animatedSlidingPanelStyle = useAnimatedStyle(() => {
        return {
            top: withSpring(slidingPanelOffset.value, SPRING_CONFIG),
        }
    })

    useEffect(() => {
        let { selectedPlace } = route.params
        setSelectedPlace(selectedPlace)
    }, [])

    useLayoutEffect(() => {
        // a little instructive motion
        slidingPanelOffset.value = withSequence(
            withTiming(SIZES.height - (PANEL_HEADER_HEIGHT + 20)), 
            withTiming(SIZES.height - PANEL_HEADER_HEIGHT)
        )
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
            <PanGestureHandler onGestureEvent={slidingPanelGestureHandler}>
                <Animated.View
                    style={[
                        styles.slidingPanel,
                        animatedSlidingPanelStyle,
                    ]}        
                >
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
                            leftOnPress={() => slidingPanelOffset.value = SIZES.height - PANEL_HEADER_HEIGHT} /**we want to hide the panel when the backIcon in the header is pressed */
                            right={true}
                            containerStyle={{
                                position: "absolute",
                                top: SIZES.padding * 2,
                            }}
                        />

                        {/* Map Footer Section for the Hotel Details for a particular place */}
                        {selectedHotel && ( //we only show this when a hotel is selected
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 30,
                                    left: 0,
                                    right: 0,
                                    padding: SIZES.radius
                                }}
                            >
                                <Text style={{ color: Colors.black, ...FONTS.h1 }}>{`Hotel in ${selectedPlace?.name}`}</Text>
                                <View 
                                    style={{
                                        flexDirection: "row",
                                        marginTop: SIZES.radius,
                                        padding: SIZES.radius,
                                        borderRadius: 15,
                                        backgroundColor: Colors.transparentBlack1
                                    }}
                                >
                                    {/* The Hotel Image */}
                                    <Image source={selectedHotel?.image} resizeMode="cover" style={{ width: 90, height: 120, borderRadius: 15 }}/>

                                    <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: "center", }}>
                                        {/* The Hotel Name */}
                                        <Text style={{ color: Colors.white, ...FONTS.h3 }}>{selectedHotel?.name}</Text> 
                                        {/* Ratings */}
                                        <Rating containerStyle={{ marginTop: SIZES.base, }} rate={selectedHotel?.rate}/> 
                                        <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                                            <TextButton
                                                label="Details"
                                                customContainerStyle={{
                                                    marginTop: SIZES.base,
                                                    height: 45,
                                                    width: 100,
                                                }}
                                                customLabelStyle={{ ...FONTS.h3 }}
                                                onPress={() => console.log("Details")}
                                            />
                                            {/** Hotel price */}
                                            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center",}}>
                                                <Text 
                                                    style={{ 

                                                        color: Colors.white, 
                                                        fontSize: Platform.OS === "ios" ? SIZES.body4 : SIZES.body5,
                                                        ...FONTS.body5,
                                                    }}
                                                >{`from $ ${selectedHotel?.price} / night`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </Animated.View>
            </PanGestureHandler>
        )
    }

    return (
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
           {renderPlace()}
           {renderMap()}
       </View>
    )
}

const styles = StyleSheet.create({
    slidingPanel: {
        backgroundColor: "transparent",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: SIZES.height + PANEL_HEADER_HEIGHT
    }
})