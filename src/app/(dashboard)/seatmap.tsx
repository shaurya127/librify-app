import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import { Seat, FilterModal, SeatDetailModal } from '@/components/ui';
import { type FilterOptions } from '@/components/ui/FilterModal';
import {
  type SeatDetail,
  type ShiftDetail,
} from '@/components/ui/SeatDetailModal';
import { type SeatStatus } from '@/components/ui/Seat';

// Mock data for demonstration
const mockSeats = [
  // Section A - 4x4 grid
  {
    id: 'A-1',
    number: 'A-1',
    status: 'booked' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-2',
    number: 'A-2',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-3',
    number: 'A-3',
    status: 'available' as SeatStatus,
    hasNotification: true,
  },
  {
    id: 'A-4',
    number: 'A-4',
    status: 'morning' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-5',
    number: 'A-5',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-6',
    number: 'A-6',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-7',
    number: 'A-7',
    status: 'evening' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-8',
    number: 'A-8',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-9',
    number: 'A-9',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-10',
    number: 'A-10',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-11',
    number: 'A-11',
    status: 'night' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-12',
    number: 'A-12',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-13',
    number: 'A-13',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-14',
    number: 'A-14',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-15',
    number: 'A-15',
    status: 'unavailable' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-16',
    number: 'A-16',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  // Add A-29 as shown in your image
  {
    id: 'A-29',
    number: 'A-29',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },

  // Section B - 2 rows
  {
    id: 'B-1',
    number: 'B-1',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-2',
    number: 'B-2',
    status: 'morning' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-3',
    number: 'B-3',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-4',
    number: 'B-4',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-5',
    number: 'B-5',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },

  // Section C - 2 rows
  {
    id: 'C-1',
    number: 'C-1',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-2',
    number: 'C-2',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-3',
    number: 'C-3',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-4',
    number: 'C-4',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-5',
    number: 'C-5',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-6',
    number: 'C-6',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'C-7',
    number: 'C-7',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
];

// Enhanced mock data with details for ALL seats
const mockSeatDetails: Record<string, SeatDetail> = {
  'A-1': {
    seatNumber: 'A-1',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-1',
        type: 'morning',
        status: 'booked',
        studentName: 'Deepak Shukla',
      },
      {
        id: 'shift-2',
        type: 'evening',
        status: 'booked',
        studentName: 'Rahul Jaat',
        subscriptionEnded: true,
      },
      {
        id: 'shift-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-4': {
    seatNumber: 'A-4',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-5',
        type: 'morning',
        status: 'booked',
        studentName: 'John Doe',
      },
      {
        id: 'shift-6',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-7',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-8',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-29': {
    seatNumber: 'A-29',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-29-1',
        type: 'morning',
        status: 'booked',
        studentName: 'Deepak Shukla',
      },
      {
        id: 'shift-29-2',
        type: 'evening',
        status: 'booked',
        studentName: 'Rahul Jaat',
        subscriptionEnded: true,
      },
      {
        id: 'shift-29-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-29-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  // Default template for seats without specific data
  default: {
    seatNumber: '',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-default-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-default-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-default-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-default-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
};

export default function SeatmapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSeatDetail, setShowSeatDetail] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    shiftType: 'all',
    studentType: 'all',
    date: '22 August 2025',
    floor: 'All floors',
  });

  const filteredSeats = useMemo(() => {
    let filtered = mockSeats;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((seat) =>
        seat.number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply shift type filter
    if (activeFilters.shiftType !== 'all') {
      filtered = filtered.filter((seat) => {
        // Map filter values to actual seat statuses
        switch (activeFilters.shiftType) {
          case 'morning':
            return seat.status === 'morning';
          case 'evening':
            return seat.status === 'evening';
          case 'night':
            return seat.status === 'night';
          case 'fullDay':
            return seat.status === 'fullDay';
          case 'booked':
            return seat.status === 'booked';
          default:
            return true;
        }
      });
    }

    // Apply floor filter
    if (activeFilters.floor !== 'All floors') {
      const floorLetter = activeFilters.floor.replace('Floor ', '');
      filtered = filtered.filter((seat) => seat.number.startsWith(floorLetter));
    }

    return filtered;
  }, [searchQuery, activeFilters]);

  const handleSeatPress = (seatNumber: string) => {
    console.log('Seat pressed:', seatNumber);
    setSelectedSeat(seatNumber);
    setShowSeatDetail(true);
  };

  const getSeatDetail = (seatNumber: string): SeatDetail => {
    if (mockSeatDetails[seatNumber]) {
      return mockSeatDetails[seatNumber];
    }

    // Create dynamic seat detail for seats without specific data
    const floorLetter = seatNumber.charAt(0);
    return {
      ...mockSeatDetails.default,
      seatNumber,
      floor: floorLetter,
    };
  };

  const handleFilterApply = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const handleViewStudent = (shiftId: string) => {
    Alert.alert('View Student', `Viewing student for shift ${shiftId}`);
  };

  const handleEditBooking = (shiftId: string) => {
    Alert.alert('Edit Booking', `Editing booking for shift ${shiftId}`);
  };

  const handleDeleteBooking = (shiftId: string) => {
    Alert.alert('Delete Booking', `Deleted booking for shift ${shiftId}`);
    setShowSeatDetail(false);
  };

  const handleRenewSubscription = (shiftId: string) => {
    Alert.alert(
      'Renew Subscription',
      `Renewing subscription for shift ${shiftId}`
    );
  };

  const handleAddStudent = (shiftType: string) => {
    Alert.alert('Add Student', `Adding student for ${shiftType} shift`);
  };

  const handleExport = () => {
    Alert.alert('Export', 'Exporting seat data...');
  };

  const handleCloseModal = () => {
    setShowSeatDetail(false);
    setSelectedSeat(null);
  };

  const hasActiveFilters =
    activeFilters.shiftType !== 'all' ||
    activeFilters.studentType !== 'all' ||
    activeFilters.floor !== 'All floors';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <Header
        onMenuPress={() => Alert.alert('Menu', 'Menu pressed')}
        onAddUserPress={() => Alert.alert('Add User', 'Add user pressed')}
        onGridPress={() => Alert.alert('Grid', 'Grid pressed')}
        onAvatarPress={() => Alert.alert('Profile', 'Profile pressed')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title and Export Button */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Seat management</Text>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchFilterRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by seat no, name, member id"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.placeholder}
            />
          </View>

          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                hasActiveFilters && styles.activeFilterButton,
              ]}
              onPress={() => setShowFilterModal(true)}
            >
              <Text
                style={[
                  styles.filterIcon,
                  hasActiveFilters && styles.activeFilterIcon,
                ]}
              >
                ▼
              </Text>
              <Text
                style={[
                  styles.filterText,
                  hasActiveFilters && styles.activeFilterText,
                ]}
              >
                Filter
              </Text>
              {hasActiveFilters && <View style={styles.activeFilterDot} />}
            </TouchableOpacity>

            {hasActiveFilters && (
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={() => {
                  setActiveFilters({
                    shiftType: 'all',
                    studentType: 'all',
                    date: '22 August 2025',
                    floor: 'All floors',
                  });
                  setSearchQuery('');
                }}
              >
                <Text style={styles.clearFilterText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Date Status and Filter Info */}
        <View style={styles.dateStatusRow}>
          <Text style={styles.dateStatus}>
            Seat status - {activeFilters.date}
          </Text>
          {hasActiveFilters && (
            <Text style={styles.filterInfo}>
              Showing {filteredSeats.length} of {mockSeats.length} seats
            </Text>
          )}
        </View>

        {/* Seat Grid */}
        <View style={styles.seatGrid}>
          <View style={styles.seatContainer}>
            {filteredSeats.map((seat) => (
              <Seat
                key={seat.id}
                seatNumber={seat.number}
                status={seat.status}
                onPress={handleSeatPress}
                hasNotification={seat.hasNotification}
                isSelected={selectedSeat === seat.number}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
        initialFilters={activeFilters}
      />

      {/* Seat Detail Modal */}
      <SeatDetailModal
        visible={showSeatDetail}
        onClose={handleCloseModal}
        seatDetail={selectedSeat ? getSeatDetail(selectedSeat) : null}
        onViewStudent={handleViewStudent}
        onEditBooking={handleEditBooking}
        onDeleteBooking={handleDeleteBooking}
        onRenewSubscription={handleRenewSubscription}
        onAddStudent={handleAddStudent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: Colors.primary,
    borderRadius: 8,
    gap: 6,
  },
  exportIcon: {
    fontSize: 16,
  },
  exportText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  searchFilterRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: Colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
    position: 'relative',
  },
  activeFilterButton: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  filterIcon: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  activeFilterIcon: {
    color: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  activeFilterText: {
    color: Colors.primary,
  },
  activeFilterDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  clearFilterButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateStatus: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  filterInfo: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  seatGrid: {
    paddingBottom: 40,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 4,
  },
});
