import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export interface FilterOptions {
  shiftType: 'all' | 'morning' | 'evening' | 'night' | 'fullDay' | 'booked';
  studentType: 'all' | 'fixed' | 'floating';
  date: string;
  floor: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const shiftTypeOptions = [
  { key: 'all', label: 'All seats', color: '#F3F4F6' },
  { key: 'morning', label: 'Morning shift booked', color: '#FEF3C7' },
  { key: 'evening', label: 'Evening shift booked', color: '#BFDBFE' },
  { key: 'night', label: 'Night shift booked', color: '#F3F4F6' },
  { key: 'fullDay', label: 'Full day shift booked', color: '#D1FAE5' },
  { key: 'booked', label: 'All booked seats', color: '#E0E7FF' },
];

const studentTypeOptions = [
  { key: 'all', label: 'All', color: '#FEF3C7' },
  { key: 'fixed', label: 'Fixed students', color: '#FFFFFF' },
  { key: 'floating', label: 'Floating students', color: '#FFFFFF' },
];

const floorOptions = [
  'All floors',
  'Floor A',
  'Floor B',
  'Floor C',
  'Floor D',
  'Floor E',
];

export default function FilterModal({
  visible,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(
    initialFilters || {
      shiftType: 'all',
      studentType: 'all',
      date: '25 June 2025',
      floor: 'All floors',
    }
  );

  const [showFloorDropdown, setShowFloorDropdown] = useState(false);

  const handleFloorSelect = (floor: string) => {
    setFilters({ ...filters, floor });
    setShowFloorDropdown(false);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterOptions = {
      shiftType: 'all',
      studentType: 'all',
      date: '25 June 2025',
      floor: 'All floors',
    };
    setFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
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
          <View style={styles.header}>
            <Text style={styles.title}>Apply filters</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Select shift type */}
            <Text style={styles.sectionTitle}>Select shift type</Text>
            <FlatList
              data={shiftTypeOptions}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item: option }) => (
                <TouchableOpacity
                  style={[
                    styles.shiftTypeButton,
                    {
                      backgroundColor:
                        filters.shiftType === option.key
                          ? option.color
                          : '#FFFFFF',
                      borderColor:
                        filters.shiftType === option.key
                          ? '#10B981'
                          : '#E5E7EB',
                      borderWidth: filters.shiftType === option.key ? 2 : 1,
                    },
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, shiftType: option.key as any })
                  }
                >
                  <Text
                    style={[
                      styles.shiftTypeText,
                      {
                        color: '#374151',
                        fontWeight:
                          filters.shiftType === option.key ? '600' : '500',
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  <View
                    style={[styles.colorDot, { backgroundColor: option.color }]}
                  />
                </TouchableOpacity>
              )}
            />

            {/* Select student type */}
            <Text style={styles.sectionTitle}>Select student type</Text>
            <View style={styles.optionsRow}>
              {studentTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.studentTypeButton,
                    {
                      backgroundColor:
                        filters.studentType === option.key
                          ? option.color
                          : '#FFFFFF',
                      borderColor:
                        filters.studentType === option.key
                          ? '#10B981'
                          : '#E5E7EB',
                      borderWidth: filters.studentType === option.key ? 2 : 1,
                    },
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, studentType: option.key as any })
                  }
                >
                  <Text
                    style={[
                      styles.studentTypeText,
                      {
                        color: '#374151',
                        fontWeight:
                          filters.studentType === option.key ? '600' : '500',
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Select date to check seat status */}
            <Text style={styles.sectionTitle}>
              Select date to check seat status
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.calendarIcon}>📅</Text>
              <TextInput
                style={styles.dateInput}
                value={filters.date}
                onChangeText={(text) => setFilters({ ...filters, date: text })}
                placeholder="Select date"
              />
            </View>

            {/* Select floor */}
            <Text style={styles.sectionTitle}>Select floor</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setShowFloorDropdown(!showFloorDropdown)}
            >
              <Text style={styles.dropdownText}>{filters.floor}</Text>
              <Text
                style={[
                  styles.dropdownArrow,
                  {
                    transform: [
                      { rotate: showFloorDropdown ? '180deg' : '0deg' },
                    ],
                  },
                ]}
              >
                ▼
              </Text>
            </TouchableOpacity>

            {showFloorDropdown && (
              <View style={styles.dropdownList}>
                {floorOptions.map((floor) => (
                  <TouchableOpacity
                    key={floor}
                    style={[
                      styles.dropdownItem,
                      filters.floor === floor && styles.selectedDropdownItem,
                    ]}
                    onPress={() => handleFloorSelect(floor)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        filters.floor === floor &&
                          styles.selectedDropdownItemText,
                      ]}
                    >
                      {floor}
                    </Text>
                    {filters.floor === floor && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply filters</Text>
            </TouchableOpacity>
          </View>
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
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '75%', // Fixed height instead of maxHeight
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginTop: 10,
  },
  horizontalList: {
    paddingRight: 20,
    gap: 8,
    marginBottom: 16,
  },
  shiftTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minWidth: 120,
    marginRight: 8,
  },
  shiftTypeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    width: '48%',
    minHeight: 44,
  },
  optionText: {
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  studentTypeButton: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minHeight: 36,
  },
  studentTypeText: {
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    minHeight: 44,
  },
  calendarIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    minHeight: 44,
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedDropdownItem: {
    backgroundColor: '#F0FDF4',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedDropdownItemText: {
    color: '#10B981',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
