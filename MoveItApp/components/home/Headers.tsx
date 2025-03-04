import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

type HeaderProps = {
  location: string;
  userFirstName: string;
  businessLogo: any;
  businessName: string;
};

export const Header: React.FC<HeaderProps> = ({ location, userFirstName, businessLogo, businessName }) => (
  <View style={styles.header}>
    {/* Left side: Business Logo, Name, and Location */}
    <View style={styles.leftContainer}>
      <Image source={businessLogo} style={styles.logo} />
      <View>
        <Text style={styles.businessName}>{businessName}</Text>
        <Text style={styles.businessLocation}>{location}</Text>
      </View>
    </View>

    {/* Right side: Welcome Message */}
    <Text style={styles.welcomeMessage}>Welcome, {userFirstName}!</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: SIZES.sm,
  },
  businessName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  businessLocation: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.gray[600],
  },
  welcomeMessage: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
});
