import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { CarCard } from '../CarCard';

type PopularVehiclesProps = {
  cars: CarType[];
  onViewAll: () => void;
};

export const PopularVehicles: React.FC<PopularVehiclesProps> = ({ cars, onViewAll }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Our Collections</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAllButton}>View All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.carsContainer}
    >
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
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
    marginBottom: SIZES.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  viewAllButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  carsContainer: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.sm,
  },
});
