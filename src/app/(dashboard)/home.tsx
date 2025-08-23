import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { DonutChart, ActionModals } from '@/components/ui';
import { useAuthStore } from '@/store/auth-store';
import { router } from 'expo-router';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

// Types
interface Student {
  id: string;
  name: string;
  contact: string;
  room: string;
  amount: string;
  duration: string;
  joiningDate: string;
}

interface RevenueData {
  online: number;
  offline: number;
  other: number;
}

type ActionType = 'payment' | 'request' | 'subscription';
type ModalType = 'markAsPaid' | 'acceptStudent' | 'removeStudent';

// Constants
const PERIODS = [
  'Past 1 month',
  'Past 3 months',
  'Past 6 months',
  'Past 1 year',
] as const;
const SUBSCRIPTION_TABS = [
  '3 days left (12)',
  '7 days left (23)',
  'Buffer days stu',
] as const;

// Mock data (moved outside component to prevent recreation)
const MOCK_DATA = {
  summaryData: {
    totalStudents: 324,
    activeStudents: 324,
    totalSeats: 324,
    fullBookedSeats: 324,
  },
  revenueData: {
    online: 45,
    offline: 35,
    other: 20,
  } as RevenueData,
  totalRevenue: 324,
  paymentDueStudents: [
    {
      id: '1',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '2',
      name: 'Vaibhav Bansal',
      contact: '9910564551',
      room: 'A-102',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '3',
      name: 'Jon Deo',
      contact: '9910564552',
      room: 'A-103',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
  ] as Student[],
  newStudentRequests: Array.from({ length: 3 }, (_, i) => ({
    id: String(i + 1).padStart(2, '0'),
    name: 'Deepak Shukla',
    contact: '9910564550',
    room: 'A-101',
    amount: '₹2533',
    duration: '25 Jan - 25 Feb 2025',
    joiningDate: '25 May, 2:00pm',
  })) as Student[],
  subscriptionEndStudents: Array.from({ length: 3 }, (_, i) => ({
    id: `MEM${String(i + 5).padStart(3, '0')}`,
    name: 'Deepak Shukla',
    contact: '9910564550',
    room: 'A-101',
    amount: '₹2533',
    duration: '25 Jan - 25 Feb 2025',
    joiningDate: '25 May, 2:00pm',
  })) as Student[],
  recentStudents: Array.from({ length: 5 }, (_, i) => ({
    id: String(i + 1),
    name: i < 2 ? 'Deepak Shukla' : 'Vaibhav Bansal',
    contact: i < 2 ? '9910564550' : '9910564551',
    room: i < 2 ? 'A-101' : 'A-102',
    amount: '₹2533',
    duration: '25 Jan - 25 Feb 2025',
    joiningDate: '25 May, 2:00pm',
  })) as Student[],
};

// Component for reusable header with period selector
const SectionHeader: React.FC<{
  title: string;
  showPeriodSelector?: boolean;
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  showViewAll?: boolean;
  onViewAll?: () => void;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}> = ({
  title,
  showPeriodSelector,
  selectedPeriod,
  onPeriodChange,
  showViewAll,
  onViewAll,
  showSearch,
  searchQuery,
  onSearchChange,
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showPeriodSelector && selectedPeriod && (
      <TouchableOpacity style={styles.periodSelector}>
        <Text style={styles.periodText}>{selectedPeriod}</Text>
        <Ionicons name="chevron-down" size={16} color={Colors.text} />
      </TouchableOpacity>
    )}
    {showViewAll && (
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAllText}>View all</Text>
      </TouchableOpacity>
    )}
    {showSearch && (
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or mobile..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor={Colors.placeholder}
        />
      </View>
    )}
  </View>
);

// Optimized Student Card Component
const StudentCard: React.FC<{
  student: Student;
  showActions?: boolean;
  actionType?: ActionType;
  onMarkAsPaid?: (student: Student) => void;
  onAcceptStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}> = React.memo(
  ({
    student,
    showActions = false,
    actionType = 'payment',
    onMarkAsPaid,
    onAcceptStudent,
    onDeleteStudent,
  }) => {
    const renderActionButtons = () => {
      if (!showActions) return null;

      switch (actionType) {
        case 'payment':
          return (
            <TouchableOpacity
              style={styles.markAsPaidButton}
              onPress={() => onMarkAsPaid?.(student)}
            >
              <Text style={styles.markAsPaidText}>Mark as paid</Text>
            </TouchableOpacity>
          );
        case 'request':
          return (
            <>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => onAcceptStudent?.(student)}
              >
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteStudent?.(student)}
              >
                <Ionicons name="trash" size={16} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          );
        case 'subscription':
          return (
            <>
              <TouchableOpacity style={styles.paidButton}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                <Text style={styles.paidButtonText}>Paid</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <View style={styles.studentCard}>
        <View style={styles.studentHeader}>
          <Text style={styles.studentName}>
            {student.id} {student.name}
          </Text>
          <Text style={styles.studentAmount}>{student.amount}</Text>
        </View>
        <Text style={styles.studentDuration}>Duration: {student.duration}</Text>
        <Text style={styles.studentContact}>Contact no: {student.contact}</Text>
        <View style={styles.studentRoomContainer}>
          <Text style={styles.studentRoom}>{student.room}</Text>
        </View>
        {showActions && (
          <View style={styles.actionButtons}>{renderActionButtons()}</View>
        )}
      </View>
    );
  }
);

// Tab Component
const TabSelector: React.FC<{
  tabs: readonly string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}> = React.memo(({ tabs, selectedTab, onTabChange }) => (
  <View style={styles.tabContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, selectedTab === tab && styles.activeTab]}
        onPress={() => onTabChange(tab)}
      >
        <Text
          style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
));

// Revenue Chart Component
const RevenueChart: React.FC<{ data: RevenueData }> = React.memo(({ data }) => (
  <View style={styles.chartContainer}>
    <DonutChart data={data} size={120} strokeWidth={20} />
    <View style={styles.chartLegend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#FF6B35' }]} />
        <Text style={styles.legendText}>Online</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
        <Text style={styles.legendText}>Offline</Text>
      </View>
    </View>
  </View>
));

// Summary Card Component
const SummaryCard: React.FC<{
  title: string;
  value: number;
  backgroundColor: string;
  valueFirst?: boolean;
}> = React.memo(({ title, value, backgroundColor, valueFirst = false }) => (
  <View style={[styles.summaryCard, { backgroundColor }]}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
));

export default function DashboardScreen() {
  const { user, logout } = useAuthStore();

  // State management
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Past 1 month');
  const [selectedTab, setSelectedTab] = useState<string>('3 days left (12)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>('markAsPaid');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filtered data based on search query
  const filteredPaymentDueStudents = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_DATA.paymentDueStudents;
    const query = searchQuery.toLowerCase();
    return MOCK_DATA.paymentDueStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.contact.includes(query)
    );
  }, [searchQuery]);

  // Event handlers with useCallback for optimization
  const handleViewAllNewRequests = useCallback(() => {
    router.push('/new-student-requests');
  }, []);

  const handleViewAllSubscriptions = useCallback(() => {
    router.push('/upcoming-subscription-end');
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    router.replace('/auth');
  }, [logout]);

  const handleMarkAsPaid = useCallback((student: Student) => {
    setSelectedStudent(student);
    setModalType('markAsPaid');
    setShowModal(true);
  }, []);

  const handleAcceptStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setModalType('acceptStudent');
    setShowModal(true);
  }, []);

  const handleDeleteStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setModalType('removeStudent');
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedStudent(null);
  }, []);

  const handleModalConfirm = useCallback(() => {
    // Handle confirmation logic here
    closeModal();
  }, [closeModal]);

  const handleTabChange = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Section */}
        <View style={styles.outerCard}>
          <SectionHeader
            title="Summary"
            showPeriodSelector
            selectedPeriod={selectedPeriod}
          />
          <View style={styles.summaryGrid}>
            <SummaryCard
              title="Total students"
              value={MOCK_DATA.summaryData.totalStudents}
              backgroundColor="#E7E6FB40"
            />
            <SummaryCard
              title="Active students"
              value={MOCK_DATA.summaryData.activeStudents}
              backgroundColor="#F6E6E940"
              valueFirst
            />
            <SummaryCard
              title="Total seats"
              value={MOCK_DATA.summaryData.totalSeats}
              backgroundColor="#EEF6E640"
              valueFirst
            />
            <SummaryCard
              title="Full booked seats"
              value={MOCK_DATA.summaryData.fullBookedSeats}
              backgroundColor="#E6ECF640"
              valueFirst
            />
          </View>
        </View>

        {/* Revenue Summary Section */}
        <View style={styles.outerCard}>
          <SectionHeader
            title="Revenue summary"
            showPeriodSelector
            selectedPeriod={selectedPeriod}
          />
          <View style={styles.revenueContainer}>
            <Text style={styles.revenueTitle}>
              Total revenue ₹{MOCK_DATA.totalRevenue}
            </Text>
            <RevenueChart data={MOCK_DATA.revenueData} />
          </View>
        </View>

        {/* Payment Due Section */}
        <View style={styles.outerCard}>
          <SectionHeader
            title={`Payment due (${filteredPaymentDueStudents.length})`}
            showSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <View style={styles.studentList}>
            {filteredPaymentDueStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                showActions
                actionType="payment"
                onMarkAsPaid={handleMarkAsPaid}
              />
            ))}
          </View>
        </View>

        {/* New Student Request Section */}
        <View style={styles.section}>
          <SectionHeader
            title={`New student request (${MOCK_DATA.newStudentRequests.length})`}
            showViewAll
            onViewAll={handleViewAllNewRequests}
          />
          <View style={styles.studentList}>
            {MOCK_DATA.newStudentRequests.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                showActions
                actionType="request"
                onAcceptStudent={handleAcceptStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            ))}
          </View>
        </View>

        {/* Upcoming Subscription End Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Upcoming subscription end"
            showViewAll
            onViewAll={handleViewAllSubscriptions}
          />
          <TabSelector
            tabs={SUBSCRIPTION_TABS}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          <View style={styles.studentList}>
            {MOCK_DATA.subscriptionEndStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                showActions
                actionType="subscription"
              />
            ))}
          </View>
        </View>

        {/* Recent Students Section */}
        <View style={styles.section}>
          <SectionHeader title="Recent students" />
          <View style={styles.recentStudentsTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>Joining date</Text>
            </View>
            {MOCK_DATA.recentStudents.map((student) => (
              <View key={student.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{student.name}</Text>
                <Text style={styles.tableCell}>{student.joiningDate}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Modals */}
      {showModal && selectedStudent && (
        <ActionModals
          visible={showModal}
          type={modalType}
          studentName={selectedStudent.name}
          studentId={selectedStudent.id}
          onClose={closeModal}
          onConfirm={handleModalConfirm}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 12,
  },
  outerCard: {
    marginTop: 30,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.backgroundPattern,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 14,
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  summaryCard: {
    width: '47%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  revenueContainer: {
    alignItems: 'center',
  },
  revenueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPattern,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    minWidth: 180,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  studentList: {
    gap: 16,
  },
  studentCard: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  studentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  studentDuration: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  studentContact: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  studentRoomContainer: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  studentRoom: {
    backgroundColor: Colors.backgroundPattern,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  markAsPaidButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  markAsPaidText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  acceptButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  paidButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paidButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  messageButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPattern,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.background,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.text,
    fontWeight: '500',
  },
  recentStudentsTable: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPattern,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
});
