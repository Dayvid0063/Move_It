import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '@/constants/theme';

export const SocialButton = ({ icon, onPress }: { icon: any; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image source={icon} style={styles.socialIcon} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: SIZES.xs,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});
