import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import CarLoader from "@/components/CarLoader";

type BookingStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

type BookingDetails = {
  id: string;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  totalAmount: number;
  status: BookingStatus;
  numberOfDays: number;
  pricePerDay: number;
  chauffeurName?: string;
  chauffeurPhone?: string;
  transactionRef: string;
  createdAt: string;
};

const BookingDetails = () => {
  const { bookingId } = useLocalSearchParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      setBooking({
        id: bookingId as string,
        carName: "Mercedes Benz S-Class",
        carImage: "/path/to/image.jpg",
        startDate: "2024-03-10",
        endDate: "2024-03-15",
        pickupLocation: "123 Main Street, Lagos",
        totalAmount: 250000,
        status: "upcoming",
        numberOfDays: 5,
        pricePerDay: 50000,
        chauffeurName: "John Doe",
        chauffeurPhone: "+234123456789",
        transactionRef: "TRX-123456",
        createdAt: "2024-03-01T12:00:00Z",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setLoading(false);
      Alert.alert("Error", "Unable to fetch booking details");
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "upcoming":
        return COLORS.primary;
      case "ongoing":
        return COLORS.success;
      case "completed":
        return COLORS.gray[600];
      case "cancelled":
        return COLORS.danger;
      default:
        return COLORS.gray[600];
    }
  };

  const handleCallChauffeur = () => {
    if (booking?.chauffeurPhone) {
      Linking.openURL(`tel:${booking.chauffeurPhone}`);
    }
  };

  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              // await cancelBooking(bookingId);
              Alert.alert(
                "Booking Cancelled",
                "Your booking has been cancelled successfully",
                [
                  {
                    text: "OK",
                    onPress: () => router.back(),
                  },
                ]
              );
            } catch (error) {
              Alert.alert("Error", "Unable to cancel booking");
            }
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <BlurView intensity={80} tint="light" style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 40 }} />
      </View>
    </BlurView>
  );

  if (loading || !booking) {
    return (
      <View style={styles.loadingContainer}>
        <CarLoader size={50} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>

        {/* Car Information */}
        <View style={styles.section}>
          <Text style={styles.carName}>{booking.carName}</Text>
          <Text style={styles.bookingId}>Booking ID: {booking.id}</Text>
        </View>

        {/* Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>
                {new Date(booking.startDate).toLocaleDateString()}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color={COLORS.gray[400]}
            />
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>
                {new Date(booking.endDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Pickup Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Location</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.infoText}>{booking.pickupLocation}</Text>
          </View>
        </View>

        {/* Chauffeur Information */}
        {booking.chauffeurName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chauffeur Details</Text>
            <View style={styles.chauffeurCard}>
              <View style={styles.chauffeurInfo}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={COLORS.primary}
                />
                <View>
                  <Text style={styles.chauffeurName}>{booking.chauffeurName}</Text>
                  <Text style={styles.chauffeurPhone}>{booking.chauffeurPhone}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleCallChauffeur}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Price per day</Text>
              <Text style={styles.paymentValue}>
                ₦{booking.pricePerDay.toLocaleString()}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Number of days</Text>
              <Text style={styles.paymentValue}>{booking.numberOfDays} days</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Transaction Reference</Text>
              <Text style={styles.paymentValue}>{booking.transactionRef}</Text>
            </View>
            <View style={[styles.paymentRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                ₦{booking.totalAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Date */}
        <Text style={styles.bookingDate}>
          Booked on {new Date(booking.createdAt).toLocaleDateString()}
        </Text>
      </ScrollView>

      {/* Cancel Button for upcoming bookings */}
      {booking.status === "upcoming" && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelBooking}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: "center",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.xs,
    marginBottom: SIZES.md,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.medium,
    textTransform: "capitalize",
  },
  section: {
    marginBottom: SIZES.xl,
  },
  carName: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  bookingId: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray[100],
    padding: SIZES.md,
    borderRadius: SIZES.md,
  },
  dateBox: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginBottom: SIZES.xs,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray[100],
    padding: SIZES.md,
    borderRadius: SIZES.md,
  },
  infoText: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
  chauffeurCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray[100],
    padding: SIZES.md,
    borderRadius: SIZES.md,
  },
  chauffeurInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.sm,
  },
  chauffeurName: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  chauffeurPhone: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  callButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentDetails: {
    backgroundColor: COLORS.gray[100],
    padding: SIZES.md,
    borderRadius: SIZES.md,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.sm,
  },
  paymentLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  totalRow: {
    marginTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[300],
    paddingTop: SIZES.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  bookingDate: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    textAlign: "center",
    marginBottom: SIZES.xl,
  },
  bottomBar: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  cancelButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.md,
    borderRadius: SIZES.md,
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default BookingDetails;
