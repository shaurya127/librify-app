import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export interface ShiftDetail {
  id: string;
  type: 'morning' | 'evening' | 'night' | 'fullDay';
  status: 'booked' | 'available' | 'unavailable';
  studentName: string;
  subscriptionEnded?: boolean;
}

export interface SeatDetail {
  seatNumber: string;
  floor: string;
  date: string;
  shifts: ShiftDetail[];
}

interface SeatDetailModalProps {
  visible: boolean;
  onClose: () => void;
  seatDetail: SeatDetail | null;
  onViewStudent: (shiftId: string) => void;
  onEditBooking: (shiftId: string) => void;
  onDeleteBooking: (shiftId: string) => void;
  onRenewSubscription: (shiftId: string) => void;
  onAddStudent: (shiftType: string) => void;
}

const getShiftColor = (type: string): string => {
  switch (type) {
    case 'morning':
      return '#FEF3C7'; // Yellow
    case 'evening':
      return '#DBEAFE'; // Light blue
    case 'night':
      return '#F3F4F6'; // Grey
    case 'fullDay':
      return '#D1FAE5'; // Light green
    default:
      return '#F3F4F6';
  }
};

const getShiftLabel = (type: string): string => {
  switch (type) {
    case 'morning':
      return 'Morning Shift';
    case 'evening':
      return 'Evening Shift';
    case 'night':
      return 'Night shift';
    case 'fullDay':
      return 'Full Day Shift';
    default:
      return type;
  }
};

export default function SeatDetailModal({
  visible,
  onClose,
  seatDetail,
  onViewStudent,
  onEditBooking,
  onDeleteBooking,
  onRenewSubscription,
  onAddStudent,
}: SeatDetailModalProps) {
  if (!seatDetail) return null;

  const handleDelete = (shiftId: string, studentName: string) => {
    Alert.alert(
      'Delete Booking',
      `Are you sure you want to delete the booking for ${studentName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteBooking(shiftId),
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.seatInfo}>
              <Text style={styles.seatNumber}>
                Seat no: {seatDetail.seatNumber} | Floor: {seatDetail.floor}
              </Text>
              <Text style={styles.date}>{seatDetail.date}</Text>
            </View>
            <View style={styles.navigation}>
              <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navArrow}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {seatDetail.shifts.map((shift) => (
              <View key={shift.id} style={styles.shiftCard}>
                <View style={styles.shiftHeader}>
                  <View
                    style={[
                      styles.shiftTypeBadge,
                      { backgroundColor: getShiftColor(shift.type) },
                    ]}
                  >
                    <Text style={styles.shiftTypeText}>
                      {getShiftLabel(shift.type)}
                    </Text>
                  </View>
                  <Text style={styles.shiftStatus}>{shift.status}</Text>
                </View>

                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{shift.studentName}</Text>
                  {shift.subscriptionEnded && (
                    <View style={styles.subscriptionWarning}>
                      <Text style={styles.warningIcon}>👤</Text>
                      <Text style={styles.warningText}>
                        {shift.studentName} subscription is ended.
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onViewStudent(shift.id)}
                  >
                    <Text style={styles.actionIcon}>👁️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onEditBooking(shift.id)}
                  >
                    <Text style={styles.actionIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(shift.id, shift.studentName)}
                  >
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                {shift.status === 'booked' && shift.subscriptionEnded && (
                  <TouchableOpacity
                    style={styles.renewButton}
                    onPress={() => onRenewSubscription(shift.id)}
                  >
                    <Text style={styles.renewButtonText}>Renew</Text>
                  </TouchableOpacity>
                )}

                {shift.status === 'available' && (
                  <TouchableOpacity
                    style={styles.addStudentButton}
                    onPress={() => onAddStudent(shift.type)}
                  >
                    <Text style={styles.addStudentButtonText}>Add student</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    width: '100%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  seatInfo: {
    flex: 1,
  },
  seatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  navigation: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrow: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  shiftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shiftTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  shiftTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  shiftStatus: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  studentInfo: {
    marginBottom: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  subscriptionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  warningIcon: {
    fontSize: 14,
  },
  warningText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 14,
  },
  renewButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  renewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addStudentButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addStudentButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
