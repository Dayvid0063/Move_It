import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { CategoryCard } from '../CategoryCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type VehicleCategoriesProps = {
  categories: CategoryType[];
};

export const VehicleCategories: React.FC<VehicleCategoriesProps> = ({ categories }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="car-multiple"
          size={24}
          color={COLORS.primary}
          style={styles.titleIcon}
        />
        <Text style={styles.sectionTitle}>Vehicle Categories</Text>
      </View>
      <Text style={styles.viewAll}>View All</Text>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
      decelerationRate="fast"
      snapToInterval={width * 0.4 + SIZES.md}
      snapToAlignment="start"
    >
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginVertical: SIZES.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: SIZES.xs,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  viewAll: {
    fontSize: SIZES.md,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.md,
  },
});
