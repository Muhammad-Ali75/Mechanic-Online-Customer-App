import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { theme } from "../core/theme";
import { ScrollView } from "react-native-virtualized-view";
import UserAPI from "../core/api/UserAPI";
import Header from "../components/Header";
import { withNavigation } from "react-navigation";
import Shop from "../components/Shop";
import * as Location from "expo-location";

const FindMechanic = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(null);

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
      console.log(loc);
    })();
  }, []);

  const searchAPI = async (location) => {
    try {
      const response = await UserAPI.post("/workshop/getNearest", location);
      setResults(response.data.data);
      return response.data;
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went Wrong");
    }
  };

  if (location) {
    const location = {
      lat: 31.431815,
      //just remove this
      lng: 74.245193,
    };
    searchAPI(location);
  }

  if (!results) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        <Header>Mechanics Near You</Header>
        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}

        <ScrollView style={{ flex: 1, borderBottomWidth: 1 }}>
          {results && (
            <FlatList
              data={results}
              keyExtractor={(results) => results._id}
              renderItem={({ item }) => {
                return <Shop item={item} />;
              }}
              scrollEnabled={false}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E5E7E9",
    margin: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "stretch",
    height: 150,
    width: "100%",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  textRight: {
    flex: 1,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  textLeft: {
    flex: 3,
    fontWeight: "bold",
    marginLeft: 12,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
});

export default withNavigation(FindMechanic);
