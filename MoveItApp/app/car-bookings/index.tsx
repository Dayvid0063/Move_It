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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { router } from "expo-router";
import { createBooking } from "@/api/bookings/bookings";
import TermsModal from "@/components/TermsModal";
import CarLoader from "@/components/CarLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BookingDetailsType = {
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  totalAmount: number;
  userId: string;
  carId: string;
  carName: string;
  pricePerDay: number;
  transactionId?: string;
  transactionRef: string;
};

interface RedirectParams {
  status: "successful" | "cancelled" | "completed";
  transaction_id?: string;
  tx_ref: string;
}

type User = {
  firstName: string;
  id: string;
  email: string;
};

const CarBookings = () => {
  const { carId, carName, pricePerDay } = useLocalSearchParams() as unknown as {
    carId: string;
    carName: string;
    pricePerDay: number;
  };
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    getUser();
  }, []);

  const userId = user?.id || "";

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const calculateTotalDays = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalAmount = () => calculateTotalDays() * pricePerDay;

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(new Date(selectedDate.getTime() + 86400000));
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate && selectedDate > startDate) {
      setEndDate(selectedDate);
    } else {
      Alert.alert("Invalid Date", "End date must be after start date");
    }
  };

  const handleOnRedirect = async (data: RedirectParams) => {
    setIsInitializing(false);

    if (data.status === "successful" || data.status === "completed") {
      const bookingDetails: BookingDetailsType = {
        startDate,
        endDate,
        numberOfDays: calculateTotalDays(),
        totalAmount: calculateTotalAmount(),
        carId,
        userId,
        carName,
        pricePerDay,
        transactionId: data.transaction_id,
        transactionRef: data.tx_ref,
      };


      // Call createBooking to save booking details to the backend
      const response = await createBooking(bookingDetails);

      if (response.status === 201) {
        // Navigate to booking confirmation page if successful
        router.push({
          pathname: "/booking-confirmation",
          params: { bookingDetails: JSON.stringify(bookingDetails) },
        });
      } else {
        Alert.alert(
          "Booking Failed",
          "An error occurred while saving your booking."
        );
      }
    } else if (data.status === "cancelled") {
      Alert.alert(
        "Payment Cancelled",
        "Your payment was cancelled. Please try again."
      );
    }
  };


  const generateTransactionRef = () =>
    `booking-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

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

  const renderPaymentButton = () => (
    <PayWithFlutterwave
      onRedirect={handleOnRedirect}
      options={{
        tx_ref: generateTransactionRef(),
        authorization: "FLWPUBK_TEST-24fb79b5752973686591cae407b7c129-X",
        customer: {
          email: user?.email ? user.email : "user@example.com",
          name: "",
        },
        amount: calculateTotalAmount(),
        currency: "NGN",
        payment_options: "card,ussd,banktransfer",
        customizations: {
          title: "MoveIt Car Rental Payment",
          description: `Booking payment for ${carName}`,
          logo: "@/assets/images/Logo.png",
        },
      }}
      customButton={(props) => (
        <TouchableOpacity
          style={[
            styles.payButton,
            (!termsAccepted || props.disabled) && styles.payButtonDisabled
          ]}
          onPress={() => {
            setIsInitializing(true);
            props.onPress();
          }}
          disabled={!termsAccepted || props.disabled}
        >
          <Text style={styles.payButtonText}>
            {isInitializing
              ?
              <CarLoader size={50} />
              : `Pay ₦${calculateTotalAmount().toLocaleString()}`}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content}>
        <View style={styles.carInfo}>
          <Text style={styles.carName}>{carName}</Text>
          <Text style={styles.priceText}>
            ₦{pricePerDay.toLocaleString()}/day
          </Text>
        </View>

        <View style={styles.dateSection}>
          <Text style={styles.sectionTitle}>Select Dates</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowStartPicker(true)}
          >
            <MaterialCommunityIcons
              name="calendar-start"
              size={24}
              color={COLORS.primary}
            />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>
                {startDate.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowEndPicker(true)}
          >
            <MaterialCommunityIcons
              name="calendar-end"
              size={24}
              color={COLORS.primary}
            />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>
                {endDate.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleStartDateChange}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              minimumDate={new Date(startDate.getTime() + 86400000)}
              onChange={handleEndDateChange}
            />
          )}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{calculateTotalDays()} days</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Price per day</Text>
            <Text style={styles.summaryValue}>
              ₦{pricePerDay.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={[styles.summaryValue, styles.totalAmount]}>
              ₦{calculateTotalAmount().toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.termsSection}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setTermsAccepted(!termsAccepted)}
              style={[styles.checkbox, { backgroundColor: termsAccepted ? COLORS.primary : 'transparent' }]}
            >
              {termsAccepted && (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={COLORS.white}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I agree to the{" "}
              <Text
                style={styles.termsLink}
                onPress={() => setShowTermsModal(true)}
              >
                terms and conditions
              </Text>
              , including the full tank policy
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>{renderPaymentButton()}</View>
      <TermsModal
        isVisible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </SafeAreaView>
  );
};

export default CarBookings;

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
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: "center",
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  payButtonDisabled: {
    backgroundColor: COLORS.gray[400],
  },
  termsSection: {
    marginTop: SIZES.xl,
    marginBottom: SIZES.md,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    textDecorationLine: 'underline',
  }
});
