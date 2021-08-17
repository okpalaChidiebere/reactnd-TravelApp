import React from "react"
import {
    Image,
    Text,
    TouchableOpacity,
} from "react-native"
import { Colors, SIZES, FONTS, } from "../values"

export function TextIconButton({ label, icon, customLabeStyle, customContainerStyle, onPress }){
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                backgroundColor: Colors.white,
                ...customContainerStyle,
            }}
            onPress={onPress}
        >
            <Text style={{ marginRight: SIZES.base, ...FONTS.h2, ...customLabeStyle }}>{label}</Text>{/*button Label */}
            <Image source={icon} style={{ width: 25, height: 25 }}/>{/*button icon */}
        </TouchableOpacity>
    )
}