import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Pressable,
  Fab,
  Icon,
  Input,
  HStack,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { Task } from "../utils/types";
import TaskItem from "../components/TaskItem";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }: any) {
  const db = SQLite.openDatabase("tasks.db");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)"
      );
    });

    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM tasks",
        null,
        (txObj, resultSet) => setTasks(resultSet.rows._array),
        (txObj, error) => {
          console.log(error);
        }
      )
    );

    setIsLoading(false);
  }, []);

  const addTask = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tasks (title) values(?)",
        [newTask],
        (txObj, resultSet) => {
          let existingTasks = [...tasks];
          existingTasks.push({ id: resultSet.insertId, title: newTask });
          setTasks(existingTasks);
        },
        (txObj, error): any => {
          console.log("SQLITE ERROR : ", error);
        }
      );
    });
  };

  const DeleteTask = (task: Task) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tasks WHERE id=?",
        [task.id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingTasks = [...tasks].filter((name) => name.id != task.id);
            setTasks(existingTasks);
          }
        },
        (txObj, error): any => {
          console.log(error);
        }
      );
    });
  };

  return (
    <Box w="full" h="full" bg="gray.200">
      <Box w="full" h="full" bg="gray.200">
        <VStack
          w="full"
          justifyContent="space-between"
          bg="darkBlue.800"
          h="2/6"
        >
          <HStack w="full" mt={10} p={1}>
            <Pressable
              p={2}
              rounded="md"
              ml={3}
              onPress={() => {
                drawerOpen === false
                  ? (setDrawerOpen(true), navigation.openDrawer())
                  : (setDrawerOpen(false), navigation.closeDrawer());
              }}
            >
              <Icon as={<Feather />} name="menu" size={6} color="white" />
            </Pressable>
          </HStack>
          <Box>
            <Heading
              ml={5}
              fontSize="3xl"
              mb={1}
              color="white"
              fontWeight="bold"
            >
              Welcome Back , Ina
            </Heading>
            <Text color="gray.400" fontSize="lg" ml={5} mb={3}>
              Here are your tasks for today
            </Text>
          </Box>
        </VStack>
        <Box w="full" h="full" bg="gray.100">
          {isVisible === true ? (
            <Input
              bg="none"
              p={1.5}
              borderWidth={0}
              borderBottomColor="gray.400"
              borderBottomWidth={1}
              _focus={{ bg: "none", borderBottomColor: "darkBlue.800" }}
              mt={4}
              ml={3}
              mr={3}
              placeholder="New Task"
              mb={5}
              onChangeText={(e) => {
                setNewTask(e);
              }}
            />
          ) : (
            <></>
          )}
          <ScrollView ref={scrollRef} style={styles.scrollView}>
            {isLoading === true ? (
              // <Spinner size={10} borderColor="darkBlue.800" />
              <ActivityIndicator size={10} />
            ) : (
              <>
                {tasks?.map((task: Task) => {
                  return (
                    <TaskItem
                      task={task}
                      key={task.id}
                      simultaneousHandlers={scrollRef}
                      onDismiss={DeleteTask}
                    />
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
                ? (addTask(), setIsVisible(false))
                : setIsVisible(true);
            }}
            icon={
              isVisible === false ? (
                <Icon as={<Entypo />} size={5} name="plus" color="white" />
              ) : (
                <Icon as={<Entypo />} name="check" color="white" size={5} />
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 5,
  },
});
