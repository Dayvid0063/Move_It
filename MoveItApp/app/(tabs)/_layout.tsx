import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[600],
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={20}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="home"
                  size={24}
                  color={focused ? COLORS.white : color}
                />
              </View>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="car-sports"
                  size={24}
                  color={focused ? COLORS.white : color}
                />
              </View>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="my-bookings"
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={24}
                  color={focused ? COLORS.white : color}
                />
              </View>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={focused ? COLORS.white : color}
                />
              </View>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    height: 70,
    backgroundColor: 'rgba(28,28,30,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 0,
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabLabel: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    marginTop: 4,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 4,
  },
  activeIcon: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
