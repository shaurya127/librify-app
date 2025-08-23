import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { View } from 'react-native';

export default function IndexScreen() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return <View />;
}