import { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { registerUser } from '@/api/auth/auth';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { email, password, confirmPassword, firstName, lastName, phoneNumber } = formData;

    if (!email || !password || !confirmPassword || !firstName || !lastName || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    // Basic phone number validation
    const phoneRegex = /^\d{11}$/; // Assumes 11-digit phone number
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      Alert.alert("Error", "Please enter a valid 11-digit phone number.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        router.push('/login');
      } else {
        Alert.alert("Registration Failed", response.data.message || "Please try again.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <Input
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        autoCapitalize="words"
      />

      <Input
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        autoCapitalize="words"
      />

      <Input
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
        keyboardType="phone-pad"
      />

      <Input
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />

      <Input
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleRegister} isLoading={loading} />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/login" style={styles.loginLink}>
          Log in
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
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.lg,
    textAlign: 'center',
    marginTop: SIZES.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xl,
  },
  loginText: {
    color: COLORS.gray[600],
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
});
