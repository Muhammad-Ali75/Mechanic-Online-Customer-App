import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import Star from "react-native-star-view";
import { withNavigation } from "react-navigation";
import { theme } from "../core/theme";
import Service from "../components/Service";

const ServiceList = ({ navigation }) => {
  const result = navigation.getParam("result");

  if (!result) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      {result && (
        <ImageBackground
          source={require("../assets/background_dot.png")}
          resizeMode="repeat"
          style={styles.backgroundImg}
        >
          <View style={{ flex: 3, backgroundColor: "#E5E7E9" }}>
            <Image style={styles.img} source={{ uri: result.cover }} />
            <Text style={styles.shopTitle}>{result.name}</Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Star score={result.ratings} style={styles.starStyle} />
            </View>
          </View>
          <View style={{ flex: 4 }}>
            <ScrollView style={{ flex: 4, borderBottomWidth: 1 }}>
              <FlatList
                data={result.service_list}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return <Service item={item} results={result} />;
                }}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewService: {
    backgroundColor: "#E5E7E9",
    width: "90%",
    margin: 1,
    borderRadius: 15,
    alignSelf: "center",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  img: {
    height: "65%",
    width: "100%",
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 8,
  },
  textLeft: {
    flex: 3,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 12,
    paddingTop: 10,
    alignSelf: "flex-start",
  },
  textRight: {
    flex: 1,
    fontWeight: "bold",
    alignSelf: "flex-end",
    color: theme.colors.primary,
  },
  starStyle: {
    flex: 3,
    width: 110,
    height: 22,
    marginLeft: 25,
    marginTop: 0,
  },
});

export default withNavigation(ServiceList);
