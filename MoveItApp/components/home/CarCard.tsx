import React from 'react';
import { View, Text, StyleSheet, Platform, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type CarType = {
  id: string;
  name: string;
  brand: {
    name: string;
  };
  description: string;
  images: string[];
  status: string;
  passengerCapacity: number;
  pricePerDay: number;
};

type CarCardProps = {
  car: CarType;
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/car-details',
      params: { carId: car.id },
    });
  };
  
  return (
    <TouchableOpacity style={styles.carCard} onPress={handlePress}>
      <View style={styles.container}>
        {/* Left side: Car Image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: car.images[0]}} style={styles.carImage} />
          {/* Availability Badge */}
          {car.status === "AVAILABLE" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Available</Text>
            </View>
          )}
        </View>

        {/* Right side: Car Info */}
        <View style={styles.contentContainer}>
          <View style={styles.carInfo}>
            <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
            <Text style={styles.brandName}>{car.brand.name}</Text>
            <Text style={styles.description} numberOfLines={2}>{car.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.carFeatures}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="account-group" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>{car.passengerCapacity} seats</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="currency-ngn" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>{car.pricePerDay}/day</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carCard: {
    width: width - SIZES.xl * 1.5,
    marginBottom: SIZES.sm,
    borderRadius: SIZES.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  container: {
    flexDirection: 'row',
    height: 160,
  },
  imageContainer: {
    width: '40%',
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.lg,
    borderBottomLeftRadius: SIZES.lg,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.md,
    justifyContent: 'space-between',
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  brandName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
    marginBottom: SIZES.xs,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray[500],
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.sm,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  carFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  featureText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
  },
});
