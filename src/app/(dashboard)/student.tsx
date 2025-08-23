import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

interface Student {
  id: string;
  name: string;
  memberId: string;
  duration: string;
  shifts: string[];
  room: string;
  type?: string;
  hours?: string;
}

export default function StudentScreen() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedShiftType, setSelectedShiftType] = useState('all');
  const [selectedStudentType, setSelectedStudentType] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('ascending');

  // Mock data for students
  const activeStudents: Student[] = [
    {
      id: '1',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Morning shift', 'Evening shift'],
      room: 'A-101',
    },
    {
      id: '2',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Morning shift'],
      room: 'A-101',
    },
    {
      id: '3',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Evening shift'],
      room: 'A-101',
    },
    {
      id: '4',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Morning shift', 'Evening shift'],
      room: 'A-101',
    },
    {
      id: '5',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Morning shift', 'Evening shift'],
      room: 'A-101',
    },
    {
      id: '6',
      name: 'Deepak Shukla',
      memberId: 'MEM005',
      duration: '25 Jan 2025 - 25 Feb 2025',
      shifts: ['Floating'],
      room: '8hr',
    },
  ];

  const expiredStudents: Student[] = [
    {
      id: '7',
      name: 'Rahul Kumar',
      memberId: 'MEM010',
      duration: '15 Dec 2024 - 15 Jan 2025',
      shifts: ['Morning shift'],
      room: 'B-201',
    },
    {
      id: '8',
      name: 'Priya Singh',
      memberId: 'MEM011',
      duration: '10 Dec 2024 - 10 Jan 2025',
      shifts: ['Evening shift'],
      room: 'C-301',
    },
    {
      id: '9',
      name: 'Amit Patel',
      memberId: 'MEM012',
      duration: '20 Dec 2024 - 20 Jan 2025',
      shifts: ['Morning shift', 'Evening shift'],
      room: 'D-401',
    },
  ];

  const currentStudents =
    selectedTab === 'active' ? activeStudents : expiredStudents;

  const renderShiftTag = (shift: string) => {
    let backgroundColor = '#E3F2FD'; // Light cyan for evening shift
    let textColor = '#1976D2';

    if (shift === 'Morning shift') {
      backgroundColor = '#FFF8E1'; // Light yellow for morning shift
      textColor = '#F57C00';
    } else if (shift === 'Evening shift') {
      backgroundColor = '#E3F2FD'; // Light cyan for evening shift
      textColor = '#1976D2';
    } else if (shift === 'Floating') {
      backgroundColor = '#F5F5F5';
      textColor = '#757575';
    }

    return (
      <View
        key={shift}
        style={[styles.shiftTag, { backgroundColor, borderColor: textColor }]}
      >
        <Text style={[styles.shiftTagText, { color: textColor }]}>{shift}</Text>
      </View>
    );
  };

  const renderStudentCard = (student: Student) => (
    <View key={student.id} style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentId}>ID: {student.memberId}</Text>
        </View>
        <View style={styles.studentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="pencil" size={16} color={Colors.primary} />
            <Text style={styles.actionLink}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={16} color="#F44336" />
            <Text style={[styles.actionLink, { color: '#F44336' }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.studentDuration}>{student.duration}</Text>

      <View style={styles.studentFooter}>
        <View style={styles.shiftsContainer}>
          {student.shifts.map(renderShiftTag)}
        </View>
        <View style={styles.roomContainer}>
          <Text style={styles.roomText}>{student.room}</Text>
        </View>
      </View>
    </View>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Apply filters</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Ionicons name="close" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Select shift type */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Select shift type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      selectedShiftType === 'all' &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedShiftType('all')}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedShiftType === 'all' &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      All students (130)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      selectedShiftType === 'morning' &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedShiftType('morning')}
                  >
                    <View style={styles.filterOptionWithDot}>
                      <View
                        style={[styles.dot, { backgroundColor: '#F57C00' }]}
                      />
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedShiftType === 'morning' &&
                            styles.filterOptionTextSelected,
                        ]}
                      >
                        Morning shift (12)
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      selectedShiftType === 'evening' &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => setSelectedShiftType('evening')}
                  >
                    <View style={styles.filterOptionWithDot}>
                      <View
                        style={[styles.dot, { backgroundColor: '#1976D2' }]}
                      />
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedShiftType === 'evening' &&
                            styles.filterOptionTextSelected,
                        ]}
                      >
                        Evening shift (8)
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {/* Select student type */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Select student type</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedStudentType === 'all' &&
                      styles.filterOptionSelected,
                  ]}
                  onPress={() => setSelectedStudentType('all')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedStudentType === 'all' &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedStudentType === 'fixed' &&
                      styles.filterOptionSelected,
                  ]}
                  onPress={() => setSelectedStudentType('fixed')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedStudentType === 'fixed' &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    Fixed students
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedStudentType === 'floating' &&
                      styles.filterOptionSelected,
                  ]}
                  onPress={() => setSelectedStudentType('floating')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedStudentType === 'floating' &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    Floating students
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sorting by */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sorting by</Text>
              <TouchableOpacity style={styles.sortDropdown}>
                <Text style={styles.sortDropdownText}>By default</Text>
                <Ionicons name="chevron-down" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>

            {/* Sorting order */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sorting order</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    sortOrder === 'ascending' && styles.filterOptionSelected,
                  ]}
                  onPress={() => setSortOrder('ascending')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      sortOrder === 'ascending' &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    Ascending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    sortOrder === 'descending' && styles.filterOptionSelected,
                  ]}
                  onPress={() => setSortOrder('descending')}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      sortOrder === 'descending' &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    Descending
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearFilterButton}
              onPress={() => {
                setSelectedShiftType('all');
                setSelectedStudentType('all');
                setSortBy('default');
                setSortOrder('ascending');
              }}
            >
              <Text style={styles.clearFilterText}>Clear filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyFilterButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyFilterText}>Apply filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title and Export Button */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Student management</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download" size={20} color="#00A76F" />
          </TouchableOpacity>
        </View>

        {/* Status Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
            onPress={() => setSelectedTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'active' && styles.activeTabText,
              ]}
            >
              Active Student (90)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'expired' && styles.activeTab]}
            onPress={() => setSelectedTab('expired')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'expired' && styles.activeTabText,
              ]}
            >
              Expired Students (300)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter Bar */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, number, member id..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter" size={20} color="#000000" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Student List */}
        <View style={styles.studentList}>
          {currentStudents.map(renderStudentCard)}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      {renderFilterModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  exportButton: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00A76F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  tabText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
  },
  filterButtonText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  studentList: {
    gap: 20,
    paddingBottom: 24,
  },
  studentCard: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  studentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  studentDuration: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
    fontWeight: '500',
  },
  studentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shiftsContainer: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  shiftTag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  shiftTagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  roomContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  roomText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundPattern,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.backgroundPattern,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: Colors.background,
  },
  filterOptionWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sortDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.backgroundPattern,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortDropdownText: {
    fontSize: 14,
    color: Colors.text,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  clearFilterButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.backgroundPattern,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearFilterText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  applyFilterButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyFilterText: {
    fontSize: 14,
    color: Colors.background,
    fontWeight: '500',
  },
});
