import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

interface Subscription {
  id: string;
  name: string;
  duration: string;
  contactNo: string;
  studentId: string;
  roomId: string;
  daysLeft: number;
  studentType: 'fixed' | 'floating';
}

// Reusable Subscription Card Component
const SubscriptionCard: React.FC<{
  subscription: Subscription;
  onPaid: (id: string) => void;
  onMessage: (id: string) => void;
}> = ({ subscription, onPaid, onMessage }) => {
  return (
    <View style={styles.subscriptionCard}>
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.studentId}>{subscription.id}</Text>
          <Text style={styles.studentName}>{subscription.name}</Text>
          <Text style={styles.duration}>Duration: {subscription.duration}</Text>
          <Text style={styles.contactNo}>
            Contact no: {subscription.contactNo}
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.paidButton}
              onPress={() => onPaid(subscription.id)}
            >
              <Ionicons name="happy-outline" size={14} color="#000000" />
              <Text style={styles.paidButtonText}>Paid</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => onMessage(subscription.id)}
            >
              <Ionicons name="chatbubble-outline" size={14} color="white" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.studentIdLabel}>
            ID: {subscription.studentId}
          </Text>
          <View style={styles.roomIdContainer}>
            <Text style={styles.roomId}>{subscription.roomId}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function UpcomingSubscriptionEndScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDaysFilter, setSelectedDaysFilter] = useState(1);
  const [selectedStudentType, setSelectedStudentType] = useState<
    'all' | 'fixed' | 'floating'
  >('all');

  // Mock data - replace with actual API data
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '01',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM005',
      roomId: 'A-101',
      daysLeft: 1,
      studentType: 'fixed',
    },
    {
      id: '02',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM006',
      roomId: 'A-102',
      daysLeft: 1,
      studentType: 'floating',
    },
    {
      id: '03',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM007',
      roomId: 'A-103',
      daysLeft: 1,
      studentType: 'fixed',
    },
    {
      id: '04',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM008',
      roomId: 'A-104',
      daysLeft: 1,
      studentType: 'floating',
    },
    {
      id: '05',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM009',
      roomId: 'A-105',
      daysLeft: 1,
      studentType: 'fixed',
    },
    {
      id: '06',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM010',
      roomId: 'A-106',
      daysLeft: 1,
      studentType: 'floating',
    },
    {
      id: '07',
      name: 'Deepak Shukla',
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      studentId: 'MEM011',
      roomId: 'A-107',
      daysLeft: 1,
      studentType: 'fixed',
    },
  ]);

  const daysFilters = [
    { days: 1, count: 12 },
    { days: 3, count: 23 },
    { days: 7, count: 8 },
  ];

  const studentTypeFilters = [
    { key: 'all', label: 'All' },
    { key: 'fixed', label: 'Fixed students' },
    { key: 'floating', label: 'Floating students' },
  ];

  const handlePaid = (id: string) => {
    // Add API call here to mark as paid
    console.log('Marked as paid:', id);
  };

  const handleMessage = (id: string) => {
    // Add API call here to send message
    console.log('Send message to:', id);
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.studentId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subscription.contactNo.includes(searchQuery);

    const matchesDaysFilter = subscription.daysLeft === selectedDaysFilter;
    const matchesStudentType =
      selectedStudentType === 'all' ||
      subscription.studentType === selectedStudentType;

    return matchesSearch && matchesDaysFilter && matchesStudentType;
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upcoming subscription end</Text>
        </View>

        {/* Days Left Filters */}
        <View style={styles.daysFilterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {daysFilters.map((filter) => (
              <TouchableOpacity
                key={filter.days}
                style={[
                  styles.daysFilterButton,
                  selectedDaysFilter === filter.days &&
                    styles.daysFilterButtonActive,
                ]}
                onPress={() => setSelectedDaysFilter(filter.days)}
              >
                <Text
                  style={[
                    styles.daysFilterText,
                    selectedDaysFilter === filter.days &&
                      styles.daysFilterTextActive,
                  ]}
                >
                  {filter.days} {filter.days === 1 ? 'day' : 'days'} left (
                  {filter.count})
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.daysFilterButton}>
              <Text style={styles.daysFilterText}>Buffer days</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#9CA3AF"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, number, id"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Student Type Filters */}
        <View style={styles.studentTypeFilterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {studentTypeFilters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.studentTypeFilterButton,
                  selectedStudentType === filter.key &&
                    styles.studentTypeFilterButtonActive,
                ]}
                onPress={() =>
                  setSelectedStudentType(
                    filter.key as 'all' | 'fixed' | 'floating'
                  )
                }
              >
                <Text
                  style={[
                    styles.studentTypeFilterText,
                    selectedStudentType === filter.key &&
                      styles.studentTypeFilterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Subscriptions List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {filteredSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onPaid={handlePaid}
              onMessage={handleMessage}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  daysFilterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  daysFilterButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  daysFilterButtonActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  daysFilterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  daysFilterTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  studentTypeFilterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  studentTypeFilterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  studentTypeFilterButtonActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  studentTypeFilterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  studentTypeFilterTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subscriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
  },
  studentId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  contactNo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  paidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  paidButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  messageButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  studentIdLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  roomIdContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roomId: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
