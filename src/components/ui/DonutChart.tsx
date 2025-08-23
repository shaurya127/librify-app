import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Colors';

interface DonutChartProps {
  data: {
    online: number;
    offline: number;
    other: number;
  };
  size?: number;
  strokeWidth?: number;
  colors?: string[];
}

export default function DonutChart({
  data,
  size = 120,
  strokeWidth = 20,
  colors = ['#FF6B35', '#4ECDC4', '#FFE66D'],
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.online + data.offline + data.other;

  // Calculate stroke dasharray for each segment
  const onlineDash = (data.online / total) * circumference;
  const offlineDash = (data.offline / total) * circumference;
  const otherDash = (data.other / total) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Online segment */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[0]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${onlineDash} ${circumference}`}
          strokeDashoffset={0}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Offline segment */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[1]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${offlineDash} ${circumference}`}
          strokeDashoffset={-onlineDash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Other segment */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[2]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${otherDash} ${circumference}`}
          strokeDashoffset={-(onlineDash + offlineDash)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center text */}
      <View style={[styles.centerText, { width: size, height: size }]}>
        <Text style={styles.totalText}>₹{total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
