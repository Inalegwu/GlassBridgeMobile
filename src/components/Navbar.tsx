import { Feather } from "@expo/vector-icons";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, Pressable } from "native-base";

export default function Navbar() {
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus();
  return (
    <HStack>
      <Pressable
        onPress={() => {
          isDrawerOpen === "open"
            ? navigation.openDrawer()
            : navigation.closeDrawer();
        }}
        p={3}
        bg="primary.200"
        rounded="md"
      >
        <Icon as={<Feather />} name="menu" size={6} color="white" />
      </Pressable>
    </HStack>
  );
}
