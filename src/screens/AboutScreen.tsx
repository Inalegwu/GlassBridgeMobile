import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Pressable,
  VStack,
  Text,
  Icon,
} from "native-base";
import { Feather } from "@expo/vector-icons";

export default function AboutScreen({ navigation }: any) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box w="full" h="full" bg="gray.200">
      <VStack
        w="full"
        p={3}
        h="2/6"
        bg="darkBlue.800"
        justifyContent="space-between"
      >
        <HStack mt={10}>
          <Pressable
            onPress={() => {
              drawerOpen === false
                ? (setDrawerOpen(true), navigation.openDrawer())
                : (setDrawerOpen(false), navigation.closeDrawer());
            }}
            p={4}
            rounded="md"
          >
            <Icon as={<Feather />} name="menu" size={6} color="white" />
          </Pressable>
        </HStack>
        <Box>
          <Heading color="white">GlassBridge Mobile</Heading>
        </Box>
      </VStack>
      <Box h="4/6" bg="gray.200">
        <Box bg="white" p={3} rounded="md" mt={3} ml={3} mr={3}>
          <Heading color="darkBlue.800">
            GlassBridge Project and Task Management App
          </Heading>
          <Text mt={1} color="darkBlue.800">
            Developed Independently By
          </Text>
          <Text color="darkBlue.800" fontWeight="bold" mt={3}>
            Instagram : @casuallyproperstudios
          </Text>
          <Text color="darkBlue.800" fontWeight="bold" mt={3}>
            Twitter : @the_mobilediff
          </Text>
        </Box>
        <Box bg="white" p={3} rounded="md" mt={3} ml={3} mr={3}>
          <Heading color="darkBlue.800">If You Like The Product</Heading>
          <Text mt={1} color="darkBlue.800">
            Tweet at me For Features you would like to see
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
