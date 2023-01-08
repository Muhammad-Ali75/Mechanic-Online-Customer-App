import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import UserOrder from "../core/api/UserOrder";
import { theme } from "../core/theme";

const Waititng = ({ navigation }) => {
  const [status, setStatus] = useState("requested");
  const orderID = navigation.getParam("orderID");
  const shop = navigation.getParam("shop");
  const order = navigation.getParam("order");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(113);
      getStatus();
    }, 10000);
    console.log(111);

    return () => {
      clearInterval(intervalId);
      console.log(112);
    };
  }, []);

  const getStatus = async () => {
    try {
      const response = await UserOrder.post("/getById", {
        _id: orderID,
      });
      // console.log(response.data.data);
      setResult(response.data.data);
      setStatus(response.data.data.status);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  const cancleOrder = async () => {
    try {
      const responce = await UserOrder.post("/cancle", {
        _id: orderID,
      });
      console.log(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  const OnTrackPressed = () => {
    navigation.navigate("Maps", {
      orderID: orderID,
      shop: result,
      order: order,
    });
  };
  const OnCanclePressed = async () => {
    await cancleOrder();
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        {status === "assigned" ? (
          <Text style={styles.header}>Mechanic is assigned</Text>
        ) : (
          <Text style={styles.header}>
            Order requested{"\n"}Waiting for Approval
          </Text>
        )}
        {status === "assigned" ? (
          <TouchableOpacity style={styles.buton} onPress={OnTrackPressed}>
            <Text style={styles.textButton}>Go to Track</Text>
          </TouchableOpacity>
        ) : null}
        {status === "mechanic_not_available" ? (
          <Text style={styles.header}>
            Mechanic is not avaiable{"\n"}
            {"\n"}Wait...{"\n"}or
          </Text>
        ) : null}

        <TouchableOpacity style={styles.buton} onPress={OnCanclePressed}>
          <Text style={styles.textButton}>Cancle Order</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
  },
  buton: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: 60,
    backgroundColor: theme.colors.primary,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "center",
    color: "white",
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: theme.colors.primary,
    textAlign: "center",
    margin: 40,
    marginTop: 250,
  },
});

export default withNavigation(Waititng);
