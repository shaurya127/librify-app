import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

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

interface TransactionCardProps {
  transaction: Transaction;
  showBorder?: boolean;
}

export default function TransactionCard({
  transaction,
  showBorder = false,
}: TransactionCardProps) {
  return (
    <View style={[styles.container, showBorder && styles.bordered]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.type}>{transaction.type}</Text>
        <Text style={styles.time}>{transaction.time}</Text>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Paid amount</Text>
            <Text style={styles.value}>₹{transaction.amount}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Payment ID</Text>
            <Text style={styles.value}>{transaction.paymentId}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Payment date</Text>
            <Text style={styles.value}>{transaction.paymentDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Payment method</Text>
            <Text style={styles.value}>{transaction.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Student name</Text>
            <Text style={styles.value}>{transaction.studentName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Payment received by</Text>
            <Text style={styles.value}>{transaction.receivedBy}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  time: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailsGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  detailItem: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
});
