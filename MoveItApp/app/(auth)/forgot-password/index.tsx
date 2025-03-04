import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        Please enter your email address. You will receive a code to create a new password via email.
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Button title="Send Code" onPress={() => { }} />
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
    marginTop: SIZES.lg
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray[600],
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
});
