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
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

interface StudentRequest {
  id: string;
  name: string;
  price: number;
  duration: string;
  contactNo: string;
  roomId: string;
}

// Reusable Student Request Card Component
const StudentRequestCard: React.FC<{
  request: StudentRequest;
  onAccept: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ request, onAccept, onDelete }) => {
  return (
    <View style={styles.requestCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.studentIdName}>
          {request.id} {request.name}
        </Text>
        <Text style={styles.price}>₹ {request.price}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.duration}>Duration: {request.duration}</Text>
          <Text style={styles.contactNo}>Contact no: {request.contactNo}</Text>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.roomIdContainer}>
            <Text style={styles.roomId}>{request.roomId}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request.id)}
        >
          <Ionicons name="checkmark" size={16} color="white" />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(request.id)}
        >
          <Ionicons name="trash-outline" size={16} color="white" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function NewStudentRequestsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const [studentRequests, setStudentRequests] = useState<StudentRequest[]>([
    {
      id: '01',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '02',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '03',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '04',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '05',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '06',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
    {
      id: '07',
      name: 'Deepak Shukla',
      price: 2533,
      duration: '25 Jan - 25 Feb 2025',
      contactNo: '9910564550',
      roomId: 'A-101',
    },
  ]);

  const handleAccept = (id: string) => {
    Alert.alert(
      'Accept Request',
      'Are you sure you want to accept this student request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          style: 'default',
          onPress: () => {
            setStudentRequests((prev) => prev.filter((req) => req.id !== id));
            // Add API call here to accept the request
          },
        },
      ]
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Request',
      'Are you sure you want to delete this student request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setStudentRequests((prev) => prev.filter((req) => req.id !== id));
            // Add API call here to delete the request
          },
        },
      ]
    );
  };

  const filteredRequests = studentRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.contactNo.includes(searchQuery)
  );

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
          <Text style={styles.headerTitle}>
            New student request ({studentRequests.length})
          </Text>
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

        {/* Student Requests List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {filteredRequests.map((request) => (
            <StudentRequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onDelete={handleDelete}
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
    paddingTop: 50, // Add top padding to account for status bar
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
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentIdName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftContent: {
    flex: 1,
  },
  duration: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  contactNo: {
    fontSize: 14,
    color: '#6B7280',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    gap: 4,
    minWidth: 100,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    gap: 4,
    minWidth: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
