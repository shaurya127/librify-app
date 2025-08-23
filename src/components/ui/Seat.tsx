import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
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
      return '#FFFFFF'; // White for available seats
    case 'booked':
      return '#E0E7FF'; // Light blue for booked seats
    case 'unavailable':
      return '#6B7280'; // Dark grey for unavailable seats
    case 'morning':
      return '#FEF3C7'; // Yellow for morning shift
    case 'evening':
      return '#DBEAFE'; // Light blue for evening shift
    case 'night':
      return '#F3F4F6'; // Grey for night shift
    case 'fullDay':
      return '#D1FAE5'; // Light green for full day shift
    default:
      return '#FFFFFF';
  }
};

const getSeatBorderColor = (status: SeatStatus): string => {
  switch (status) {
    case 'available':
      return '#E5E7EB'; // Light grey border for available
    case 'booked':
      return '#3B82F6'; // Blue border for booked
    case 'unavailable':
      return '#374151'; // Dark grey border for unavailable
    case 'morning':
      return '#F59E0B'; // Yellow border for morning
    case 'evening':
      return '#3B82F6'; // Blue border for evening
    case 'night':
      return '#9CA3AF'; // Grey border for night
    case 'fullDay':
      return '#10B981'; // Green border for full day
    default:
      return '#E5E7EB';
  }
};

const getSeatTextColor = (status: SeatStatus): string => {
  switch (status) {
    case 'unavailable':
      return '#FFFFFF'; // White text for unavailable seats
    case 'available':
    case 'booked':
    case 'morning':
    case 'evening':
    case 'night':
    case 'fullDay':
      return '#000000'; // Black text for other seats
    default:
      return '#000000';
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
      <Text style={[styles.seatNumber, { color: getSeatTextColor(status) }]}>
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

const { width: screenWidth } = Dimensions.get('window');
// Calculate seat width to fit 5 seats per row with proper spacing
// screenWidth - 40px (padding) - 32px (4 gaps of 8px) = available width for 5 seats
const seatWidth = Math.floor((screenWidth - 72) / 5);

const styles = StyleSheet.create({
  seat: {
    width: seatWidth,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
