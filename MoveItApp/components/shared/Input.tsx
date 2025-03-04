import { TextInput, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { InputProps } from '@/app/(auth)/types';

export const Input = ({ placeholder, value, onChangeText, secureTextEntry, autoCapitalize, keyboardType }: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      placeholderTextColor={COLORS.gray[500]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: SIZES.xs,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
});
