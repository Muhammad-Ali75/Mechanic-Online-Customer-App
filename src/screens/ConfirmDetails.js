import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { theme } from "../core/theme";
import { withNavigation } from "react-navigation";

const ConfirmDetails = ({ navigation }) => {
  const [paymentStatus, setPaymentStatus] = useState("Cash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const result = navigation.getParam("results");
  const service = navigation.getParam("service");

  return (
    <ImageBackground
      source={require("../assets/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <View style={styles.screeenContainer}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            Confirm Details!
          </Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <Text
            style={{
              margin: 5,
              fontSize: 16,
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            Payment Method
          </Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setPaymentStatus("Cash")}
          >
            <RadioButton
              value="Cash"
              status={paymentStatus === "Cash" ? "checked" : "unchecked"}
              onPress={() => setPaymentStatus("Cash")}
            />
            <Text style={styles.radioButtonText}>Cash</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.radioButton}
            onPress={() => setPaymentStatus('Credit')
            }>
                <RadioButton
                value="Credit"
                status={ paymentStatus === 'Credit' ? 'checked' : 'unchecked' }
                onPress={() => setPaymentStatus('Credit')}
                />
                <Text style={styles.radioButtonText}>Credit/Debit Card</Text>
            </TouchableOpacity> */}
        </View>
        <View style={styles.personalDetailsContainer}>
          <Text
            style={{
              alignSelf: "flex-start",
              color: theme.colors.primary,
              marginLeft: 15,
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 16,
              paddingVertical: 5,
            }}
          >
            Personal Detail
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginHorizontal: 10,
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 20,
              }}
            >
              Phone:
            </Text>
            <TextInput
              style={styles.textInput}
              label="Contact Number"
              value={phoneNumber}
              keyboardType="number-pad"
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          {/* <TouchableOpacity style={styles.buton} onPress={() => navigation.navigate('Components')}>
                    <Text style={styles.textButton}>Update</Text>
                </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={styles.butonFinal}
          onPress={() =>
            navigation.navigate("ConfirmLocation", {
              results: result,
              service: service,
            })
          }
        >
          <Text style={styles.textFinalButton}>Review Location</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  screeenContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  radioButtonContainer: {
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "space-around",
    padding: 10,
    width: "90%",
    color: theme.colors.primary,
  },
  radioButton: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  radioButtonText: {
    paddingTop: 1,
    alignSelf: "center",
  },
  personalDetailsContainer: {
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  textInput: {
    width: "60%",
    height: 50,
    margin: 5,
    borderRadius: 5,
  },
  buton: {
    alignSelf: "center",
    width: "40%",
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  butonFinal: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
    borderRadius: 15,
    padding: 15,
  },
  textFinalButton: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default withNavigation(ConfirmDetails);
