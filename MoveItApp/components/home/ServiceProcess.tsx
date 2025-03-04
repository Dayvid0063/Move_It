import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const ServiceProcess: React.FC = () => (
    <View style={styles.processContainer}>
      <Text style={styles.sectionTitle}>How It Works</Text>
      <View style={styles.processSteps}>
        <ProcessStep icon="map-marker" title="Set Location" />
        <ProcessStep icon="car" title="Choose Vehicle" />
        <ProcessStep icon="clock" title="Confirm Booking" />
      </View>
    </View>
  );
  
  type ProcessStepProps = {
    icon: "map-marker" | "car" | "clock";
    title: string;
  };
  
  const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title }) => (
    <View style={styles.processStep}>
      <View style={styles.processIcon}>
        <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.processTitle}>{title}</Text>
    </View>
  );
  const styles = StyleSheet.create({
    processContainer: {
        marginVertical: SIZES.lg,
      },
      processSteps: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SIZES.md,
      },
      processStep: {
        alignItems: 'center',
      },
      processIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.xs,
      },
      processTitle: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.gray[700],
      },
      sectionTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.black,
        marginHorizontal: SIZES.md,
        marginBottom: SIZES.sm,
      },
});