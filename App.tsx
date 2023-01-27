import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Home from "./src/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
