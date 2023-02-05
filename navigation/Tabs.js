import React from 'react'
import { Image, PlatformColor, Text, TouchableOpacity, View } from 'react-native'
import { Home } from '../screens'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, COLORS } from '../constants'


const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected;

    if (isSelected) {
        return (

            <View
                style={{ flex: 1, alignItems: "center" }}
            >
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, position: "absolute", backgroundColor: COLORS.transparent }}>
                    <TouchableOpacity
                        style={{
                            top: -22.5,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            elevation: 5,
                            backgroundColor: COLORS.white,
                        }}
                        onPress={onPress}
                    >
                        {children}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white,
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}
const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: "absolute",
                        bottom: -30,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        );
    }
    else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }
}
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarBackground: null,
                tabBarStyle: {
                    //backgroundColor: COLORS.transparent,
                    borderTopWidth: 0,
                    elevation: 0,
                }

            }}
            tabBar={props => (
                <CustomTabBar props={props} />
            )}
            initialRouteName={"home"}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: (focused) ? COLORS.primary : COLORS.secondary,
                            }}
                        />
                    ),
                    // tabBarButton: (props) => (
                    //     <TabBarCustomButton
                    //         {...props}
                    //     />
                    // ),
                    tabBarButton: (props) => {
                        console.log("l", props)
                        return (
                            <TabBarCustomButton
                                {...props}
                            />)
                    },
                }}
            />
            <Tab.Screen
                name="search"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: (focused) ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="like"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: (focused) ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="user"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: (focused) ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs
