import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface CarLoaderProps {
  size?: number;
  color?: string;
}

const CarLoader: React.FC<CarLoaderProps> = ({
  size = 40,
  color = COLORS.primary,
}) => {
  const carAnimation = useRef(new Animated.Value(0)).current;
  const bounceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Horizontal car movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(carAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(carAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Vertical bounce effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = carAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-size * 1.5, size * 1.5],
  });

  const translateY = bounceAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -size * 0.1, 0],
  });

  return (
    <View style={[styles.container, { width: size * 3, height: size }]}>
      <View style={[styles.road, { width: size * 3, height: 2 }]} />
      <Animated.View
        style={[
          styles.carContainer,
          {
            transform: [{ translateX }, { translateY }],
          },
        ]}>
        <MaterialCommunityIcons
          name="car-sports"
          size={size}
          color={color}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carContainer: {
    position: 'absolute',
  },
  road: {
    backgroundColor: COLORS.gray[300],
    position: 'absolute',
    bottom: 0,
  },
});

export default CarLoader;
