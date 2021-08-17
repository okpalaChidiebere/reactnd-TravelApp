import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native"
import { icons } from "../utils"
import { Colors, SIZES, FONTS, } from "../values"

export function HeaderBar({ title, leftOnPress, right, containerStyle }){
    return (
        <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                ...containerStyle,
            }}
        >
            {/* Back */}
            <View style={{ alignItems: "flex-start" }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: Colors.transparentBlack
                    }}
                    onPress={leftOnPress}
                >
                    <Image 
                        source={icons.left_arrow}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: Colors.white,
                        }}
                    />
                </TouchableOpacity>
            </View>

            {/* Titile */}
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: Colors.black, ...FONTS.h3 }}>{title}</Text>
            </View>

            {/* Settings */}
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: right ? Colors.transparentBlack : null
                }}
            >
                {right && <Image source={icons.settings} resizeMode="contain" style={{ width: 20, height: 20, tintColor: Colors.white }}/>}
            </TouchableOpacity>
        </View>
    )
}