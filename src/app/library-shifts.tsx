import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '@/components/ui';
import { Colors } from '@/constants/Colors';

interface LibraryShiftsProps {
  onContinue: (data: {
    shifts: Array<{
      name: string;
      startTime: string;
      endTime: string;
      fee: string;
      isSelected: boolean;
    }>;
  }) => void;
  onBack: () => void;
}

const DEFAULT_SHIFTS = [
  {
    name: 'Morning shift',
    startTime: '07:00 AM',
    endTime: '02:00 PM',
    fee: '',
    isSelected: true,
  },
  {
    name: 'Evening shift',
    startTime: '02:00 PM',
    endTime: '10:00 PM',
    fee: '',
    isSelected: true,
  },
  {
    name: 'Night shift',
    startTime: '10:00 PM',
    endTime: '07:00 AM',
    fee: '',
    isSelected: false,
  },
  {
    name: 'Full day shift',
    startTime: '07:00 AM',
    endTime: '07:00 AM',
    fee: '',
    isSelected: false,
  },
];

export default function LibraryShiftsScreen({
  onContinue,
  onBack,
}: LibraryShiftsProps) {
  const [shifts, setShifts] = useState(DEFAULT_SHIFTS);

  const toggleShift = (index: number) => {
    const newShifts = [...shifts];
    newShifts[index].isSelected = !newShifts[index].isSelected;
    setShifts(newShifts);
  };

  const updateShiftFee = (index: number, fee: string) => {
    const newShifts = [...shifts];
    newShifts[index].fee = fee;
    setShifts(newShifts);
  };

  const updateShiftTime = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const newShifts = [...shifts];
    newShifts[index][field] = value;
    setShifts(newShifts);
  };

  const addShift = () => {
    const shiftNumber = shifts.length + 1;
    const newShift = {
      name: `Shift ${shiftNumber}`,
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      fee: '',
      isSelected: false,
    };
    setShifts([...shifts, newShift]);
  };

  const handleContinue = () => {
    const selectedShifts = shifts.filter((shift) => shift.isSelected);
    if (selectedShifts.length === 0) return;

    onContinue({ shifts: selectedShifts });
  };

  const hasSelectedShifts = shifts.some((shift) => shift.isSelected);

  const formatTime = (time: string) => {
    // Format time for display in input fields
    return time.replace(/:/g, ' : ');
  };

  const parseTime = (time: string) => {
    // Parse time from input fields
    return time.replace(/\s/g, '');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Simplified Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Li</Text>
          <Ionicons name="arrow-up" size={12} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Library facilities</Text>
        <Text style={styles.subtitle}>Shift details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select library shifts</Text>
            <TouchableOpacity style={styles.addShiftButton} onPress={addShift}>
              <Text style={styles.addShiftText}>+ Add shift</Text>
            </TouchableOpacity>
          </View>

          {shifts.map((shift, index) => (
            <View
              key={index}
              style={[
                styles.shiftCard,
                shift.isSelected
                  ? styles.shiftCardSelected
                  : styles.shiftCardUnselected,
              ]}
            >
              <View
                style={[
                  styles.shiftHeader,
                  shift.isSelected
                    ? styles.shiftHeaderSelected
                    : styles.shiftHeaderUnselected,
                ]}
              >
                <View style={styles.shiftTitleContainer}>
                  <Text
                    style={[
                      styles.shiftName,
                      shift.isSelected
                        ? styles.shiftNameSelected
                        : styles.shiftNameUnselected,
                    ]}
                  >
                    {shift.name}
                  </Text>
                  {shift.name === 'Full day shift' && (
                    <Text
                      style={[
                        styles.shiftSubtitle,
                        shift.isSelected
                          ? styles.shiftSubtitleSelected
                          : styles.shiftSubtitleUnselected,
                      ]}
                    >
                      24 Hour shift
                    </Text>
                  )}
                  {(shift.name === 'Evening shift' ||
                    shift.name === 'Morning shift') && (
                    <Text
                      style={[
                        styles.shiftSubtitle,
                        shift.isSelected
                          ? styles.shiftSubtitleSelected
                          : styles.shiftSubtitleUnselected,
                      ]}
                    >
                      12 Hour shift
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => toggleShift(index)}>
                  <View
                    style={[
                      styles.checkbox,
                      shift.isSelected && styles.checkboxChecked,
                    ]}
                  >
                    {shift.isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={Colors.primary}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.shiftContent}>
                <View style={styles.timeContainer}>
                  <View style={styles.timeGroup}>
                    <Text style={styles.timeLabel}>Start time</Text>
                    <View style={styles.timeInputContainer}>
                      <RNTextInput
                        style={[
                          styles.timeInput,
                          !shift.isSelected && styles.timeInputDisabled,
                        ]}
                        value={formatTime(shift.startTime)}
                        onChangeText={(value) =>
                          updateShiftTime(index, 'startTime', parseTime(value))
                        }
                        editable={shift.isSelected}
                        placeholder="07 : 00 : AM"
                      />
                    </View>
                  </View>

                  <View style={styles.timeGroup}>
                    <Text style={styles.timeLabel}>End time</Text>
                    <View style={styles.timeInputContainer}>
                      <RNTextInput
                        style={[
                          styles.timeInput,
                          !shift.isSelected && styles.timeInputDisabled,
                        ]}
                        value={formatTime(shift.endTime)}
                        onChangeText={(value) =>
                          updateShiftTime(index, 'endTime', parseTime(value))
                        }
                        editable={shift.isSelected}
                        placeholder="02 : 00 : PM"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.feeContainer}>
                  <Text style={styles.feeLabel}>Fee (Per month)</Text>
                  <TextInput
                    label=""
                    value={shift.fee}
                    onChangeText={(fee) => updateShiftFee(index, fee)}
                    placeholder="Enter fee"
                    keyboardType="numeric"
                    isReadOnly={!shift.isSelected}
                    style={
                      !shift.isSelected ? styles.feeInputDisabled : undefined
                    }
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={Colors.textSecondary}
            />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Button
            title="Next →"
            onPress={handleContinue}
            disabled={!hasSelectedShifts}
            style={
              !hasSelectedShifts ? styles.nextButtonDisabled : styles.nextButton
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  addShiftButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addShiftText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  shiftCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  shiftCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  shiftCardUnselected: {
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  shiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  shiftHeaderSelected: {
    backgroundColor: Colors.primary,
  },
  shiftHeaderUnselected: {
    backgroundColor: '#F3F4F6',
  },
  shiftTitleContainer: {
    flex: 1,
  },
  shiftName: {
    fontSize: 16,
    fontWeight: '600',
  },
  shiftNameSelected: {
    color: '#FFFFFF',
  },
  shiftNameUnselected: {
    color: Colors.textSecondary,
  },
  shiftSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  shiftSubtitleSelected: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  shiftSubtitleUnselected: {
    color: Colors.textSecondary,
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  shiftContent: {
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  timeGroup: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  timeInputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  timeInput: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  timeInputDisabled: {
    backgroundColor: '#F9FAFB',
    color: Colors.textSecondary,
    opacity: 0.6,
  },
  feeContainer: {
    marginBottom: 16,
  },
  feeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  feeInputDisabled: {
    backgroundColor: '#F9FAFB',
    color: Colors.textSecondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  nextButton: {
    width: 200,
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
});
