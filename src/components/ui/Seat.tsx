import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export type SeatStatus =
  | 'available'
  | 'booked'
  | 'unavailable'
  | 'morning'
  | 'evening'
  | 'night'
  | 'fullDay';

export interface SeatProps {
  seatNumber: string;
  status: SeatStatus;
  onPress: (seatNumber: string) => void;
  hasNotification?: boolean;
  isSelected?: boolean;
}

const getSeatColor = (status: SeatStatus): string => {
  switch (status) {
    case 'available':
      return '#FFFFFF';
    case 'booked':
      return '#E0E7FF'; // Light blue
    case 'unavailable':
      return '#6B7280'; // Dark grey
    case 'morning':
      return '#FEF3C7'; // Yellow
    case 'evening':
      return '#DBEAFE'; // Light blue
    case 'night':
      return '#F3F4F6'; // Grey
    case 'fullDay':
      return '#D1FAE5'; // Light green
    default:
      return '#FFFFFF';
  }
};

const getSeatBorderColor = (status: SeatStatus): string => {
  switch (status) {
    case 'available':
      return '#E5E7EB';
    case 'booked':
      return '#3B82F6';
    case 'unavailable':
      return '#374151';
    case 'morning':
      return '#F59E0B';
    case 'evening':
      return '#3B82F6';
    case 'night':
      return '#9CA3AF';
    case 'fullDay':
      return '#10B981';
    default:
      return '#E5E7EB';
  }
};

export default function Seat({
  seatNumber,
  status,
  onPress,
  hasNotification,
  isSelected,
}: SeatProps) {
  return (
    <TouchableOpacity
      style={[
        styles.seat,
        {
          backgroundColor: getSeatColor(status),
          borderColor: isSelected ? Colors.primary : getSeatBorderColor(status),
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
      onPress={() => onPress(seatNumber)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.seatNumber,
          { color: status === 'unavailable' ? '#FFFFFF' : Colors.text },
        ]}
      >
        {seatNumber}
      </Text>

      {hasNotification && (
        <View style={styles.notificationIcon}>
          <Text style={styles.notificationText}>🔔</Text>
        </View>
      )}

      {isSelected && (
        <View style={styles.selectedOverlay}>
          <Text style={styles.selectedText}>✕</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  seat: {
    width: 60,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    position: 'relative',
  },
  seatNumber: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  notificationIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
