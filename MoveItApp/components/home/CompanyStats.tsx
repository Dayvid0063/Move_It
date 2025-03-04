import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const CompanyStats: React.FC = () => (
    <View style={styles.statsContainer}>
      <StatItem value="5000+" label="Completed Trips" />
      <StatItem value="98%" label="Satisfaction Rate" />
      <StatItem value="4.9/5" label="Client Rating" />
    </View>
  );
  
  type StatItemProps = {
    value: string;
    label: string;
  };
  
  const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
  const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.md,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.lg,
        marginHorizontal: SIZES.md,
        marginTop: SIZES.md,
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
      statItem: {
        alignItems: 'center',
      },
      statValue: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
      },
      statLabel: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.gray[600],
        marginTop: 4,
      },
});
