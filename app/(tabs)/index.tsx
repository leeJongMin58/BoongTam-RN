import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// 각 화면 가져오기
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'fish';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            iconName = 'chat';
            return <MaterialCommunityIcons name="chat" size={size} color={color} />;
          } else if (route.name === 'Payment') {
            iconName = 'dollar-sign';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor: '#ff9800', // 활성화 아이콘 색상(orange)
        tabBarInactiveTintColor: '#49454f', //아이콘 색상
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5', // 배경색상
          borderTopWidth: 0, // 상단 경계선 없애기
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
