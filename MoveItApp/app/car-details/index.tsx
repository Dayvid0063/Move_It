import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  Share,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { getCar } from "@/api/cars/cars";
import { useRoute, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import CarLoader from "@/components/CarLoader";

const { width } = Dimensions.get("window");

type CarType = {
  id: string;
  name: string;
  pricePerDay: number;
  passengerCapacity: number;
  plateNumber: string;
  description: string;
  images: string[];
  features: string[];
  brand: {
    id: string;
    name: string;
    image: string;
  };
  status: string;
};

type CarDetailsProps = {
  onBookingPress: () => void;
};

const CarDetails: React.FC<CarDetailsProps> = ({ onBookingPress }) => {
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setLoading(true);
    const fetchCar = async () => {
      const { carId } = route.params as { carId: string };
      if (carId) {
        try {
          const response = await getCar(carId);
          setSelectedCar(response.data as CarType);
        } catch (error) {
          console.error("Error fetching car:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCar();
  }, [route.params]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${selectedCar?.name} on our car rental app!`,
        title: selectedCar?.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderHeader = () => (
    <BlurView intensity={5} style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? COLORS.primary : COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );

  const renderImageCarousel = () => (
    <View style={styles.carouselContainer}>
      {selectedCar && selectedCar.images && selectedCar.images.length > 0 ? (
        <Swiper
          loop={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination}
          onIndexChanged={setActiveImageIndex}
          showsButtons={selectedCar.images.length > 1}
          buttonWrapperStyle={styles.swiperButtonWrapper}
          nextButton={<Text style={styles.swiperButton}>›</Text>}
          prevButton={<Text style={styles.swiperButton}>‹</Text>}
        >
          {selectedCar.images.map((image, index) => (
            <View key={index} style={styles.carouselSlide}>
              <Image source={{ uri: image }} style={styles.carouselImage} />
              <BlurView intensity={80} tint="dark" style={styles.imageCounter}>
                <Text style={styles.imageCounterText}>
                  {index + 1}/{selectedCar.images.length}
                </Text>
              </BlurView>
            </View>
          ))}
        </Swiper>
      ) : (
        <Text>No images available</Text>
      )}
    </View>
  );

  const renderBrandBadge = () => (
    <View style={styles.brandBadgeContainer}>
      <BlurView intensity={80} tint="light" style={styles.brandBadge}>
        <Image
          source={{ uri: selectedCar?.brand.image }}
          style={styles.brandImage}
        />
        <Text style={styles.brandName}>{selectedCar?.brand.name}</Text>
      </BlurView>
      <BlurView
        intensity={80}
        tint="light"
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              selectedCar?.status === "Available"
                ? "rgba(0, 180, 0, 0.2)"
                : "rgba(180, 0, 0, 0.2)",
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                selectedCar?.status === "Available" ? "#008000" : "#800000",
            },
          ]}
        >
          {selectedCar?.status}
        </Text>
      </BlurView>
    </View>
  );
  const renderCarInfo = () => (
    <View style={styles.carInfoSection}>
      <View style={styles.nameRow}>
        <View>
          <Text style={styles.carName}>{selectedCar?.name}</Text>
          <Text style={styles.plateNumber}>{selectedCar?.plateNumber}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{selectedCar?.status}</Text>
        </View>
      </View>

      <Text style={styles.description}>{selectedCar?.description}</Text>

      <View style={styles.specRow}>
        <View style={styles.specItem}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color={COLORS.gray[600]}
          />
          <Text style={styles.specText}>
            {selectedCar?.passengerCapacity} Passengers
          </Text>
        </View>
        <View style={styles.specItem}>
          <MaterialCommunityIcons
            name="currency-ngn"
            size={24}
            color={COLORS.gray[600]}
          />
          <Text style={styles.specText}>
            {selectedCar?.pricePerDay.toLocaleString()}/day
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.featuresSection}>
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.featuresList}>
        {selectedCar?.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const handleBookingPress = () => {
    if (selectedCar) {
      router.push({
        pathname: "/car-bookings",
        params: {
          carId: selectedCar.id,
          carName: selectedCar.name,
          pricePerDay: selectedCar.pricePerDay,
        },
      });
    }
  };

  const renderBookingButton = () => (
    <View style={styles.bottomBar}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price per day</Text>
        <Text style={styles.priceValue}>
          ₦{selectedCar?.pricePerDay.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.bookButton,
          selectedCar?.status !== "AVAILABLE" && styles.bookButtonDisabled,
        ]}
        onPress={handleBookingPress}
        disabled={selectedCar?.status !== "AVAILABLE"}
      >
        <Text style={styles.bookButtonText}>
          {selectedCar?.status === "AVAILABLE" ? "Book Now" : "Not Available"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <CarLoader size={50} />
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderImageCarousel()}
          {renderBrandBadge()}
          {renderCarInfo()}
          {renderFeatures()}
        </ScrollView>
      )}
      {renderBookingButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: SIZES.xl,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SIZES.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.sm,
  },
  bookButtonDisabled: {
    backgroundColor: COLORS.gray[400],
  },
  headerActions: {
    flexDirection: "row",
  },
  carouselContainer: {
    height: 350,
    backgroundColor: COLORS.gray[100],
  },
  swiperButtonWrapper: {
    color: COLORS.white,
    paddingHorizontal: SIZES.lg,
  },
  swiperButton: {
    color: COLORS.white,
    fontSize: 44,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 44,
    height: 44,
    borderRadius: 22,
    textAlign: "center",
    lineHeight: Platform.OS === "ios" ? 40 : 44,
  },
  carouselSlide: {
    width,
    height: 350,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 24,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  pagination: {
    bottom: 20,
  },
  imageCounter: {
    position: "absolute",
    top: SIZES.lg,
    right: SIZES.lg,
    borderRadius: SIZES.md,
    overflow: "hidden",
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.medium,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
  },
  swipeIndicator: {
    position: "absolute",
    top: "50%",
    right: SIZES.md,
    borderRadius: SIZES.lg,
    overflow: "hidden",
    alignItems: "center",
    padding: SIZES.sm,
  },
  swipeText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.medium,
    marginTop: SIZES.xs,
  },
  brandBadgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.md,
    marginTop: -SIZES.xl,
    marginBottom: SIZES.md,
  },
  brandBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.lg,
    overflow: "hidden",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  brandImage: {
    width: 24,
    height: 24,
    marginRight: SIZES.xs,
  },
  brandName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[800],
  },
  statusBadge: {
    borderRadius: SIZES.md,
    overflow: "hidden",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  bottomSpacing: {
    height: 100,
  },
  carInfoSection: {
    padding: SIZES.md,
    paddingTop: SIZES.xl,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SIZES.sm,
  },
  carName: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  plateNumber: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginBottom: SIZES.md,
    lineHeight: 20,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.md,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.sm,
  },
  specText: {
    marginLeft: SIZES.xs,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[800],
  },
  featuresSection: {
    padding: SIZES.md,
    backgroundColor: COLORS.gray[100],
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: SIZES.sm,
  },
  featureText: {
    marginLeft: SIZES.xs,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[800],
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  priceValue: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  priceDetail: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    textAlign: "right",
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.md,
    padding: SIZES.md,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default CarDetails;
