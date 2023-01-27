import { Feather } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, Pressable, VStack } from "native-base";
import { useState } from "react";

export default function AccountScreen({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Box w="full" h="full" bg="gray.200">
      <VStack
        w="full"
        bg="darkBlue.800"
        h="2/6"
        p={3}
        justifyContent="space-between"
      >
        <HStack w="full">
          <Pressable
            p={4}
            mt={10}
            rounded="md"
            onPress={() => {
              drawerOpen === false
                ? (setDrawerOpen(true), navigation.openDrawer())
                : (setDrawerOpen(false), navigation.closeDrawer());
            }}
          >
            <Icon as={<Feather />} name="menu" size={6} color="white" />
          </Pressable>
        </HStack>
        <Heading color="white" ml={3} fontSize="2xl">
          Account
        </Heading>
      </VStack>
    </Box>
  );
}
