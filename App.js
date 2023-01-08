import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import FindMechanic from "./src/screens/FindMechanic";
import AddReview from "./src/screens/AddReview";
import Order from "./src/screens/Order";
import InProcess from "./src/screens/InProcess";
import MapScreen from "./src/screens/MapScreen";
import VisitMechanic from "./src/screens/Visit Mechanic/VistMechanic";
import ConfirmDetails from "./src/screens/ConfirmDetails";
import ConfirmLocation from "./src/screens/ConfirmLocation";
import ServiceList from "./src/screens/ServiceList";
import Waiting from "./src/screens/Waiting";
import { LoginScreen, RegisterScreen } from "./src/screens";
import { LogBox } from "react-native";
import ShopLocation from "./src/screens/Visit Mechanic/ShopLocation";
import Chat from "./src/screens/Chat/Chat";
import ImagePicker from "./src/screens/Chat/ImagePicker";

LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  "componentWillReceiveProps has been renamed",
]);

const navigator = createStackNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    Find: FindMechanic,
    Process: InProcess,
    Service: ServiceList,
    Confirm: ConfirmDetails,
    ConfirmLocation: ConfirmLocation,
    Maps: MapScreen,
    Wait: Waiting,
    OrderDetails: Order,
    AdReview: AddReview,
    Chat,
    ImagePicker,

    Visit: VisitMechanic,
    ShopLocation: ShopLocation,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Customer App",
    },
  }
);

export default createAppContainer(navigator);
