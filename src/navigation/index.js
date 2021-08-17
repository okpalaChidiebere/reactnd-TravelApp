import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TabNav from "./tabs"
import { PlaceScreen } from "../screens"
import { Strings } from "../values"

const Stack = createStackNavigator()
const MainNavigator = () => (
  <Stack.Navigator 
    initialRouteName={Strings.screen_main}
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name={Strings.screen_main}
      component={TabNav}
    />
    <Stack.Screen
      name={Strings.screen_place}
      component={PlaceScreen}
    />
  </Stack.Navigator>
)

export default MainNavigator