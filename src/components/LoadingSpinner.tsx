import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export function LoadingSpinner({ 
  size = 'large', 
  text,
  color 
}: LoadingSpinnerProps) {
  const spinnerColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'text');
  const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#000000' }, 'background');
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator 
        size={size} 
        color={color || spinnerColor} 
      />
      {text && (
        <ThemedText style={styles.text}>
          {text}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
  },
});
