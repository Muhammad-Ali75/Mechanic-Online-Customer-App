import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { ScrollView } from "react-native-virtualized-view";
import UserAPI from "../../core/api/UserAPI";
import { theme } from "../../core/theme";
import { withNavigation } from "react-navigation";
import AllShop from "./AllShop";

const VisitMechanic = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function seacrhApi() {
    try {
      const response = await UserAPI.get("/workshop");
      setResults(response.data.data);
      //console.log(response.data.data);
    } catch (err) {
      setErrorMessage("Something went Wrong");
    }
  }
  async function seacrhApiTerm(name) {
    try {
      const response = await UserAPI.get(`/workshop?name=${name}`);
      setResults(response.data.data);
    } catch (err) {
      setErrorMessage("Something went Wrong");
    }
  }
  useEffect(() => {
    seacrhApi();
  }, []);

  // const renderShop = ({ item }) => (
  //   <Shop
  //     title={item.name}
  //     description={item.description}
  //     star={item.ratings}
  //   />
  // );

  if (!results) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        <SearchBar
          term={term}
          onTermChange={(newTerm) => {
            setTerm(newTerm);
          }}
          onTermSubmit={() => {
            seacrhApiTerm(term);
          }}
        />
        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}

        <ScrollView style={{ flex: 1, borderBottomWidth: 1 }}>
          {results && (
            <FlatList
              data={results}
              keyExtractor={(results) => results._id}
              renderItem={({ item }) => {
                return <AllShop item={item} />;
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

export default withNavigation(VisitMechanic);
