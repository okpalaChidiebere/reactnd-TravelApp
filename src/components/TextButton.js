import React from "react"
import {
    TouchableOpacity,
    Text
}  from "react-native"
import { Colors, FONTS, SIZES } from "../values"

export function TextButton({ label, customContainerStyle, customLabelStyle, onPress }){
    return (
        <TouchableOpacity
            style={{
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                backgroundColor: Colors.white,
                ...customContainerStyle,
            }}
            onPress={onPress}
        >
            <Text style={{ ...FONTS.h2, ...customLabelStyle }}>{label}</Text>
        </TouchableOpacity>
    )
}