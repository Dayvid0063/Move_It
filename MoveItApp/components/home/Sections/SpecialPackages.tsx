import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { PackageCard } from '../PackageCard';

type SpecialPackagesProps = {
  packages: PackageType[];
};

export const SpecialPackages: React.FC<SpecialPackagesProps> = ({ packages }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Special Packages</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      {packages.map(pkg => (
        <View key={pkg.id} style={styles.cardSpacing}>
          <PackageCard package={pkg} />
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.sm,
  },
  scrollContainer: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.sm,
  },
  cardSpacing: {
    marginRight: SIZES.md,
  },
});
