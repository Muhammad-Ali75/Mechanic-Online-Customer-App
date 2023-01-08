import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client";

const socket = io.connect("https://mechaniconline.herokuapp.com/");

const Image_Picker = ({ navigation }) => {
  const [image, setImage] = useState(null);
  //console.log(navigation);

  const pickFromGalary = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!data.cancelled) {
      let newFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`,
      };
      setImage(newFile);
    }
  };
  const pickFromCamera = async () => {
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!data.cancelled) {
      let newFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`,
      };
      setImage(newFile);
    }
  };
  const handleUpload = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "mechanicoline");
    console.log("Before Fetch");
    fetch("https://api.cloudinary.com/v1_1/mechanicoline/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        sendImage(data.secure_url);
        console.log("outside");
        navigation.goBack();
      })
      .catch((err) => {
        alert("An Error Occured While Uploading");
        console.log(err);
      });
  };

  const sendImage = (img) => {
    const messageObject = {
      order_id: "62c60e520509e1d71588dc04",
      image: `${img}`,
      user: "628b4c4bc3b820d70cc31bf7",
    };

    socket.emit("addGallery", messageObject);
    console.log("inside");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <ImageBackground
        source={require("../../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.background}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: -80,
          }}
        >
          <TouchableOpacity style={styles.buton} onPress={pickFromCamera}>
            <FontAwesome name="camera" size={50} color="#560CCE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buton} onPress={pickFromGalary}>
            <MaterialIcons
              name="add-photo-alternate"
              size={70}
              color="#560CCE"
            />
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}

        {image && (
          <TouchableOpacity style={styles.butonSend} onPress={handleUpload}>
            <Text style={styles.textButton}>Send</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  buton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "45%",
    backgroundColor: "white",
    borderColor: "#560CCE",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    paddingRight: 5,
  },
  butonSend: {
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: "10%",
    backgroundColor: "#560CCE",
    borderColor: "#560CCE",
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
    paddingRight: 5,
  },
  textButton: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    color: "white",
  },
});

export default Image_Picker;
