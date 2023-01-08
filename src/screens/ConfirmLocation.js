import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { theme } from "../core/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { withNavigation } from "react-navigation";
import UserOrder from "../core/api/UserOrder";

const ConfirmLocation = ({ navigation }) => {
  const [pin, setPin] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [res, setRes] = useState();
  const shop = navigation.getParam("results");
  const service = navigation.getParam("service");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let loc = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      setLocation(loc);
    })();
  }, []);

  const orderCreate = async () => {
    try {
      const response = await UserOrder.post("/request", {
        lat: location.lat,
        lng: location.lng,
        order_items: [{ service: service._id, quantity: 1 }],
        workshop: shop._id,
        travel_charge: 150,
        repair_cost: service.price + 150,
      });
      setRes(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  const OnConfirmPressed = async () => {
    let status = await orderCreate();
    console.log(status);
    if (status) {
      navigation.navigate("Wait", {
        orderID: status.id,
        shop: shop,
        order: res,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={setPin}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: 31.582045,
          longitude: 74.329376,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.markerFixed}>
        <Ionicons name="location-sharp" size={50} color="red" />
      </View>

      {location && (
        <TouchableOpacity style={styles.buton} onPress={OnConfirmPressed}>
          <Text style={styles.textButton}>Confirm Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: 60,
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    top: "83%",
    left: "20%",
  },
  textButton: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  marker: {
    height: 50,
    width: 50,
  },

  markerFixed: {
    left: "50%",
    marginLeft: -25,
    marginTop: -49,
    position: "absolute",
    top: "50%",
  },
});

export default withNavigation(ConfirmLocation);
