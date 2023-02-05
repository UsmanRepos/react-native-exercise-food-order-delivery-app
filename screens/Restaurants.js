import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images, FONTS, COLORS, SIZES } from '../constants'
import { isIphoneX } from 'react-native-iphone-x-helper'

const Restaurants = ({ navigation, route }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [orderItem, setOrderItem] = useState([]);
    const [slideIndex, setSlideIndex] = useState(1);

    const prevSlide = () => {
        if (slideIndex <= 1) {
            setSlideIndex(restaurant?.menu.length);
        }
        else {
            setSlideIndex(slideIndex - 1);
        }
    };
    const nextSlide = () => {
        if (slideIndex >= restaurant?.menu.length) {
            setSlideIndex(1);
        }
        else {
            setSlideIndex(slideIndex + 1);
        }
    };

    useEffect(() => {
        let { item, currentLocation } = route.params;
        setRestaurant(item);
        setCurrentLocation(currentLocation);
    })

    const RenderHeader = () => {
        return (
            <View style={{ flexDirection: "row", height: 50, }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        justifyContent: "center",
                        paddingLeft: SIZES.padding * 2,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,

                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{
                        height: "100%",
                        backgroundColor: COLORS.lightGray3,
                        borderRadius: SIZES.radius,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        justifyContent: "center",
                        paddingRight: SIZES.padding * 2,
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,

                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    // const RenderFoodInfo = () => {
    //     return (
    //         <ScrollView
    //             horizontal
    //             pagingEnabled
    //             showsHorizontalScrollIndicator={false}
    //             scrollEventThrottle={16}
    //             snapToAlignment="center"
    //             onScroll={() => setSlideIndex(slideIndex + 1)}
    //         >
    //             {
    //                 restaurant?.menu.map((item, index) => (
    //                     <View
    //                         key={`menu-${index}`}
    //                         style={{
    //                             alignItems: "center"
    //                         }}
    //                     >
    //                         <View
    //                             style={{ height: SIZES.height * 0.35 }}
    //                         >
    //                             <Image
    //                                 source={item.photo}
    //                                 resizeMode="cover"
    //                                 style={{
    //                                     width: SIZES.width,
    //                                     height: "100%"
    //                                 }}
    //                             />

    //                             <View
    //                                 style={{
    //                                     flexDirection: "row",
    //                                     position: "absolute",
    //                                     bottom: -20,
    //                                     width: SIZES.width,
    //                                     height: 50,
    //                                     justifyContent: "center"

    //                                 }}
    //                             >
    //                                 <TouchableOpacity
    //                                     style={{
    //                                         width: 50,
    //                                         backgroundColor: COLORS.white,
    //                                         justifyContent: "center",
    //                                         alignItems: "center",
    //                                         borderTopLeftRadius: 25,
    //                                         borderBottomLeftRadius: 25,
    //                                     }}
    //                                 >
    //                                     <Text style={{ ...FONTS.body1 }}>-</Text>
    //                                 </TouchableOpacity>
    //                                 <View
    //                                     style={{
    //                                         width: 50,
    //                                         backgroundColor: COLORS.white,
    //                                         justifyContent: "center",
    //                                         alignItems: "center",
    //                                     }}
    //                                 >
    //                                     <Text style={{ ...FONTS.h2 }}>5</Text>

    //                                 </View>
    //                                 <TouchableOpacity
    //                                     style={{
    //                                         width: 50,
    //                                         backgroundColor: COLORS.white,
    //                                         justifyContent: "center",
    //                                         alignItems: "center",
    //                                         borderTopRightRadius: 25,
    //                                         borderBottomRightRadius: 25,
    //                                     }}
    //                                 >
    //                                     <Text style={{ ...FONTS.body1 }}>+</Text>
    //                                 </TouchableOpacity>
    //                             </View>
    //                         </View>
    //                         <View
    //                             style={{
    //                                 width: SIZES.width,
    //                                 alignItems: "center",
    //                                 marginTop: 15,
    //                                 paddingHorizontal: SIZES.padding * 2,

    //                             }}
    //                         >
    //                             <Text
    //                                 style={{
    //                                     marginVertical: 10,
    //                                     textAlign: "center",
    //                                     ...FONTS.h2
    //                                 }}
    //                             > {item.name} = {item.price.toFixed(2)}</Text>
    //                             <Text style={{ ...FONTS.body2 }}>{item.description}</Text>
    //                         </View>
    //                         <View
    //                             style={{
    //                                 flexDirection: "row",
    //                                 marginTop: 10,
    //                             }}
    //                         >
    //                             <Image
    //                                 source={icons.fire}
    //                                 resizeMode="contain"
    //                                 style={{
    //                                     width: 20,
    //                                     height: 20,
    //                                     marginRight: 10,
    //                                 }}
    //                             />
    //                             <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
    //                                 {item.calories.toFixed(2)} cal
    //                             </Text>

    //                         </View>
    //                     </View>
    //                 ))
    //             }

    //         </ScrollView>
    //     )
    // }
    const RenderFoodInfo = () => {
        return (
            <View style={styles.slideContainer}>
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={(slideIndex === index + 1) ? styles.slideVisible : styles.slideInvisible}
                        >
                            <View
                                style={{ height: SIZES.height * 0.35 }}
                            >
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        position: "absolute",
                                        bottom: -20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: "center"

                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25,
                                        }}
                                        onPress={() => EditOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>

                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25,
                                        }}
                                        onPress={() => EditOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: "40%",
                                        alignSelf: "flex-start",
                                        padding: SIZES.padding,
                                        color: COLORS.white,
                                        backgroundColor: COLORS.black,
                                        opacity: .5,
                                        borderTopRightRadius: SIZES.radius,
                                        borderBottomRightRadius: SIZES.radius,

                                    }}
                                    onPress={prevSlide}
                                >
                                    <Text>Prev</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: "40%",
                                        right: 0,
                                        alignSelf: "flex-start",
                                        padding: SIZES.padding,
                                        color: COLORS.white,
                                        backgroundColor: COLORS.black,
                                        opacity: .5,
                                        borderTopLeftRadius: SIZES.radius,
                                        borderBottomLeftRadius: SIZES.radius,

                                    }}
                                    onPress={nextSlide}
                                >
                                    <Text>next</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: "center",
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2,

                                }}
                            >
                                <Text
                                    style={{
                                        marginVertical: 10,
                                        textAlign: "center",
                                        ...FONTS.h2
                                    }}
                                > {item.name} = {item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.body2 }}>{item.description}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 10,
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10,
                                    }}
                                />
                                <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                                    {item.calories.toFixed(2)} cal
                                </Text>

                            </View>
                        </View>
                    ))
                }

            </View>
        )
    }
    const RenderDots = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {
                    Array.from({ length: restaurant?.menu.length }).map((dot, index) => {
                        console.log("e");
                        return (
                            <View
                                key={index}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 4,
                                    padding: (slideIndex === index + 1) ? 5 : 3,
                                    backgroundColor: (slideIndex === index + 1) ? COLORS.primary : COLORS.darkgray

                                }}
                            >
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    const RenderOrder = () => {
        return (
            <View
            // style={{
            //     position:"absolute",
            //     bottom:0,
            // }}
            >
                {RenderDots()}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,

                    }}

                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: SIZES.padding * 3,
                            paddingVertical: SIZES.padding * 2,
                            borderBottomColor: COLORS.lightGray3,
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in  cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: SIZES.padding * 3,
                            paddingVertical: SIZES.padding * 2,
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * .9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius,
                                alignItems: "center",
                            }}
                            onPress={()=> navigation.navigate('orderDelivery', {
                                restaurant:restaurant,
                                currentLocation:currentLocation
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {isIphoneX() &&
                    <View
                        style={{
                            position: "absolute",
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    ></View>
                }
            </View>
        )
    }
    const EditOrder = (action, menuId, price) => {
        let orderList = orderItem.slice();
        let item = orderList.filter(i => i.menuId == menuId);

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1;
                item[0].qty = newQty;
                item[0].total = item[0].qty * price;
            }
            else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price,
                }
                orderList.push(newItem);
            }
            setOrderItem(orderList);
        }
        else{
            if(item.length > 0){
                if(item[0]?.qty > 0){
                    let newQty = item[0].qty - 1;
                    item[0].qty = newQty;
                    item[0].total = item[0].qty * price;
                }
            }
            setOrderItem(orderList);
        }
    }
    const getOrderQty = (menuId) => {
        let orderItm = orderItem.filter(i => i.menuId == menuId);
        if (orderItm.length > 0) {
            return orderItm[0].qty;
        }
        else {
            return 0;
        }
    }
    const getBasketItemCount = () =>{
        let itemCount = orderItem.reduce((a,b)=> a + (b.qty || 0), 0);
        return itemCount;
    }
    const sumOrder = () => {
        let total = orderItem.reduce((a,b) => a + (b.total || 0), 0);
        return total;
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderFoodInfo()}
            {RenderOrder()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    slideContainer: {
        width: "100%",
    },
    slideInvisible: {
        display: "none",
        alignItems: "center",
    },
    slideVisible: {
        display: "flex",
        alignItems: "center",
    }
})

export default Restaurants
