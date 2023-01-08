import axios from "axios";
import * as SecureStore from "expo-secure-store";

const UserOrder = axios.create({
  baseURL: "https://mechaniconline.herokuapp.com/api/v1/order",
});

UserOrder.interceptors.request.use(async function (config) {
  const token = await SecureStore.getItemAsync("access_token");
  if (!token) return config;

  config.headers["Authorization"] = token;

  return config;
});

export default UserOrder;
