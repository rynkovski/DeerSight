import { UseSafeAreaConfig } from '@/types/safe-area';
import { useMemo } from 'react';
import { Platform, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeArea = (config: UseSafeAreaConfig = {}) => {
  const insets = useSafeAreaInsets();
  const {
    includeTop = true,
    includeBottom = true,
    topBackgroundColor = 'white',
    bottomBackgroundColor = 'white',
    additionalTopPadding = 0,
    additionalBottomPadding = 0,
  } = config;

  return useMemo(() => {
    // Calculate the total top padding
    let topPadding = 0;
    if (includeTop) {
      topPadding = insets.top + additionalTopPadding;
      if (Platform.OS === 'android') {
        const statusBarHeight = StatusBar.currentHeight ?? 0;
        topPadding += statusBarHeight;
      }
    }

    const containerStyle: ViewStyle = {
      flex: 1,
      backgroundColor: topBackgroundColor,
    };

    const contentStyle: ViewStyle = {
      flex: 1,
      paddingTop: topPadding,
      paddingBottom: includeBottom ? insets.bottom + additionalBottomPadding : 0,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };

    return {
      containerStyle,
      contentStyle,
      insets,
    };
  }, [
    insets,
    includeTop,
    includeBottom,
    topBackgroundColor,
    bottomBackgroundColor,
    additionalTopPadding,
    additionalBottomPadding,
  ]);
};