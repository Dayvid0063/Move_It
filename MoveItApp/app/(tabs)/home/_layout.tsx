import React from 'react';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Add more screens for the home tab here if needed */}
    </Stack>
  );
};

export default HomeLayout;
