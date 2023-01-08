import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign } from "@expo/vector-icons";
import UserAPI from "../../core/api/UserAPI";
import { theme } from "../../core/theme";
import { withNavigation } from "react-navigation";

const AllShop = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ShopLocation", { result: item })}
    >
      <View style={styles.view}>
        <ImageBackground
          source={{ uri: item.cover }}
          style={styles.background}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 3, paddingLeft: 5 }}>
            <Text style={styles.textLeft}>{item.name}</Text>
            <Text style={{ marginLeft: 20, marginBottom: 5 }}>
              {item.description}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 17,
                alignItems: "center",
              }}
            >
              <AntDesign name="star" size={17} color="#FFC300" />
              <Text style={styles.textRight}>{item.ratings}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

export default withNavigation(AllShop);
