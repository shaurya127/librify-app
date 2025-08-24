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
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import TransactionCard from '@/components/TransactionCard';
import { router, Stack } from 'expo-router';
import { ArrowDownToLine, Download } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Types
interface Transaction {
  id: string;
  type: string;
  amount: number;
  paymentId: string;
  paymentDate: string;
  paymentMethod: string;
  studentName: string;
  receivedBy: string;
  time: string;
  date: string;
}

// Mock data grouped by date
const MOCK_TRANSACTIONS = {
  Today: [
    {
      id: '1',
      type: 'Due fee paid',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: 'Today',
    },
    {
      id: '2',
      type: 'New student registration fee',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: 'Today',
    },
    {
      id: '3',
      type: 'Renew subscription fee',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: 'Today',
    },
  ],
  Yesterday: [
    {
      id: '4',
      type: 'Renew subscription fee',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: 'Yesterday',
    },
  ],
  '14 May 2025': [
    {
      id: '5',
      type: 'Renew subscription fee',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: '14 May 2025',
    },
    {
      id: '6',
      type: 'Renew subscription fee',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
      date: '14 May 2025',
    },
  ],
};

const DATE_RANGES = ['Today', 'Last 1 week', 'Last 1 month'];

export default function AllTransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Today');
  const [customDateRange, setCustomDateRange] = useState({
    start: '25 June 2025',
    end: '30 July 2025',
  });

  const filteredTransactions = useMemo(() => {
    let filtered: Record<string, Transaction[]> = {};

    // First apply date range filter
    let transactionsToFilter = MOCK_TRANSACTIONS;

    // Apply search filter
    if (searchQuery.trim() !== '') {
      Object.entries(transactionsToFilter).forEach(([date, transactions]) => {
        const matchingTransactions = transactions.filter(
          (transaction) =>
            transaction.studentName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            transaction.paymentId
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matchingTransactions.length > 0) {
          filtered[date] = matchingTransactions;
        }
      });
    } else {
      filtered = transactionsToFilter;
    }

    return filtered;
  }, [searchQuery, selectedDateRange]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    // Apply the selected filters here
    console.log('Applying filters:', { selectedDateRange, customDateRange });
  };

  const handleClearFilter = () => {
    setSelectedDateRange('Today');
    setCustomDateRange({ start: '25 June 2025', end: '30 July 2025' });
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download pressed');
  };

  const handleBack = () => {
    router.back();
  };

  const FilterModal = () => (
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
              onPress={() => setShowFilterModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Select range</Text>
            <View style={styles.dateRangeButtons}>
              {DATE_RANGES.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.dateRangeButton,
                    selectedDateRange === range && styles.dateRangeButtonActive,
                  ]}
                  onPress={() => setSelectedDateRange(range)}
                >
                  <Text
                    style={[
                      styles.dateRangeButtonText,
                      selectedDateRange === range &&
                        styles.dateRangeButtonTextActive,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.customRangeLabel}>
              or choose a custom range
            </Text>

            <View style={styles.customDateSection}>
              <Text style={styles.customDateLabel}>Choose date range</Text>
              <View style={styles.customDateRow}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.customDateText}>
                  {customDateRange.start} - {customDateRange.end}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilter}
            >
              <Text style={styles.clearButtonText}>Clear filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.background}
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All transactions</Text>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadText}>Download</Text>
            <ArrowDownToLine size={16} color={Colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={Colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, number, id"
              placeholderTextColor={Colors.placeholder}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
            <Ionicons name="filter" size={20} color={Colors.text} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(filteredTransactions).map(([date, transactions]) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateLabel}>{date}</Text>
              <View style={styles.transactionsGroup}>
                {transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    showBorder={true}
                  />
                ))}
              </View>
            </View>
          ))}

          {Object.keys(filteredTransactions).length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No transactions found</Text>
            </View>
          )}
        </ScrollView>

        <FilterModal />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  downloadText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '600',
    marginRight: 4,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  transactionsGroup: {
    gap: 12,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.textSecondary,
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  filterSection: {
    paddingVertical: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  dateRangeButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  dateRangeButtonActive: {
    backgroundColor: '#FFF3CD',
    borderColor: '#F0AD4E',
  },
  dateRangeButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  dateRangeButtonTextActive: {
    color: '#8A6914',
    fontWeight: '600',
  },
  customRangeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  customDateSection: {
    gap: 8,
  },
  customDateLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  customDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    gap: 8,
  },
  customDateText: {
    fontSize: 14,
    color: Colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 20,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
