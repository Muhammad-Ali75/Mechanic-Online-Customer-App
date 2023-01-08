import React, { useState, useEffect } from "react";
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
import * as FileSystem from "expo-file-system";
import axios from "axios";

const Image_Picker = () => {
  const [image, setImage] = useState(null);

  const cloudinaryUpload = async (pic) => {
    //console.log(pic.uri);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "mechanicoline");
    console.log("DATA", data);
    fetch("https://api.cloudinary.com/v1_1/mechanicoline/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //setPhoto(data.secure_url)
      })
      .catch((err) => {
        alert("An Error Occured While Uploading");
        console.log(err);
      });
    // const res = await axios.post(
    //   "https://api.cloudinary.com/v1_1/mechanicoline/image/upload",
    //   data
    // );
    // console.log(res.data);
    // axios
    //   .post("https://api.cloudinary.com/v1_1/mechanicoline/image/upload", data)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const sendImage = () => {
    const date = Date.now();
    const uri = image;
    const type = "image";
    const name = `${date}`;
    const source = {
      uri: image.uri,
      type: `test/${image.uri.split(".")[1]}`,
      name: `test.${image.uri.split(".")[1]}`,
    };
    cloudinaryUpload(source);
  };

  const checkFileSize = async (fileURI) => {
    const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);
    return fileSizeInBytes;
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    console.log("ORG", result);

    if (!result.cancelled) {
      //const fileSize = await checkFileSize(result.uri);
      setImage(result);
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    // Explore the result
    console.log("ORG", result);

    if (!result.cancelled) {
      const fileSize = await checkFileSize(result.uri);
      setImage(fileSize.uri);
      console.log("COMP", fileSize);
    }
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
          <TouchableOpacity style={styles.buton} onPress={openCamera}>
            <FontAwesome name="camera" size={50} color="#560CCE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buton} onPress={pickImage}>
            <MaterialIcons
              name="add-photo-alternate"
              size={70}
              color="#560CCE"
            />
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        {image && (
          <TouchableOpacity style={styles.butonSend} onPress={sendImage}>
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
