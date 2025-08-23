import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SecureIconProps {
  size?: number;
  color?: string;
}

export const SecureIcon: React.FC<SecureIconProps> = ({
  size = 24,
  color = '#4CAF50',
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { width: size * 1.5, height: size * 1.5 }]}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C9.5 2 7.5 4 7.5 6.5V8.5H6.5C5.95 8.5 5.5 8.95 5.5 9.5V19.5C5.5 20.05 5.95 20.5 6.5 20.5H17.5C18.05 20.5 18.5 20.05 18.5 19.5V9.5C18.5 8.95 18.05 8.5 17.5 8.5H16.5V6.5C16.5 4 14.5 2 12 2ZM12 4C13.38 4 14.5 5.12 14.5 6.5V8.5H9.5V6.5C9.5 5.12 10.62 4 12 4ZM12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13Z"
            fill={color}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 100,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});