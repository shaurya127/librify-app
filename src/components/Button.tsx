import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const backgroundColor = useThemeColor(
    {
      light: variant === 'primary' ? '#007AFF' : variant === 'danger' ? '#FF3B30' : '#F2F2F7',
      dark: variant === 'primary' ? '#0A84FF' : variant === 'danger' ? '#FF453A' : '#2C2C2E',
    },
    'background'
  );

  const textColor = useThemeColor(
    {
      light: variant === 'secondary' ? '#000000' : '#FFFFFF',
      dark: variant === 'secondary' ? '#FFFFFF' : '#FFFFFF',
    },
    'text'
  );

  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[size],
        { backgroundColor: isDisabled ? '#C7C7CC' : backgroundColor },
        { opacity: pressed && !isDisabled ? 0.8 : 1 },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <ThemedText 
        style={[
          styles.text, 
          styles[`${size}Text`], 
          { color: textColor }
        ]}
      >
        {loading ? 'Loading...' : title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
