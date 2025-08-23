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
  // Add more A section seats to match the design
  {
    id: 'A-17',
    number: 'A-17',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-18',
    number: 'A-18',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-19',
    number: 'A-19',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-20',
    number: 'A-20',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-21',
    number: 'A-21',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-22',
    number: 'A-22',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-23',
    number: 'A-23',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-24',
    number: 'A-24',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-25',
    number: 'A-25',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-26',
    number: 'A-26',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-27',
    number: 'A-27',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-28',
    number: 'A-28',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-29',
    number: 'A-29',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'A-30',
    number: 'A-30',
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
  {
    id: 'B-6',
    number: 'B-6',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-7',
    number: 'B-7',
    status: 'available' as SeatStatus,
    hasNotification: false,
  },
  {
    id: 'B-8',
    number: 'B-8',
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
  {
    id: 'C-8',
    number: 'C-8',
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
  'A-2': {
    seatNumber: 'A-2',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-5',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
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
  'A-3': {
    seatNumber: 'A-3',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-9',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-10',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-11',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-12',
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
        id: 'shift-13',
        type: 'morning',
        status: 'booked',
        studentName: 'John Doe',
      },
      {
        id: 'shift-14',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-15',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-16',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-5': {
    seatNumber: 'A-5',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-17',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-18',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-19',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-20',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-6': {
    seatNumber: 'A-6',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-21',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-22',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-23',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-24',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-7': {
    seatNumber: 'A-7',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-25',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-26',
        type: 'evening',
        status: 'booked',
        studentName: 'Sarah Wilson',
      },
      {
        id: 'shift-27',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-28',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-8': {
    seatNumber: 'A-8',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-29',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-30',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-31',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-32',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-9': {
    seatNumber: 'A-9',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-33',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-34',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-35',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-36',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-10': {
    seatNumber: 'A-10',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-37',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-38',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-39',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-40',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-11': {
    seatNumber: 'A-11',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-41',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-42',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-43',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-44',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-12': {
    seatNumber: 'A-12',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-45',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-46',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-47',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-48',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-13': {
    seatNumber: 'A-13',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-49',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-50',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-51',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-52',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-14': {
    seatNumber: 'A-14',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-53',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-54',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-55',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-56',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-15': {
    seatNumber: 'A-15',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-57',
        type: 'morning',
        status: 'unavailable',
        studentName: 'Name-',
      },
      {
        id: 'shift-58',
        type: 'evening',
        status: 'unavailable',
        studentName: 'Name-',
      },
      {
        id: 'shift-59',
        type: 'night',
        status: 'unavailable',
        studentName: 'Name-',
      },
      {
        id: 'shift-60',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-16': {
    seatNumber: 'A-16',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-61',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-62',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-63',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-64',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-17': {
    seatNumber: 'A-17',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-65',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-66',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-67',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-68',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-18': {
    seatNumber: 'A-18',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-69',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-70',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-71',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-72',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-19': {
    seatNumber: 'A-19',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-73',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-74',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-75',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-76',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-20': {
    seatNumber: 'A-20',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-77',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-78',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-79',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-80',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-21': {
    seatNumber: 'A-21',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-81',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-82',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-83',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-84',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-22': {
    seatNumber: 'A-22',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-85',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-86',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-87',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-88',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-23': {
    seatNumber: 'A-23',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-89',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-90',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-91',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-92',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-24': {
    seatNumber: 'A-24',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-93',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-94',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-95',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-96',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-25': {
    seatNumber: 'A-25',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-97',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-98',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-99',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-100',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-26': {
    seatNumber: 'A-26',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-101',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-102',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-103',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-104',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-27': {
    seatNumber: 'A-27',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-105',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-106',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-107',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-108',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'A-28': {
    seatNumber: 'A-28',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-109',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-110',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-111',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-112',
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
  'A-30': {
    seatNumber: 'A-30',
    floor: 'A',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-113',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-114',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-115',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-116',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  // Section B seats
  'B-1': {
    seatNumber: 'B-1',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b1-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b1-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b1-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b1-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-2': {
    seatNumber: 'B-2',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b2-1',
        type: 'morning',
        status: 'booked',
        studentName: 'Mike Johnson',
      },
      {
        id: 'shift-b2-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b2-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b2-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-3': {
    seatNumber: 'B-3',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b3-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b3-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b3-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b3-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-4': {
    seatNumber: 'B-4',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b4-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b4-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b4-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b4-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-5': {
    seatNumber: 'B-5',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b5-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b5-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b5-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b5-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-6': {
    seatNumber: 'B-6',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b6-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b6-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b6-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b6-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-7': {
    seatNumber: 'B-7',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b7-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b7-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b7-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b7-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'B-8': {
    seatNumber: 'B-8',
    floor: 'B',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-b8-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b8-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b8-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-b8-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  // Section C seats
  'C-1': {
    seatNumber: 'C-1',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c1-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c1-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c1-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c1-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-2': {
    seatNumber: 'C-2',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c2-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c2-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c2-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c2-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-3': {
    seatNumber: 'C-3',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c3-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c3-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c3-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c3-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-4': {
    seatNumber: 'C-4',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c4-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c4-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c4-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c4-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-5': {
    seatNumber: 'C-5',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c5-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c5-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c5-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c5-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-6': {
    seatNumber: 'C-6',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c6-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c6-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c6-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c6-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-7': {
    seatNumber: 'C-7',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c7-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c7-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c7-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c7-4',
        type: 'fullDay',
        status: 'unavailable',
        studentName: 'Name-',
      },
    ],
  },
  'C-8': {
    seatNumber: 'C-8',
    floor: 'C',
    date: 'Seat status - 22 Aug 2025',
    shifts: [
      {
        id: 'shift-c8-1',
        type: 'morning',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c8-2',
        type: 'evening',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c8-3',
        type: 'night',
        status: 'available',
        studentName: 'Name-',
      },
      {
        id: 'shift-c8-4',
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
    // First check if we have specific data for this seat
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
    justifyContent: 'space-between',
  },
});
