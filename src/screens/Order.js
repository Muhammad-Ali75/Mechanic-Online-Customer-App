import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { theme } from "../core/theme";
import { ScrollView } from "react-native-virtualized-view";
import UserOrder from "../core/api/UserOrder";
import { withNavigation } from "react-navigation";

const friends = [{ name: "Puncture", age: 200 }];
const Service = ({ title, price }) => (
  <View style={styles.view}>
    <Text style={styles.textLeft}>{title}</Text>
    <Text style={styles.textRight}>{price}</Text>
  </View>
);

const Order = ({ navigation }) => {
  // const orderID=navigation.getParam('orderID');
  // const order=navigation.getParam('order');
  // const shop=navigation.getParam('shop');
  // const list=order.order_items;

  const onConfirmPressed = () => {
    navigation.navigate('AdReview');
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        <Text style={styles.header}>Order Details</Text>
        <View style={styles.view}>
          <Text style={styles.textLeft}>
            Order ID:{"\n"}
            {"\n"}Ordered From:
          </Text>
          <Text style={styles.textRight}>
            #abcejkn2{"\n"}
            {"\n"}Honda Motors
          </Text>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 16, padding: 7 }}>
          Services List
        </Text>
        <ScrollView style={{ flex: 1, borderBottomWidth: 1 }}>
          <FlatList
            data={friends}
            keyExtractor={(friends) => friends._id}
            renderItem={({ item }) => {
              return <Service title={item.name} price={item.age} />;
            }}
            scrollEnabled={false}
          />
        </ScrollView>

        <View flexDirection="row">
          <Text style={styles.textLeft}>Total{"\n"}Travel Charges</Text>
          <Text style={styles.textRight}>
            {friends[0].age}
            {"\n"}Rs. 150.
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: "gray",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            width: "100%",
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLeft}>SubTotal:</Text>
          <Text style={styles.textRight}>Rs. {150 + friends[0].age}</Text>
        </View>
        <TouchableOpacity style={styles.buton} onPress={onConfirmPressed}>
          <Text style={styles.buttonText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { flexDirection: "row", justifyContent: "space-between" },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    paddingVertical: 7,
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  buton: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    margin: 12,
    padding: 5,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    alignSelf: "center",
    marginVertical: 30,
  },
  textRight: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 0,
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

export default withNavigation(Order);
