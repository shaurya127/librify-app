import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'markAsPaid' | 'acceptStudent' | 'removeStudent';
  studentName: string;
  studentId: string;
  paidAmount?: string;
  remainingDue?: string;
  paymentMethod?: string;
}

export default function ActionModals({
  visible,
  onClose,
  onConfirm,
  type,
  studentName,
  studentId,
  paidAmount = '₹300',
  remainingDue = '₹0',
  paymentMethod = 'UPI',
}: ActionModalProps) {
  const renderModalContent = () => {
    switch (type) {
      case 'markAsPaid':
        return (
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Mark as paid fee due</Text>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Due fee paid</Text>
              <Text style={styles.studentInfo}>
                {studentName} ({studentId})
              </Text>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Paid amount:</Text>
                <TextInput
                  style={styles.amountInput}
                  value={paidAmount}
                  editable={false}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Remaining due:</Text>
                <TextInput
                  style={styles.amountInput}
                  value={remainingDue}
                  editable={false}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Payment method:</Text>
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownText}>{paymentMethod}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={Colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.noButton} onPress={onClose}>
                  <Text style={styles.noButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
                  <Text style={styles.yesButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'acceptStudent':
        return (
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Accept student</Text>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Accept student</Text>
              <Text style={styles.studentInfo}>
                {studentName} ({studentId})
              </Text>
              <Text style={styles.confirmationText}>
                Are you sure, want to add student?
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.noButton} onPress={onClose}>
                  <Text style={styles.noButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
                  <Text style={styles.yesButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 'removeStudent':
        return (
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Remove student</Text>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Remove student</Text>
              <Text style={styles.studentInfo}>
                {studentName} ({studentId})
              </Text>
              <Text style={styles.confirmationText}>
                Are you sure, want to remove student?
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.noButton} onPress={onClose}>
                  <Text style={styles.noButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={onConfirm}
                >
                  <Text style={styles.removeButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>{renderModalContent()}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  studentInfo: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.backgroundPattern,
    minWidth: 100,
    textAlign: 'right',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.backgroundPattern,
    minWidth: 100,
    gap: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 8,
  },
  noButton: {
    flex: 1,
    backgroundColor: Colors.textSecondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  noButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '500',
  },
  yesButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  yesButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    flex: 1,
    backgroundColor: Colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '500',
  },
});
