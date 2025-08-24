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
  Alert,
  Modal,
} from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';

interface Student {
  id: string;
  name: string;
  phone: string;
  seatNumber: string;
  amount?: number;
  type?: 'Fixed' | 'Floating';
}

interface ReportItem {
  id: string;
  type:
    | 'subscription_end'
    | 'payment_due'
    | 'due_paid'
    | 'new_student'
    | 'renew';
  student: Student;
  time?: string;
  expanded?: boolean;
  details?: {
    studentId?: string;
    paidAmount?: number;
    paymentReceivedBy?: string;
    paymentMethod?: string;
    subscriptionDuration?: string;
    shift?: string;
  };
}

// Mock data
const mockTodayActions: ReportItem[] = [
  {
    id: '2',
    type: 'subscription_end',
    student: {
      id: '2',
      name: 'Deepak shukla',
      phone: '9910564550',
      seatNumber: 'A-2',
    },
  },
  {
    id: '3',
    type: 'payment_due',
    student: {
      id: '3',
      name: 'Deepak shukla',
      phone: '9910564550',
      seatNumber: 'A-2',
      amount: 240,
    },
  },
  {
    id: '4',
    type: 'payment_due',
    student: {
      id: '4',
      name: 'Deepak shukla',
      phone: '9910564550',
      seatNumber: 'A-2',
      amount: 240,
    },
  },
  {
    id: '5',
    type: 'payment_due',
    student: {
      id: '5',
      name: 'Deepak shukla',
      phone: '9910564550',
      seatNumber: 'A-2',
      amount: 240,
      type: 'Floating',
    },
  },
];

const mockDailyReport: ReportItem[] = [
  {
    id: 'dr1',
    type: 'due_paid',
    student: { id: 'dr1', name: 'Deepak Shukla', phone: '', seatNumber: 'A-1' },
    time: '05:12 pm',
    details: {
      studentId: 'MEM003',
      paidAmount: 300,
      paymentReceivedBy: 'Rahul Jain',
      paymentMethod: 'UPI',
      subscriptionDuration: '31 May 2025 - 30 June 2025',
      shift: 'Morning shift',
    },
  },
  {
    id: 'dr2',
    type: 'due_paid',
    student: { id: 'dr2', name: 'Deepak Shukla', phone: '', seatNumber: 'A-1' },
    time: '05:12 pm',
    details: {
      studentId: 'MEM004',
      paidAmount: 300,
      paymentReceivedBy: 'Rahul Jain',
      paymentMethod: 'UPI',
      subscriptionDuration: '31 May 2025 - 30 June 2025',
      shift: 'Morning shift',
    },
  },
  {
    id: 'dr3',
    type: 'new_student',
    student: { id: 'dr3', name: 'Student Name', phone: '', seatNumber: 'B-2' },
    time: '05:12 pm',
    details: {
      studentId: 'MEM005',
      paidAmount: 2500,
      paymentReceivedBy: 'Rahul Jain',
      paymentMethod: 'Cash',
      subscriptionDuration: '25 June 2025 - 24 July 2025',
      shift: 'Evening shift',
    },
  },
  {
    id: 'dr4',
    type: 'subscription_end',
    student: { id: 'dr4', name: 'Student Name', phone: '', seatNumber: 'C-2' },
    time: '05:12 pm',
    details: {
      studentId: 'MEM006',
      paymentReceivedBy: 'Rahul Jain',
      subscriptionDuration: '31 May 2025 - 30 June 2025',
      shift: '24 Hrs shift',
    },
  },
  {
    id: 'dr5',
    type: 'new_student',
    student: {
      id: 'dr5',
      name: 'Student Name',
      phone: '',
      seatNumber: 'Floating',
    },
    time: '05:12 pm',
    details: {
      studentId: 'MEM007',
      paidAmount: 1800,
      paymentReceivedBy: 'Rahul Jain',
      paymentMethod: 'UPI',
      subscriptionDuration: '25 June 2025 - 24 July 2025',
      shift: 'Floating',
    },
  },
  {
    id: 'dr6',
    type: 'renew',
    student: { id: 'dr6', name: 'Deepak Shukla', phone: '', seatNumber: 'A-2' },
    time: '05:12 pm',
    details: {
      studentId: 'MEM003',
      paidAmount: 3500,
      paymentReceivedBy: 'Rahul Jain',
      paymentMethod: 'UPI',
      subscriptionDuration: '31 May 2025 - 30 June 2025',
      shift: '24 Hrs shift',
    },
  },
];

export default function ReportScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'daily'>('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDownload = () => {
    Alert.alert('Download', 'Downloading report...');
  };

  const handleWhatsApp = (phone: string) => {
    Alert.alert('WhatsApp', `Opening WhatsApp for ${phone}`);
  };

  const handleRenew = (studentName: string) => {
    Alert.alert('Renew', `Renewing subscription for ${studentName}`);
  };

  const handleMessage = (studentName: string) => {
    Alert.alert('Message', `Sending message to ${studentName}`);
  };

  const handlePaid = (studentName: string) => {
    Alert.alert('Payment', `Marking payment as paid for ${studentName}`);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'due_paid':
        return 'Due fee paid (₹300)';
      case 'new_student':
        return 'New student';
      case 'subscription_end':
        return 'Subscription ended';
      case 'renew':
        return 'Renew subscription';
      default:
        return type;
    }
  };

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
        {/* Title and Download Button */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Library report</Text>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadText}>Download ↓</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'today' && styles.activeTab]}
            onPress={() => setActiveTab('today')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'today' && styles.activeTabText,
              ]}
            >
              Today's action
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
            onPress={() => setActiveTab('daily')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'daily' && styles.activeTabText,
              ]}
            >
              Daily report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>⚙ Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, number, id"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.placeholder}
          />
        </View>

        {activeTab === 'today' ? (
          /* Today's Action Tab */
          <View style={styles.todayContent}>
            <Text style={styles.sectionTitle}>Action items - 21 Jan, 2025</Text>

            {/* Subscription Ends */}
            <View style={styles.section}>
              <Text style={styles.subsectionTitle}>
                Subscription ends today (2)
              </Text>
              {mockTodayActions
                .filter((item) => item.type === 'subscription_end')
                .map((item) => (
                  <View key={item.id} style={styles.actionItem}>
                    <View style={styles.leftSection}>
                      <View style={styles.namePhoneRow}>
                        <Text style={styles.studentName}>
                          {item.student.name}
                        </Text>
                        <Text style={styles.phoneNumber}>
                          📞 {item.student.phone}
                        </Text>
                      </View>
                      <View style={styles.seatRowWithActions}>
                        <View style={styles.seatTag}>
                          <Text style={styles.seatTagText}>
                            {item.student.seatNumber}
                          </Text>
                        </View>
                        <View style={styles.actionButtons}>
                          <TouchableOpacity
                            style={styles.whatsappButton}
                            onPress={() => handleWhatsApp(item.student.phone)}
                          >
                            <Text style={styles.buttonText}>💬</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.renewButton}
                            onPress={() => handleRenew(item.student.name)}
                          >
                            <Text style={styles.buttonText}>🔄</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>

            {/* Payment Due */}
            <View style={styles.section}>
              <Text style={styles.subsectionTitle}>Payment due (3)</Text>
              {mockTodayActions
                .filter((item) => item.type === 'payment_due')
                .map((item) => (
                  <View key={item.id} style={styles.actionItem}>
                    <View style={styles.leftSection}>
                      <View style={styles.namePhoneRow}>
                        <Text style={styles.studentName}>
                          {item.student.name}{' '}
                          {item.student.type && `(${item.student.type})`}
                        </Text>
                        <Text style={styles.phoneNumber}>
                          📞 {item.student.phone}
                        </Text>
                      </View>
                      <View style={styles.seatRowWithActions}>
                        <View style={styles.seatTag}>
                          <Text style={styles.seatTagText}>
                            {item.student.seatNumber}
                          </Text>
                        </View>
                        <View style={styles.actionButtons}>
                          <TouchableOpacity
                            style={styles.whatsappButton}
                            onPress={() => handleWhatsApp(item.student.phone)}
                          >
                            <Text style={styles.buttonText}>💬</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.paidButton}
                            onPress={() => handlePaid(item.student.name)}
                          >
                            <Text style={styles.buttonText}>✓</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.amount}>₹{item.student.amount}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        ) : (
          /* Daily Report Tab */
          <View style={styles.dailyContent}>
            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Summary</Text>
                <Text style={styles.summaryValue}>25 June 2025</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total collection</Text>
                <Text style={styles.summaryValue}>₹1234</Text>
              </View>
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Due paid (1)</Text>
                <Text style={styles.summaryValue}>₹345</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Subscription renew</Text>
                <Text style={styles.summaryValue}>2</Text>
              </View>
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Subscription ended</Text>
                <Text style={styles.summaryValue}>2</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>New student</Text>
                <Text style={styles.summaryValue}>2</Text>
              </View>
            </View>

            {/* Report Items */}
            <Text style={styles.reportTitle}>Report - 25 June 2025 🔄</Text>

            {mockDailyReport.map((item) => (
              <View key={item.id} style={styles.reportItem}>
                <TouchableOpacity
                  style={[
                    styles.reportHeader,
                    expandedItems.includes(item.id) &&
                      styles.reportHeaderExpanded,
                  ]}
                  onPress={() => toggleExpanded(item.id)}
                >
                  <View style={styles.reportHeaderLeft}>
                    <View style={styles.caretContainer}>
                      {expandedItems.includes(item.id) ? (
                        <ChevronUp size={16} color={Colors.text} />
                      ) : (
                        <ChevronDown size={16} color={Colors.text} />
                      )}
                    </View>
                    <Text style={styles.reportType}>
                      {getTypeLabel(item.type)}
                    </Text>
                  </View>
                  <Text style={styles.reportTime}>{item.time}</Text>
                </TouchableOpacity>

                {expandedItems.includes(item.id) && item.details && (
                  <View style={styles.reportDetails}>
                    <View style={styles.detailGrid}>
                      <View style={styles.detailGridItem}>
                        <Text style={styles.detailLabel}>Student name</Text>
                        <Text style={styles.detailValue}>
                          {item.student.name}
                        </Text>
                      </View>
                      <View style={styles.detailGridItem}>
                        <Text style={styles.detailLabel}>Student ID</Text>
                        <Text style={styles.detailValue}>
                          {item.details.studentId}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.detailGrid}>
                      <View style={styles.detailGridItem}>
                        <Text style={styles.detailLabel}>Seat no.</Text>
                        <Text style={styles.detailValue}>
                          {item.student.seatNumber} ({item.details.shift})
                        </Text>
                      </View>
                      {item.details.paidAmount && (
                        <View style={styles.detailGridItem}>
                          <Text style={styles.detailLabel}>Paid amount</Text>
                          <Text style={styles.detailValue}>
                            ₹{item.details.paidAmount}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.detailGrid}>
                      <View style={styles.detailGridItem}>
                        <Text style={styles.detailLabel}>
                          Payment received by
                        </Text>
                        <Text style={styles.detailValue}>
                          {item.details.paymentReceivedBy}
                        </Text>
                      </View>
                      {item.details.paymentMethod && (
                        <View style={styles.detailGridItem}>
                          <Text style={styles.detailLabel}>Payment method</Text>
                          <Text style={styles.detailValue}>
                            {item.details.paymentMethod}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.detailFullWidth}>
                      <Text style={styles.detailLabel}>
                        Subscription duration
                      </Text>
                      <Text style={styles.detailValue}>
                        {item.details.subscriptionDuration}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.filterModal}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <TouchableOpacity
            style={styles.filterContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Apply filters</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Select student type</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[styles.filterOption, styles.filterOptionActive]}
                >
                  <Text style={styles.filterOptionText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Fixed students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                  <Text style={styles.filterOptionText}>Floating students</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>
                Select date to generate report
              </Text>
              <View style={styles.dateInput}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.dateText}>25 June 2025</Text>
              </View>
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={() => setShowFilterModal(false)}
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    marginBottom: 20,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  downloadButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  downloadText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  filterButton: {
    marginLeft: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
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
  todayContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  actionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  namePhoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seatRowWithActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  seatTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  seatTagText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  amount: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    marginTop: 4,
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
  seatNumber: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renewButton: {
    backgroundColor: '#FCD34D',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidButton: {
    backgroundColor: '#FCD34D',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  phoneNumber: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dailyContent: {
    paddingBottom: 40,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 16,
  },
  reportItem: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  reportHeaderExpanded: {
    backgroundColor: '#E5E7EB',
  },
  reportHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  caretContainer: {
    marginRight: 8,
  },

  reportType: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  reportTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reportDetails: {
    padding: 16,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  detailGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailGridItem: {
    flex: 1,
    marginRight: 8,
  },
  detailFullWidth: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  filterModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
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
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: '#FCD34D',
    borderColor: '#F59E0B',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  filterActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  clearFilterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  clearFilterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  applyFilterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyFilterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
