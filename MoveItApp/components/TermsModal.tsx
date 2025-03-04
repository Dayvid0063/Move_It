import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

interface TermsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const TermsModal = ({ isVisible, onClose }: TermsModalProps) => {
  const sections = [
    {
      title: 'Chauffeur Service',
      icon: <FontAwesome5 name="user-tie" size={24} color={COLORS.primary} />,
      content: [
        'A professional chauffeur will be assigned to you',
        'Pick up and drop off at specified locations',
        'Professionally trained and licensed chauffeurs',
        'Complete driving responsibility handling'
      ]
    },
    {
      title: 'Fuel Policy',
      icon: <MaterialCommunityIcons name="gas-station" size={28} color={COLORS.primary} />,
      content: [
        'Full tank at service start',
        'Must return with full tank',
        'Fuel costs are client responsibility',
        'Chauffeur assists with refueling',
        'Refueling charge applies if not returned full'
      ]
    },
    {
      title: 'Booking Duration',
      icon: <MaterialCommunityIcons name="clock-outline" size={28} color={COLORS.primary} />,
      content: [
        'Booking starts at scheduled pickup',
        'Be ready at pickup location',
        'No extension for late starts',
        'Extensions subject to availability'
      ]
    },
    {
      title: 'Service Coverage',
      icon: <MaterialCommunityIcons name="map-marker-radius" size={28} color={COLORS.primary} />,
      content: [
        'Includes chauffeur compensation',
        'Excludes fuel, tolls, and parking',
        'Additional charges will be communicated',
        'Limited to [Region/City] boundaries'
      ]
    },
    {
      title: 'Client Responsibilities',
      icon: <MaterialCommunityIcons name="account-check" size={28} color={COLORS.primary} />,
      content: [
        'Maintain appropriate behavior',
        'No smoking in vehicle',
        'Responsible for interior damage',
        'Respect vehicle capacity',
        'Ensure sufficient fuel funds'
      ]
    },
    {
      title: 'Safety & Security',
      icon: <MaterialCommunityIcons name="shield-check" size={28} color={COLORS.primary} />,
      content: [
        'Mandatory seatbelt use',
        'Service refusal rights',
        'Not responsible for left items',
        'GPS tracking equipped'
      ]
    },
    {
      title: 'Cancellation Policy',
      icon: <MaterialCommunityIcons name="calendar-remove" size={28} color={COLORS.primary} />,
      content: [
        'Free cancellation 24h before',
        '50% charge within 24h',
        'Full charge for no-shows',
        'Weather cancellations case-by-case'
      ]
    },
    {
      title: 'Customer Support',
      icon: <MaterialCommunityIcons name="headphones" size={28} color={COLORS.primary} />,
      content: [
        '24/7 emergency support',
        'Replacement vehicle provided',
        'Report complaints within 24h',
        'All vehicles insured'
      ]
    }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Service Terms</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.termsContent} showsVerticalScrollIndicator={false}>
            {sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <View style={styles.sectionHeader}>
                  {section.icon}
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <View style={styles.sectionContent}>
                  {section.content.map((item, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.termsText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.lg,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
    paddingVertical: SIZES.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
    paddingBottom: SIZES.md,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  closeButton: {
    padding: SIZES.xs,
  },
  termsContent: {
    paddingHorizontal: SIZES.lg,
  },
  section: {
    marginBottom: SIZES.xl,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.md,
    padding: SIZES.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginLeft: SIZES.sm,
  },
  sectionContent: {
    marginLeft: SIZES.xs,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.sm,
  },
  termsText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    flex: 1,
  },
});

export default TermsModal;
