import React from 'react';
import { View, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

const { width } = Dimensions.get('window');

type PackageCardProps = {
  package: PackageType;
};

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => (
  <View style={styles.packageCard}>
    {/* Package Image */}
    <Image source={pkg.image} style={styles.packageImage} />

    {/* Package Info */}
    <View style={styles.packageInfo}>
      <Text style={styles.packageTitle}>{pkg.title}</Text>
      <Text style={styles.packageDescription}>{pkg.description}</Text>

      {/* Features List */}
      <PackageFeatures features={pkg.features} />

      {/* Pricing Info */}
      <PackagePricing price={pkg.price} priceDetail={pkg.priceDetail} />
    </View>
  </View>
);

const PackageFeatures: React.FC<{ features: string[] }> = ({ features }) => (
  <View style={styles.featuresContainer}>
    {features.map((feature, index) => (
      <View key={index} style={styles.featureItem}>
        <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.primary} />
        <Text style={styles.featureText}>{feature}</Text>
      </View>
    ))}
  </View>
);

const PackagePricing: React.FC<{ price: string; priceDetail: string }> = ({ price, priceDetail }) => (
  <View style={styles.pricingContainer}>
    <Text style={styles.price}>{price}</Text>
    <Text style={styles.priceDetail}>{priceDetail}</Text>
  </View>
);

const styles = StyleSheet.create({
  packageCard: {
    width: width * 0.8,
    borderRadius: SIZES.md,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginBottom: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  packageImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  packageInfo: {
    padding: SIZES.md,
  },
  packageTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  packageDescription: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[700],
    marginBottom: SIZES.md,
  },
  featuresContainer: {
    marginBottom: SIZES.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  featureText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginLeft: SIZES.xs,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: SIZES.md,
  },
  price: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  priceDetail: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.gray[500],
  },
});
