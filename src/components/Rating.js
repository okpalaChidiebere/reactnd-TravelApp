import React from "react"
import {
    View,
    Image,
}  from "react-native"
import { icons } from "../utils"

export function Rating({ containerStyle, rate }){
    const starComponents = []

    for (let i = 0; i < rate; i++) {
        starComponents.push(
            <Image 
                key={`full-${i}`}
                source={icons.star}
                resizeMode="cover"
                style={{
                    marginLeft: i === 0 ? 0 : 5, //we want to keep applyinh margingLef other star images other than the first stat
                    width: 15,
                    height: 15,
                }}
            />
        )
    }

    return (
        <View style={{ flexDirection: "row", ...containerStyle }}>
            {starComponents}
        </View>
    )
}