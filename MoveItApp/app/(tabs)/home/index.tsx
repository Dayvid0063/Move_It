import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { Header, PopularVehicles, TopBrands } from '@/components/home';
import { useFocusEffect } from '@react-navigation/native';
import { getBrands } from '@/api/brands/brands';
import { getCars } from '@/api/cars/cars';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarLoader from '@/components/CarLoader';

type User = {
  firstName: string;
};

const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    getUser();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    const res = await getBrands();
    setBrands(res.data);
    setLoading(false);
  }

  const fetchCars = async () => {
    setLoading(true);
    const res = await getCars();
    setCars(res.data.slice(0, 5));
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchBrands();
      fetchCars();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBrands();
    fetchCars();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleViewAllCars = useCallback(() => {
    router.push('/explore');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        location={location}
        userFirstName={user?.firstName || "Guest"}
        businessLogo={require('@/assets/images/Logo.png')}
        businessName='MoveIt'
      />
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CarLoader size={30} />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <TopBrands topBrands={brands} />
            <PopularVehicles cars={cars} onViewAll={handleViewAllCars} />
          </ScrollView>)
      }

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.xl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.md,
    gap: SIZES.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
  },
  viewAllButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  packagesContainer: {
    paddingHorizontal: SIZES.md,
    gap: SIZES.md,
  },
});
