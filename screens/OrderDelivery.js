import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { icons, images, FONTS, COLORS, SIZES, GOOGLE_API_KEY } from '../constants';

const OrderDelivery = ({ navigation, route }) => {
    const mapView = useRef();
    const [restaurant, setRestaurant] = useState(null);
    const [streetName, setStreetName] = useState("");
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [duaration, setDuaration] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        let { restaurant, currentLocation } = route.params;

        let fromLoc = currentLocation.gps;
        let toLoc = restaurant.location;
        let street = currentLocation.streetName;

        console.log("ttt", toLocation, "  ", fromLocation);

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
        }

        setRestaurant(restaurant);
        setStreetName(street);
        setToLocation(toLoc);
        setFromLocation(fromLoc);
        setRegion(mapRegion);
        
    }, []);

    const ZoomIn = () => {
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta /2,
            longitudeDelta: region.longitudeDelta /2,
        }
        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion,200);
    }
    
    const ZoomOut = () => {
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta*2,
            longitudeDelta: region.longitudeDelta*2,
        }
        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion,200);

    }
    
    const CalculateAngle = (coordinates) => {
        let startLat = coordinates[0]["latitude"];
        let startLon = coordinates[0]["longitude"];
        let endLat = coordinates[1]["latitude"];
        let endLon = coordinates[1]["longitude"]
        let dx = endLat - startLat;
        let dy = endLon - startLon;

        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    const RenderMap = () => {
        const RenderMarker = () => {
            return (
                <Marker
                    coordinate={toLocation}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.white
                        }}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.primary
                            }}
                        >
                            <Image
                                source={icons.pin}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.white
                                }}
                            />
                        </View>
                    </View>
                </Marker>
            )
        }

        const RenderCarIcon = () => {
            return (
                <Marker
                    coordinate={fromLocation}
                    anchor={{ x: 0.5, y: 0.5 }}
                    flat={true}
                    rotation={angle}
                >
                    <Image
                        source={icons.car}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />

                </Marker>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={region}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={COLORS.primary}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuaration(result.duaration);
                            //Fit Route Into Map
                            if (!isReady) {
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })
                            }
                            //Repositioning The Car
                            let nextLoc = {
                                latitude: (result.coordinates[0]["latitude"]),
                                longitude: (result.coordinates[0]["longitude"])
                            }

                            if (result.coordinates.length > 2) {
                                let angle = CalculateAngle(result.coordinates);
                                setAngle(angle);
                            }
                            setFromLocation(nextLoc);
                            setIsReady(true);
                        }}
                    />
                    {RenderMarker()}
                    {RenderCarIcon()}
                </MapView>
            </View>
        )
    };

    const RenderDestinationHeader = () => {
        return (
            <View
                style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: SIZES.width * .9,
                        paddingHorizontal: SIZES.padding * 2,
                        paddingVertical: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                    }}
                >
                    <Image
                        source={icons.red_pin}
                        style={{
                            width: 30,
                            height: 30,
                            padding: SIZES.padding,
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
                    </View>
                    <Text style={{ ...FONTS.body3 }}>{Math.ceil(duaration)} mins</Text>

                </View>
            </View>
        )
    }

    const RenderDeliveryInfo = () => {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 30,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: SIZES.width * .9,
                        paddingHorizontal: SIZES.padding * 2,
                        paddingVertical: SIZES.padding * 3,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={restaurant?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                            }}
                        />
                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        source={icons.star}
                                        style={{
                                            width: 18,
                                            height: 18,
                                            tintColor: COLORS.primary,
                                            marginRight: SIZES.padding,
                                        }}
                                    />
                                    <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>

                                </View>
                            </View>
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: SIZES.padding * 2,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex:1,
                                height: 50,
                                marginRight:5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.primary,
                                borderRadius: 10,
                            }}
                            onPress={()=>{}}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex:1,
                                height: 50,
                                marginLeft:5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.secondary,
                                borderRadius: 10,
                            }}
                            onPress={()=>{}}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        )
    }
    
    const RenderButtons = () =>{
        return(
            <View
                style={{
                    position:"absolute",
                    bottom:SIZES.height*.35,
                    right:SIZES.padding*2,
                    justifyContent:"space-between",
                    width:60,
                    height:130,
                }}
            >
                <TouchableOpacity
                    style={{
                        width:60,
                        height:60,
                        borderRadius:30,
                        justifyContent:"center",
                        alignItems:"center",
                        backgroundColor:COLORS.white,
                    }}
                    onPress={()=> ZoomIn()}
                >
                    <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width:60,
                        height:60,
                        borderRadius:30,
                        justifyContent:"center",
                        alignItems:"center",
                        backgroundColor:COLORS.white,
                    }}
                    onPress={()=> ZoomOut()}
                >
                    <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {RenderMap()}
            {RenderDestinationHeader()}
            {RenderDeliveryInfo()}
            {RenderButtons()}
        </View>

    )
}

export default OrderDelivery
