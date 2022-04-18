import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
import ToDo from './app/screens/ToDo';
import Done from './app/screens/Done';
import Task from './app/screens/Task';
import Splash from './app/screens/Splash';
import About from './app/screens/About';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';
import { Provider } from 'react-redux';
import { Store } from './app/components/redux/store';
import colors from './app/misc/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const LoadNoteScreen = props => <NoteScreen {...props} user={user} />;
  const LoadToDo = props => <ToDo {...props} user={user} />;
  const LoadDone = props => <Done {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  const ToDoApp = () => {
    return (
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarActiveTintColor: colors.PRIMARY,
            tabBarInactiveTintColor: '#777777',
            tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
            tabBarPressColor: colors.PRIMARY,
            tabBarIndicatorStyle: { backgroundColor: colors.PRIMARY }
          })
        }
      >
        <Tabs.Screen component={LoadToDo} name='To-Do' options={{ headerShown: false }} />
        <Tabs.Screen component={LoadDone} name='Done' options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  };

  const MainApp = () => {
    return (
      <Tabs.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === 'Memo') {
                iconName = 'sticky-note';
                size = focused ? 25 : 20;
              } else if (route.name === 'ToDo List') {
                iconName = 'clipboard';
                size = focused ? 25 : 20;
              } else if (route.name === 'About') {
                iconName = 'user';
                size = focused ? 25 : 20;
              }
              return (
                <FontAwesome5
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: colors.PRIMARY,
            tabBarInactiveTintColor: '#777777',
            tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' }
          })
        }
      >
        <Tab.Screen component={LoadNoteScreen} name='Memo' 
        options={{tabBarHideOnKeyboard: true,}}/>
        <Tab.Screen component={ToDoApp} name='ToDo List' 
        options={{ tabBarHideOnKeyboard: true, headerShown: false }} />
        <Tab.Screen component={About} name='About' 
        options={{ tabBarHideOnKeyboard: true, headerShown: false }} />
      </Tabs.Navigator>
    );
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <NoteProvider>
          <Stack.Navigator
            screenOptions={{ headerTitle: '', headerTransparent: true }}
          >
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen component={NoteDetail} name='NoteDetail' />
            <Stack.Screen component={Task} name='Task' />
          </Stack.Navigator>
        </NoteProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});