import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { DonutChart } from '@/components/ui';

const { width } = Dimensions.get('window');

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

export default function DashboardScreen({ navigation }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState('Past 1 month');
  const [selectedTab, setSelectedTab] = useState('3 days left (12)');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const summaryData = {
    totalStudents: 324,
    activeStudents: 324,
    totalSeats: 324,
    fullBookedSeats: 324,
  };

  const revenueData: RevenueData = {
    online: 45,
    offline: 35,
    other: 20,
  };

  const totalRevenue =
    revenueData.online + revenueData.offline + revenueData.other;

  const paymentDueStudents: Student[] = [
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
  ];

  const newStudentRequests: Student[] = [
    {
      id: '01',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '02',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '03',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
  ];

  const subscriptionEndStudents: Student[] = [
    {
      id: 'MEM005',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: 'MEM006',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: 'MEM007',
      name: 'Deepak Shukla',
      contact: '9910564550',
      room: 'A-101',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
  ];

  const recentStudents: Student[] = [
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
      name: 'Vaibhav Bansal',
      contact: '9910564551',
      room: 'A-102',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '4',
      name: 'Vaibhav Bansal',
      contact: '9910564551',
      room: 'A-102',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
    {
      id: '5',
      name: 'Vaibhav Bansal',
      contact: '9910564551',
      room: 'A-102',
      amount: '₹2533',
      duration: '25 Jan - 25 Feb 2025',
      joiningDate: '25 May, 2:00pm',
    },
  ];

  const renderRevenueChart = () => {
    return (
      <View style={styles.chartContainer}>
        <DonutChart data={revenueData} size={120} strokeWidth={20} />
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
    );
  };

  const renderSummaryCard = (
    title: string,
    value: number,
    subtitle?: string
  ) => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryTitle}>{title}</Text>
      {subtitle && <Text style={styles.summarySubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderStudentCard = (
    student: Student,
    showActions: boolean = false,
    actionType: 'payment' | 'request' | 'subscription' = 'payment'
  ) => (
    <View key={student.id} style={styles.studentCard}>
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
        <View style={styles.actionButtons}>
          {actionType === 'payment' && (
            <TouchableOpacity style={styles.markAsPaidButton}>
              <Text style={styles.markAsPaidText}>Mark as paid</Text>
            </TouchableOpacity>
          )}
          {actionType === 'request' && (
            <>
              <TouchableOpacity style={styles.acceptButton}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash" size={16} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
          {actionType === 'subscription' && (
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
          )}
        </View>
      )}
    </View>
  );

  const handleViewAllNewRequests = () => {
    navigation.navigate('new-student-requests');
  };

  const handleViewAllSubscriptions = () => {
    navigation.navigate('upcoming-subscription-end');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.logo}>Librify</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="person-circle" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="grid" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.librifyIcon}>
            <Text style={styles.librifyIconText}>L</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Section */}
        <View style={styles.section}></View>

        {/* Revenue Summary Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue summary</Text>
            <TouchableOpacity style={styles.periodSelector}>
              <Text style={styles.periodText}>{selectedPeriod}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.revenueContainer}>
            <Text style={styles.revenueTitle}>
              Total revenue ₹{totalRevenue}
            </Text>
            {renderRevenueChart()}
          </View>
        </View>

        {/* Payment Due Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Payment due ({paymentDueStudents.length})
            </Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or mobile..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={Colors.placeholder}
              />
            </View>
          </View>
          <View style={styles.studentList}>
            {paymentDueStudents.map((student) =>
              renderStudentCard(student, true, 'payment')
            )}
          </View>
        </View>

        {/* New Student Request Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              New student request ({newStudentRequests.length})
            </Text>
            <TouchableOpacity onPress={handleViewAllNewRequests}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.studentList}>
            {newStudentRequests.map((student) =>
              renderStudentCard(student, true, 'request')
            )}
          </View>
        </View>

        {/* Upcoming Subscription End Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming subscription end</Text>
            <TouchableOpacity onPress={handleViewAllSubscriptions}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === '3 days left (12)' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('3 days left (12)')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === '3 days left (12)' && styles.activeTabText,
                ]}
              >
                3 days left (12)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === '7 days left (23)' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('7 days left (23)')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === '7 days left (23)' && styles.activeTabText,
                ]}
              >
                7 days left (23)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Buffer days stu' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('Buffer days stu')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'Buffer days stu' && styles.activeTabText,
                ]}
              >
                Buffer days stu
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.studentList}>
            {subscriptionEndStudents.map((student) =>
              renderStudentCard(student, true, 'subscription')
            )}
          </View>
        </View>

        {/* Recent Students Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent students</Text>
          </View>
          <View style={styles.recentStudentsTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Name</Text>
              <Text style={styles.tableHeaderText}>Joining date</Text>
            </View>
            {recentStudents.map((student) => (
              <View key={student.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{student.name}</Text>
                <Text style={styles.tableCell}>{student.joiningDate}</Text>
              </View>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuButton: {
    padding: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  librifyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  librifyIconText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    gap: 16,
  },
  summaryCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.backgroundPattern,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  summarySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  revenueContainer: {
    backgroundColor: Colors.backgroundPattern,
    padding: 24,
    borderRadius: 12,
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
  donutChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  chartSegment: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
  },
  chartCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
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
    minWidth: 200,
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
