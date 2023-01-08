import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { theme } from "../../core/theme";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import call from "react-native-phone-call";

function CustomMarker() {
  return (
    <View style={styles.marker}>
      <Text style={styles.text}>You</Text>
    </View>
  );
}

const triggerCall = (num) => {
  const args = {
    number: `${num}`,
    prompt: true,
    skipCanOpen: true,
  };
  call(args).catch(console.error);
};

export default function ShopLocation({ navigation }) {
  const result = navigation.getParam("result");

  const destination = {
    latitude: result.location.coordinates[1],
    longitude: result.location.coordinates[0],
  };

  const GOOGLE_MAPS_APIKEY = "AIzaSyCw9TUCbz3ThruzHYOPe7vJQKe4yjl9i1I";
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const origin = { latitude: 31.431815, longitude: 74.245193 };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  //  console.log(location);
  return (
    <>
      <View style={styles.container0}>
        <ImageBackground
          source={require("../../assets/background_dot.png")}
          resizeMode="repeat"
          style={styles.backgroundImg}
        >
          <Text style={styles.header}>Shop Location</Text>

          <View style={styles.container01}>
            <View style={styles.textContainer}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Entypo name="shop" size={40} color={theme.colors.primary} />
                <Text style={styles.textButton}>{result.name}</Text>
              </View>

              <Text>
                Address:{"\n"}
                {"\n"}Number
              </Text>
              <Text>
                {result.address}
                {"\n"}
                {"\n"}+{result.phone}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buton}
                onPress={() => triggerCall(result.phone)}
              >
                <FontAwesome name="phone" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: 31.582045,
            longitude: 74.329376,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && (
            <Marker coordinate={location}>
              <CustomMarker />
            </Marker>
          )}

          <Marker coordinate={destination} />
          {location && (
            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="#0F85FB"
            />
          )}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    alignSelf: "center",
    marginTop: "1%",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container0: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  container01: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F3F4",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    height: "65%",
    width: "100%",
  },
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-around",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    width: "30%",
    height: "80%",
    backgroundColor: theme.colors.primary,
  },
  textButton: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  marker: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
