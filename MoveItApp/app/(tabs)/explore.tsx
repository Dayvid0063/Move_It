import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useFocusEffect } from "@react-navigation/native";
import { getBrands } from "@/api/brands/brands";
import { getCars } from "@/api/cars/cars";
import CarLoader from "@/components/CarLoader";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - SIZES.xl;

type Brand = {
  id: string;
  name: string;
  image: any;
};

type CarType = {
  id: string;
  name: string;
  plateNumber: string;
  status: "AVAILABLE" | "RENTED" | "MAINTAINANCE";
  pricePerDay: number;
  passengerCapacity: number;
  description: string;
  images: string[];
  features: string[];
  brandId: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
};

const PRICE_RANGES = [
  { label: "Any", value: "any" },
  { label: "₦20k-50k", min: 20000, max: 50000 },
  { label: "₦50k-100k", min: 50000, max: 100000 },
  { label: "₦100k+", min: 100000, max: Infinity },
];

const STATUS_LABELS = {
  AVAILABLE: "Available",
  RENTED: "Rented",
  MAINTAINANCE: "In Maintenance",
};

type EmptyStateProps = {
  searchQuery: string;
  hasFilters: boolean;
  onReset: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  hasFilters,
  onReset,
}) => (
  <Animated.View entering={FadeInDown} style={styles.emptyStateContainer}>
    <MaterialCommunityIcons
      name="store-search"
      size={64}
      color={COLORS.gray[400]}
    />
    <Text style={styles.emptyStateTitle}>No Cars Found</Text>
    <Text style={styles.emptyStateDescription}>
      {searchQuery
        ? `No cars match "${searchQuery}"`
        : hasFilters
          ? "No cars match your selected filters"
          : "No cars available at the moment"}
    </Text>
    {(searchQuery || hasFilters) && (
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <MaterialCommunityIcons name="refresh" size={20} color={COLORS.white} />
        <Text style={styles.resetButtonText}>Reset All</Text>
      </TouchableOpacity>
    )}
  </Animated.View>
);

export default function ExploreScreen() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    brand: "All",
    priceRange: "any",
    features: [] as string[],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [brandsRes, carsRes] = await Promise.all([getBrands(), getCars()]);
      setBrands(brandsRes.data);
      setCars(carsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const getUniqueFeatures = () => {
    const featuresSet = new Set<string>();
    cars.forEach((car) =>
      car.features.forEach((feature) => featuresSet.add(feature))
    );
    return Array.from(featuresSet);
  };

  const filterCars = () => {
    return cars.filter((car) => {
      // Search filter
      if (
        searchQuery &&
        !car.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Brand filter
      if (
        activeFilters.brand !== "All" &&
        car.brand.name !== activeFilters.brand
      ) {
        return false;
      }

      // Price range filter
      if (activeFilters.priceRange !== "any") {
        const range = PRICE_RANGES.find(
          (r) => r.label === activeFilters.priceRange
        );
        if (range && range.min !== undefined && range.max !== undefined) {
          if (car.pricePerDay < range.min || car.pricePerDay > range.max) {
            return false;
          }
        }
      }

      // Features filter
      if (activeFilters.features.length > 0) {
        return activeFilters.features.every((feature) =>
          car.features.includes(feature)
        );
      }

      return true;
    });
  };
  const hasActiveFilters = () => {
    return (
      activeFilters.brand !== "All" ||
      activeFilters.priceRange !== "any" ||
      activeFilters.features.length > 0
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setActiveFilters({
      brand: "All",
      priceRange: "any",
      features: [],
    });
  };
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Explore Cars</Text>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilters(!showFilters)}
      >
        <MaterialCommunityIcons
          name="tune-vertical"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );

  const renderSearch = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={COLORS.gray[600]}
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search cars by name"
          placeholderTextColor={COLORS.gray[600]}
          style={styles.searchInput}
        />
      </View>
    </View>
  );

  const renderFilters = () => (
    <Animated.View
      entering={FadeInDown}
      style={[styles.filtersPanel, !showFilters && styles.hidden]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Brand</Text>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              key="All"
              style={[
                styles.filterChip,
                activeFilters.brand === "All" && styles.activeFilterChip,
              ]}
              onPress={() =>
                setActiveFilters({ ...activeFilters, brand: "All" })
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilters.brand === "All" && styles.activeFilterChipText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                style={[
                  styles.filterChip,
                  activeFilters.brand === brand.name && styles.activeFilterChip,
                ]}
                onPress={() =>
                  setActiveFilters({ ...activeFilters, brand: brand.name })
                }
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilters.brand === brand.name &&
                    styles.activeFilterChipText,
                  ]}
                >
                  {brand.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.filterOptions}>
            {PRICE_RANGES.map((range) => (
              <TouchableOpacity
                key={range.label}
                style={[
                  styles.filterChip,
                  activeFilters.priceRange === range.label &&
                  styles.activeFilterChip,
                ]}
                onPress={() =>
                  setActiveFilters({
                    ...activeFilters,
                    priceRange: range.label,
                  })
                }
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilters.priceRange === range.label &&
                    styles.activeFilterChipText,
                  ]}
                >
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Features</Text>
          <View style={styles.filterOptions}>
            {getUniqueFeatures().map((feature) => (
              <TouchableOpacity
                key={feature}
                style={[
                  styles.filterChip,
                  activeFilters.features.includes(feature) &&
                  styles.activeFilterChip,
                ]}
                onPress={() => {
                  const features = activeFilters.features.includes(feature)
                    ? activeFilters.features.filter((f) => f !== feature)
                    : [...activeFilters.features, feature];
                  setActiveFilters({ ...activeFilters, features });
                }}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilters.features.includes(feature) &&
                    styles.activeFilterChipText,
                  ]}
                >
                  {feature}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );

  const renderCarGrid = () => {
    const filteredCars = filterCars();

    if (filteredCars.length === 0) {
      return (
        <EmptyState
          searchQuery={searchQuery}
          hasFilters={hasActiveFilters()}
          onReset={resetFilters}
        />
      );
    }

    return (
      <View style={styles.carGrid}>
        {filteredCars.map((car, index) => (
          <Animated.View
            key={car.id}
            entering={FadeInDown.delay(index * 100)}
            style={styles.carCard}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/car-details",
                  params: { carId: car.id },
                })
              }
            >
              <Image source={{ uri: car.images[0] }} style={styles.carImage} />
              {car.status !== "AVAILABLE" && (
                <View
                  style={[
                    styles.statusTag,
                    car.status === "RENTED"
                      ? styles.rentedTag
                      : styles.maintenanceTag,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {STATUS_LABELS[car.status]}
                  </Text>
                </View>
              )}
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>
                  {car.name}
                </Text>
                <View style={styles.carDetails}>
                  <View style={styles.brandBadge}>
                    <Text style={styles.brandText}>{car.brand.name}</Text>
                  </View>
                  <View style={styles.capacityBadge}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={16}
                      color={COLORS.gray[600]}
                    />
                    <Text style={styles.capacityText}>
                      {car.passengerCapacity}
                    </Text>
                  </View>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>
                    ₦{car.pricePerDay.toLocaleString()}
                  </Text>
                  <Text style={styles.perDay}>/day</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearch()}
      {renderFilters()}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <CarLoader size={50} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderCarGrid()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  filterButton: {
    padding: SIZES.xs,
  },
  searchContainer: {
    padding: SIZES.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.md,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  filtersPanel: {
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  hidden: {
    display: "none",
  },
  filterSection: {
    marginRight: SIZES.xl,
    paddingHorizontal: SIZES.md,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.lg,
    marginRight: SIZES.xs,
    marginBottom: SIZES.xs,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
  },
  activeFilterChipText: {
    color: COLORS.white,
  },
  scrollContent: {
    padding: SIZES.md,
    paddingBottom: 100,
  },
  carGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  carCard: {
    width: CARD_WIDTH,
    marginBottom: SIZES.lg,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.lg,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  carImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  statusTag: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.lg,
  },
  rentedTag: {
    backgroundColor: COLORS.warning,
  },
  maintenanceTag: {
    backgroundColor: COLORS.danger,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  carInfo: {
    padding: SIZES.sm,
  },
  carName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  carDetails: {
    flexDirection: "row",
    marginBottom: SIZES.xs,
    gap: SIZES.xs,
  },
  brandBadge: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.md,
  },
  brandText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.gray[700],
  },
  capacityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.md,
    gap: 4,
  },
  capacityText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.gray[700],
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: SIZES.xs,
  },
  price: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  perDay: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xl * 2,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.gray[800],
    marginTop: SIZES.lg,
    marginBottom: SIZES.xs,
  },
  emptyStateDescription: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    textAlign: "center",
    marginBottom: SIZES.lg,
    paddingHorizontal: SIZES.xl,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.lg,
    gap: SIZES.xs,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
});
