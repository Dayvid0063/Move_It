import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

type CategoryCardProps = {
  category: CategoryType;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
    <LinearGradient
      colors={[COLORS.white, COLORS.gray[100]]}
      style={styles.categoryCard}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={category.icon}
          size={32}
          color={COLORS.primary}
        />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryDescription}>{category.description}</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>from $49/day</Text>
        <MaterialCommunityIcons 
          name="arrow-right" 
          size={20} 
          color={COLORS.primary} 
        />
      </View>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  pressable: {
    width: CARD_WIDTH,
    marginRight: SIZES.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  categoryCard: {
    height: 180,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.lg,
    padding: SIZES.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.md,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  categoryName: {
    fontSize: SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  categoryDescription: {
    fontSize: SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginBottom: SIZES.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  statsText: {
    fontSize: SIZES.sm,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
});