import { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { loginUser } from '@/api/auth/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      // Attempt to login with email and password
      const response = await loginUser({ email, password });

      const data = response.data.user;
      await AsyncStorage.setItem("user", JSON.stringify(data));

      router.push('/home')
      // Redirect to the home or dashboard screen
    } catch (error: any) {
      Alert.alert('Login failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Link href="/forgot-password" style={styles.forgotPassword}>
        Forgot Password?
      </Link>

      <Button title="Log In" onPress={handleLogin} isLoading={loading} />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>First time here? </Text>
        <Link href="/register" style={styles.signupLink}>
          Sign up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.lg,
    textAlign: 'center',
  },
  forgotPassword: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.medium,
    alignSelf: 'flex-end',
    marginBottom: SIZES.lg,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xl,
  },
  signupText: {
    color: COLORS.gray[600],
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
});
