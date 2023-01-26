import { NativeBaseProvider } from "native-base";
import Home from "./src/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
