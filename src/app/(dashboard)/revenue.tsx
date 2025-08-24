import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import TransactionCard from '@/components/TransactionCard';
import Sidebar from '@/components/Sidebar';
import { router, usePathname } from 'expo-router';

const { width } = Dimensions.get('window');

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
}

interface RevenueData {
  dueFee: number;
  newStudent: number;
  renewSubscription: number;
}

interface MonthlyRevenue {
  month: string;
  amount: number;
}

// Mock data
const MOCK_DATA = {
  totalRevenue: 324,
  onlinePayment: 324,
  offlinePayment: 0,
  revenueData: {
    dueFee: 45,
    newStudent: 35,
    renewSubscription: 20,
  } as RevenueData,
  monthlyRevenue: [
    { month: 'Jan', amount: 80 },
    { month: 'Feb', amount: 120 },
    { month: 'Mar', amount: 100 },
    { month: 'Apr', amount: 200 },
    { month: 'May', amount: 150 },
    { month: 'June', amount: 140 },
    { month: 'Jul', amount: 110 },
  ] as MonthlyRevenue[],
  transactions: [
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
    },
    {
      id: '2',
      type: 'Due fee paid',
      amount: 300,
      paymentId: '3RFXE3',
      paymentDate: '25 Jan 2025',
      paymentMethod: 'Online',
      studentName: 'Deepak Shukla',
      receivedBy: 'Rahul Jain',
      time: '04:45 pm',
    },
  ] as Transaction[],
};

const PERIODS = [
  'Past 1 month',
  'Past 3 months',
  'Past 6 months',
  'Past 1 year',
];
const TIME_AGGREGATIONS = ['Month wise', 'Week wise', 'Day wise'];

export default function RevenueScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Past 1 month');
  const [selectedTimeAggregation, setSelectedTimeAggregation] =
    useState('Month wise');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const pathname = usePathname();

  const slices = useMemo(() => {
    const total =
      MOCK_DATA.revenueData.dueFee +
      MOCK_DATA.revenueData.newStudent +
      MOCK_DATA.revenueData.renewSubscription;
    const portions = {
      dueFee: MOCK_DATA.revenueData.dueFee / total,
      newStudent: MOCK_DATA.revenueData.newStudent / total,
      renewSubscription: MOCK_DATA.revenueData.renewSubscription / total,
    };
    let cumulative = 0;
    return [
      {
        key: 'dueFee',
        color: '#FF8A80',
        start: cumulative,
        end: (cumulative += portions.dueFee * 360),
      },
      {
        key: 'newStudent',
        color: '#64B5F6',
        start: cumulative,
        end: (cumulative += portions.newStudent * 360),
      },
      {
        key: 'renewSubscription',
        color: '#FFF176',
        start: cumulative,
        end: (cumulative += portions.renewSubscription * 360),
      },
    ];
  }, []);

  const maxMonthlyAmount = Math.max(
    ...MOCK_DATA.monthlyRevenue.map((item) => item.amount)
  );

  const handleViewAllTransactions = () => {
    router.push('/all-transactions');
  };

  const handleMenuPress = () => {
    // Handle menu press
  };

  const handleMorePress = () => {
    setIsSidebarVisible(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarVisible(false);
  };

  const handleAddUserPress = () => {
    // Handle add user press
  };

  const handleGridPress = () => {
    // Handle grid/QR press
  };

  const handleAvatarPress = () => {
    // Handle avatar press
  };

  // Create pie chart path
  const createPieSlice = (
    startAngle: number,
    endAngle: number,
    radius: number,
    centerX: number,
    centerY: number
  ) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      centerX,
      centerY,
      'L',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'Z',
    ].join(' ');
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <Header
        onMenuPress={handleMenuPress}
        onAddUserPress={handleAddUserPress}
        onGridPress={handleGridPress}
        onAvatarPress={handleAvatarPress}
        onMorePress={handleMorePress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Period Filter */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Library revenue</Text>
          <TouchableOpacity style={styles.periodDropdown}>
            <Text style={styles.periodText}>{selectedPeriod}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Summary Section - Updated Design */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Summary</Text>

            <View style={styles.totalRevenueSection}>
              <Text style={styles.totalRevenueLabel}>Total Revenue</Text>
              <Text style={styles.totalRevenueValue}>
                ₹ {MOCK_DATA.totalRevenue}
              </Text>
            </View>

            <View style={styles.paymentBreakdown}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Online payment</Text>
                <Text style={styles.paymentValue}>
                  ₹ {MOCK_DATA.onlinePayment}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Offline payment</Text>
                <Text style={styles.paymentValue}>
                  ₹ {MOCK_DATA.offlinePayment}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Source Section - Updated Design */}
        <View style={styles.section}>
          <View style={styles.paymentSourceCard}>
            <Text style={styles.sectionTitle}>Payment source</Text>
            <View style={styles.pieChartSection}>
              <Svg width={140} height={140}>
                {slices.map((slice) => (
                  <Path
                    key={slice.key}
                    d={createPieSlice(slice.start, slice.end, 70, 70, 70)}
                    fill={slice.color}
                  />
                ))}
              </Svg>
            </View>

            <View style={styles.legendSection}>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#FF8A80' }]}
                  />
                  <Text style={styles.legendText}>Due fee</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: '#64B5F6' }]}
                  />
                  <Text style={styles.legendText}>New student</Text>
                </View>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: '#FFF176' }]}
                />
                <Text style={styles.legendText}>Renew subscriptions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Revenue Graph Section - Updated Design */}
        <View style={styles.section}>
          <View style={styles.graphHeader}>
            <Text style={styles.sectionTitle}>Revenue graph</Text>
            <TouchableOpacity style={styles.timeDropdown}>
              <Text style={styles.timeText}>{selectedTimeAggregation}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.barChartCard}>
            <Svg width={width - 80} height={160}>
              {MOCK_DATA.monthlyRevenue.map((item, index) => {
                const barHeight = (item.amount / maxMonthlyAmount) * 100;
                const barWidth = 28;
                const barX = index * 42 + 20;
                const barY = 120 - barHeight;

                return (
                  <React.Fragment key={item.month}>
                    <Rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill="#4CAF50"
                      rx={6}
                    />
                    <SvgText
                      x={barX + barWidth / 2}
                      y={140}
                      fontSize={12}
                      fill={Colors.textSecondary}
                      textAnchor="middle"
                    >
                      {item.month}
                    </SvgText>
                  </React.Fragment>
                );
              })}
            </Svg>
          </View>
        </View>

        {/* All Transactions Section - Using TransactionCard */}
        <View style={styles.section}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>All transaction</Text>
            <TouchableOpacity onPress={handleViewAllTransactions}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsContainer}>
            {MOCK_DATA.transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                showBorder={true}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={handleSidebarClose}
        currentRoute={pathname}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  periodDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  periodText: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    padding: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#777777',
    marginBottom: 0,
  },

  summaryCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 10,
    gap: 12, // Add gap between child cards
  },
  totalRevenueSection: {
    backgroundColor: '#E7E6FB40', // New background color for total revenue
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  totalRevenueLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  totalRevenueValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  paymentBreakdown: {
    flexDirection: 'row',
    gap: 12, // Add gap between online and offline payment cards
  },
  paymentItem: {
    flex: 1,
    backgroundColor: '#FFF2F56B', // New background color for payment items
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },

  // Updated Payment Source Styles
  paymentSourceCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  pieChartSection: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  pieChart: {
    // Add any specific pie chart styling
  },
  legendSection: {
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
    gap: 40,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#777777',
  },

  // Updated Graph Styles
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeText: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 4,
  },
  barChartCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },

  // Transaction Styles
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  transactionsContainer: {
    gap: 16,
  },
});
