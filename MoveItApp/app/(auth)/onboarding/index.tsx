import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MotiView, AnimatePresence } from 'moti';
import { Easing } from 'react-native-reanimated';

const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'The Ideal Rental For Your Car Trip',
    description: 'Reliable car rental for your journey, discretion assured. Ride in confidence, your privacy respected at every mile.',
    image: require('@/assets/images/car.png'),
  },
  {
    id: '2',
    title: 'Professional Chauffeur Service',
    description: 'Experience luxury travel with our skilled drivers. Safety, comfort, and sophistication in every ride.',
    image: require('@/assets/images/driver.jpg'),
  },
  {
    id: '3',
    title: 'Premium Fleet Selection',
    description: 'Choose from our curated collection of luxury vehicles. Every car maintains the highest standards of excellence.',
    image: require('@/assets/images/carss.png'),
  },
];

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const slidesRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      setIsExiting(true);
      setTimeout(() => {
        router.push('/(auth)/login');
      }, 500);
    }
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/(auth)/login');
    }, 500);
  };

  const RenderSlide = ({ item, index }: { item: typeof ONBOARDING_SLIDES[0], index: number }) => {
    const isActive = index === currentIndex;

    return (
      <View style={[styles.slide, { width, height }]}>
        <MotiView
          style={[styles.imageContainer]}
          animate={{
            scale: isActive ? 1 : 0.9,
          }}
          transition={{
            type: 'timing',
            duration: 500,
            easing: Easing.bezier(0.33, 1, 0.68, 1),
          }}
        >
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </MotiView>

        <View style={styles.overlay} />

        <BlurView intensity={50} style={styles.contentWrapper}>
          <MotiView
            style={styles.contentContainer}
            animate={{
              opacity: isActive ? 1 : 0,
              translateY: isActive ? 0 : 20,
            }}
            transition={{
              type: 'timing',
              duration: 400,
              delay: isActive ? 100 : 0,
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </MotiView>
        </BlurView>
      </View>
    );
  };

  return (
    <MotiView
      style={styles.container}
      animate={{
        opacity: isExiting ? 0 : 1,
      }}
      transition={{
        type: 'timing',
        duration: 400,
      }}
    >
      <StatusBar style="light" />
      <FlatList
        ref={slidesRef}
        data={ONBOARDING_SLIDES}
        renderItem={({ item, index }) => <RenderSlide item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={[styles.navigationContainer, { bottom: insets.bottom + 20 }]}>
        <AnimatePresence>
          {currentIndex !== ONBOARDING_SLIDES.length - 1 && (
            <MotiView
              from={{
                opacity: 0,
                translateX: -20,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              exit={{
                opacity: 0,
                translateX: -20,
              }}
            >
              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </AnimatePresence>

        <View style={styles.paginationContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <MotiView
              key={index}
              style={[styles.dot]}
              animate={{
                width: currentIndex === index ? 20 : 8,
                opacity: currentIndex === index ? 1 : 0.3,
              }}
              transition={{
                type: 'timing',
                duration: 300,
              }}
            />
          ))}
        </View>

        <MotiView
          animate={{
            scale: currentIndex === ONBOARDING_SLIDES.length - 1 ? 1.1 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
          }}
        >
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === ONBOARDING_SLIDES.length - 1 ? 'Start' : 'Next'}
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  slide: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    overflow: 'hidden',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  skipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
