import React from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { Colors, Strings } from "../values"
import { MainScreen  } from "../screens"
import { icons } from "../utils"

const Tab = createBottomTabNavigator()

const TabNav = () => (
    <Tab.Navigator
        initialRouteName={Strings.screen_tab_main}
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: Colors.black,
                borderTopColor: "transparent",
                height: 100,
            },
            tabBarIcon: ({ focused }) => {
                let icon
                switch (route.name) {
                  case Strings.screen_tab_main : 
                    icon = (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.maps}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? Colors.blue : Colors.gray
                                }}
                            />
                        </View>
                    )
                    break 
                  case Strings.screen_bookmark :
                    icon = (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.bookmark}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? Colors.blue : Colors.gray
                                }}
                            />
                        </View>
                    )
                    break
                  case Strings.screen_calendar :
                    icon = (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.calendar}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? Colors.blue : Colors.gray
                                }}
                            />
                        </View>
                    )
                    break
                  case Strings.screen_plane :
                      icon = (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.plane}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? Colors.blue : Colors.gray
                                }}
                            />
                        </View>
                    )
                      break                 
                }
                return icon
            }
        })}
    >
      <Tab.Screen name={Strings.screen_tab_main} component={MainScreen}/>
      <Tab.Screen name={Strings.screen_bookmark} component={MainScreen} />
      <Tab.Screen name={Strings.screen_calendar} component={MainScreen} />
      <Tab.Screen name={Strings.screen_plane} component={MainScreen} />
    </Tab.Navigator>
)

const styles = StyleSheet.create({
    shadow: {
        shadowColor: Colors.blue,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default TabNav