import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

export default function Verification() {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.description}>
        Enter the 4-digit code we sent to your email
      </Text>

      <Input
        placeholder="Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />

      <Button title="Verify" onPress={() => { }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.lg,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
});
