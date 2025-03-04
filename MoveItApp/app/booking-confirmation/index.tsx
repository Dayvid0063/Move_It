import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { router } from 'expo-router';

type BookingDetailsType = {
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  totalAmount: number;
  carId: string;
  carName: string;
  pricePerDay: number;
  transactionId?: string;
  transactionRef: string;
};

const BookingConfirmationScreen = () => {
  const { bookingDetails } = useLocalSearchParams() as { bookingDetails: string };

  // Parse bookingDetails if it's a JSON string, or use it directly if it's already an object
  const parsedBookingDetails: BookingDetailsType = typeof bookingDetails === 'string'
    ? JSON.parse(bookingDetails)
    : bookingDetails;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.confirmationContent}>
        <View style={styles.successIcon}>
          <MaterialCommunityIcons
            name="check-circle"
            size={80}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
        <Text style={styles.confirmationSubtitle}>
          Your booking has been successfully processed
        </Text>

        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Car</Text>
            <Text style={styles.detailValue}>{parsedBookingDetails.carName}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>
              {parsedBookingDetails.numberOfDays} days
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Start Date</Text>
            <Text style={styles.detailValue}>
              {new Date(parsedBookingDetails.startDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>End Date</Text>
            <Text style={styles.detailValue}>
              {new Date(parsedBookingDetails.endDate).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={[styles.detailValue, styles.totalAmount]}>
              ₦{parsedBookingDetails.totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  content: {
    flex: 1,
    padding: SIZES.md,
  },
  carInfo: {
    marginBottom: SIZES.xl,
  },
  carName: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  priceText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  dateSection: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.md,
    marginBottom: SIZES.sm,
  },
  dateTextContainer: {
    marginLeft: SIZES.sm,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  dateValue: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  summarySection: {
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.md,
    padding: SIZES.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  bottomBar: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  payButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  payButtonDisabled: {
    backgroundColor: COLORS.gray[400],
  },
  // Confirmation Screen Styles
  confirmationContent: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.xl,
  },
  successIcon: {
    marginVertical: SIZES.xl,
  },
  confirmationTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.sm,
  },
  confirmationSubtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  bookingDetails: {
    width: '100%',
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.md,
    padding: SIZES.md,
    marginBottom: SIZES.xl,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  detailValue: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default BookingConfirmationScreen;
