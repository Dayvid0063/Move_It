import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

export default function AuthIndex() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userData = await AsyncStorage.getItem("user");
      console.log(userData);
      setIsAuthenticated(!!userData);
      setIsLoading(false);
      SplashScreen.hideAsync();
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/onboarding" />;
  }
}
