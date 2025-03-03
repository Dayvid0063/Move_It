import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { ButtonProps } from '@/app/(auth)/types';

export const Button = ({ onPress, title, variant = 'primary', isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' ? styles.outlineButton : styles.primaryButton,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variant === 'outline' ? styles.outlineButtonText : styles.primaryButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      height: 48,
      borderRadius: SIZES.xs,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: SIZES.sm,
    },
    primaryButton: {
      backgroundColor: COLORS.primary,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: FONTS.medium,
    },
    primaryButtonText: {
      color: COLORS.white,
    },
    outlineButtonText: {
      color: COLORS.primary,
    },
  });