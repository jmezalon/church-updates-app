import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on the home screen
  const isOnHome = pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/';

  const handleHomeBackPress = (e: any) => {
    if (isOnHome) {
      // On home screen, do nothing (normal home tab behavior)
      return;
    }
    
    // Not on home, prevent default and go back
    e.preventDefault();
    
    // Navigate based on current screen
    if (pathname.includes('/church/')) {
      router.push('/(tabs)/event_details' as any);
    } else if (pathname.includes('/event_details')) {
      router.push('/(tabs)' as any);
    } else {
      router.push('/(tabs)' as any);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFB800',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: isOnHome ? 'Home' : 'Back',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={isOnHome 
                ? (focused ? 'home' : 'home-outline') 
                : 'arrow-back'
              } 
              color={color} 
            />
          ),
        }}
        listeners={{
          tabPress: handleHomeBackPress,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="event_details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="church"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="church/[id]"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
