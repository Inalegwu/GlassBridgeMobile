import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  ScrollView,
  Pressable,
  Fab,
  Icon,
  Input,
  Spinner,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { ActivityIndicator } from "react-native";

const Tasks = [
  {
    id: 1,
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet",
  },
];

export default function Home() {
  const db = SQLite.openDatabase("notes.db");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks",
        null,
        (txObj, resultSet) => setTasks(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  const addName = () => {
    console.log("Adding Task...");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tasks (title) values(?)",
        [newTask],
        (txObj, resultSet) => {
          let existingTasks = [...tasks];
          existingTasks.push({ id: resultSet.insertId, title: newTask });
          setTasks(existingTasks);
        }
      );
    });
  };

  const DeleteTask = (id: number) => {
    console.log("Deleting Task...");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tasks WHERE id=?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingTasks = [...tasks].filter((name) => name.id != id);
            setTasks(existingTasks);
          }
        },
        (txObj, err) => {
          console.log(err);
        }
      );
    });
  };

  return (
    <Box w="full" h="full" bg="gray.200">
      <VStack w="full" justifyContent="flex-end" bg="darkBlue.800" h="2/6">
        <Heading ml={5} fontSize="3xl" mb={1} color="white" fontWeight="bold">
          Welcome Back , Ina
        </Heading>
        <Text color="gray.400" fontSize="lg" ml={5} mb={3}>
          How Was Your Day ?
        </Text>
        {isVisible === true ? (
          <Input
            bg="white"
            p={2}
            borderWidth={0}
            rounded="md"
            placeholder="New Task"
            ml={5}
            mr={5}
            mb={5}
            onChangeText={(e) => {
              setNewTask(e);
            }}
          />
        ) : (
          <></>
        )}
      </VStack>
      <Box w="full" h="full" bg="gray.100">
        <ScrollView w="full" h="full" p={4}>
          {isLoading === true ? (
            <ActivityIndicator size={10} />
          ) : (
            <>
              {tasks?.map((task) => {
                return (
                  <Box
                    key={task.id}
                    bg="white"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    justifyItems="center"
                    alignItems="center"
                    rounded="md"
                    mt={2}
                    p={3}
                  >
                    <Heading fontSize="md" color="darkBlue.800">
                      {task.title}
                    </Heading>
                    <Pressable
                      onPress={() => {
                        DeleteTask(task.id);
                      }}
                      bg="red.400"
                      p={2}
                      rounded="md"
                    >
                      <Text color="red.100">Delete</Text>
                    </Pressable>
                  </Box>
                );
              })}
            </>
          )}
        </ScrollView>
        <Fab
          bg="darkBlue.800"
          _pressed={{ bg: "darkBlue.700" }}
          p={5}
          onPress={() => {
            isVisible === true
              ? (addName(), setIsVisible(false))
              : setIsVisible(true);
          }}
          icon={
            isVisible === false ? (
              <Icon as={<Feather />} size={5} name="plus" color="white" />
            ) : (
              <Icon as={<Feather />} name="check" color="white" size={5} />
            )
          }
        />
      </Box>
    </Box>
  );
}
