import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useCallback } from 'react';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
    router.replace('/auth');
  }, [logout]);

  const displayName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'User';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to hamsey!</Text>
        <Text style={styles.subtitle}>
          Welcome, {displayName}!
        </Text>
        <Text style={styles.phone}>
          {user?.phone}
        </Text>
        
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  phone: {
    fontSize: 14,
    color: '#999',
    marginBottom: 48,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  logoutText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
});