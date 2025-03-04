import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import CarLoader from "@/components/CarLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserBookings } from "@/api/bookings/bookings";

type Booking = {
  id: string;
  car: {
    name: string;
  };
  startDate: string;
  endDate: string;
  pickupLocation: string;
  totalAmount: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
};


type User = {
  firstName: string;
  id: string
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
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
  
  const userId = user?.id;
  
  useEffect(() => {
    if (userId) {
      fetchBookings();
    } else if (user !== null) {
      console.warn("User ID is undefined. Cannot fetch bookings.");
      setLoading(false);
    }
  }, [user]);
  
  const fetchBookings = async () => {
    setLoading(true);
    if (!userId) {
      console.warn("User ID is undefined. Cannot fetch bookings.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await getUserBookings(userId);
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const getStatusColor = (status: Booking["status"]) => {
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

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => router.push({
        pathname: "/booking-details",
        params: { bookingId: item.id }
      })}
    >
      <View style={styles.cardHeader}>
        {/* Access car name via item.car.name */}
        <Text style={styles.carName}>{item.car.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
  
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons
            name="calendar-range"
            size={20}
            color={COLORS.gray[600]}
          />
          <Text style={styles.detailText}>
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Text>
        </View>
  
        <View style={styles.detailRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={COLORS.gray[600]}
          />
          <Text style={styles.detailText}>{item.pickupLocation}</Text>
        </View>
  
        <View style={styles.detailRow}>
          <MaterialCommunityIcons
            name="cash"
            size={20}
            color={COLORS.gray[600]}
          />
          <Text style={styles.detailText}>₦{item.totalAmount.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  const renderHeader = () => (
    <BlurView intensity={80} tint="light" style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 40 }} />
      </View>
    </BlurView>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <CarLoader size={50} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="calendar-blank"
              size={64}
              color={COLORS.gray[400]}
            />
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        )}
      />
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
  listContainer: {
    padding: SIZES.md,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.md,
  },
  carName: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  statusBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.xs,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    textTransform: "capitalize",
  },
  bookingDetails: {
    gap: SIZES.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.sm,
  },
  detailText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.xl,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
    marginTop: SIZES.md,
  },
});

export default MyBookings;