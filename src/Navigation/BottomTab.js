import { createBottomTabNavigator ,} from '@react-navigation/bottom-tabs';
import { HomeIcon, Cog6ToothIcon, UserCircleIcon, ChatBubbleLeftRightIcon ,DocumentTextIcon,PlusCircleIcon} from 'react-native-heroicons/solid';
import React from 'react';


// Page Imports
import Home from '../Screens/Home/Home';
import AddExpense from '../Screens/AddExpense/AddExpense';
import PastRecords from '../Screens/PastRecords/PastRecords';
import Profile from '../Screens/Profile/Profile';

export default function BottomTab() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          height: 70,
          paddingBottom: 5,
          elevation:10,
        },
        tabBarIcon: ({ focused,color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? (
              <HomeIcon color="#f2ba39" />
            ) : (
              <HomeIcon color="gray" />
            );
          } else if (route.name === 'Profile') {
            iconName = focused ? (
              <UserCircleIcon color="#f2ba39" />
            ) : (
              <UserCircleIcon color="gray" />
            );
          } else if (route.name === 'Chat') {
            iconName = focused ? (
              <ChatBubbleLeftRightIcon color="#f2ba39" />
            ) : (
              <ChatBubbleLeftRightIcon color="gray" />
            );
          } else if (route.name === 'History') {
            iconName = focused ? (
              <DocumentTextIcon color="#f2ba39" />
            ) : (
              <DocumentTextIcon color="gray" />
            );
          } else if (route.name === 'Add Expense') {
            iconName = focused ? (
              <PlusCircleIcon color="#f2ba39" />
            ) : (
              <PlusCircleIcon color="gray" />
            );
          }
          return iconName;
        },
        tabBarLabelStyle: ({focused})=>({
           color: focused ? "#f2ba39" : "black",
        })
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#f2ba39', 
          tabBarInactiveTintColor: 'gray'
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f2ba39', 
          tabBarInactiveTintColor: 'gray'
        }}
      />
      <Tab.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f2ba39', 
          tabBarInactiveTintColor: 'gray'
        }}
      />
      <Tab.Screen
        name="History"
        component={PastRecords}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f2ba39', 
          tabBarInactiveTintColor: 'gray'
        }}
      />

    <Tab.Screen
        name="Chat"
        component={Home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#f2ba39', 
          tabBarInactiveTintColor: 'gray',
          tabBarVisible: false, 
        }}
      />
          
    </Tab.Navigator>
  );
}


