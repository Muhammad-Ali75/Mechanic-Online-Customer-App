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
import { withNavigation } from "react-navigation";
import { theme } from "../core/theme";

const Service = ({ item, results, navigation }) => {
  const result = results;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Confirm", {
          results: result,
          service: item,
        })
      }
    >
      <View style={styles.viewService}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 3, paddingLeft: 5 }}>
            <Text style={styles.textLeft}>{item.title}</Text>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>
              Description: {item.description}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              paddingTop: 17,
              marginRight: 20,
              alignItems: "center",
            }}
          >
            <Text style={styles.textRight}>Rs.{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewService: {
    backgroundColor: "#E5E7E9",
    width: "90%",
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#560CCE",
    alignSelf: "center",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  img: {
    height: 200,
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

export default withNavigation(Service);
