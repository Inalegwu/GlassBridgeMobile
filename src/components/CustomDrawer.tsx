import { DrawerItemList } from "@react-navigation/drawer";
import { Box, Heading, Icon, IconButton, VStack, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  return (
    <Box w="full" h="full" bg="gray.200">
      <Box h="2/6" bg="darkBlue.800" mb={4}>
        <VStack p={3} justifyContent="flex-end" h="full" w="full">
          <Box>
            <Heading color="white" fontSize="3xl">
              GlassBridge
            </Heading>
            <Text fontSize="sm" ml={1} color="gray.300">
              Welcome Back
            </Text>
          </Box>
        </VStack>
      </Box>
      <DrawerItemList {...props} />
    </Box>
  );
}
