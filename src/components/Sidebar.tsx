import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

const { width } = Dimensions.get('window');

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  currentRoute?: string;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'home',
    route: '/(dashboard)/home',
  },
  {
    id: 'students',
    title: 'Students',
    icon: 'people',
    route: '/(dashboard)/student',
  },
  { id: 'seats', title: 'Seats', icon: 'grid', route: '/(dashboard)/seatmap' },
  {
    id: 'report',
    title: 'Report',
    icon: 'bar-chart',
    route: '/(dashboard)/report',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    icon: 'wallet',
    route: '/(dashboard)/revenue',
  },
  { id: 'messages', title: 'Messages', icon: 'chatbubble', route: '/messages' },
  { id: 'profile', title: 'Profile', icon: 'person-circle', route: '/profile' },
  { id: 'settings', title: 'Settings', icon: 'settings', route: '/settings' },
  {
    id: 'help',
    title: 'Help and Support',
    icon: 'help-circle',
    route: '/help',
  },
  { id: 'logout', title: 'Logout', icon: 'log-out', route: '/logout' },
];

export default function Sidebar({
  isVisible,
  onClose,
  currentRoute,
}: SidebarProps) {
  const { logout } = useAuthStore();
  const slideAnim = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.id === 'logout') {
      // Handle logout logic here
      logout();
      router.replace('/auth');
    } else {
      router.push(item.route as any);
    }
    onClose();
  };

  const getActiveRoute = () => {
    if (!currentRoute) return 'dashboard';

    if (currentRoute.includes('home')) return 'dashboard';
    if (currentRoute.includes('student')) return 'students';
    if (currentRoute.includes('seatmap')) return 'seats';
    if (currentRoute.includes('report')) return 'report';
    if (currentRoute.includes('revenue')) return 'revenue';

    return 'dashboard';
  };

  const activeRoute = getActiveRoute();

  return (
    <>
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.branding}>
          <Text style={styles.appName}>Librify</Text>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => {
            const isActive = item.id === activeRoute;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.activeMenuItem]}
                onPress={() => handleMenuItemPress(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isActive ? Colors.primary : Colors.textSecondary}
                />
                <Text
                  style={[styles.menuText, isActive && styles.activeMenuText]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  branding: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  caret: {
    fontSize: 16,
    color: Colors.primary,
  },
  menuContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: '#E8F5E8',
  },
  menuText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 16,
    fontWeight: '500',
  },
  activeMenuText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
