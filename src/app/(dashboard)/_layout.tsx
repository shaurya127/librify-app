import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';

// Import screens
import DashboardHome from './home';
import StudentScreen from './student';
import SeatmapScreen from './seatmap';
import ReportScreen from './report';
import RevenueScreen from './revenue';

const Tab = createBottomTabNavigator();

export default function DashboardLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={DashboardHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="student"
        component={StudentScreen}
        options={{
          tabBarLabel: 'Student',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="seatmap"
        component={SeatmapScreen}
        options={{
          tabBarLabel: 'Seatmap',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="report"
        component={ReportScreen}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="revenue"
        component={RevenueScreen}
        options={{
          tabBarLabel: 'Revenue',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
