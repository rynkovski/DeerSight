import { useSafeArea } from '@/hooks/useSafeArea';
import { UseSafeAreaConfig } from '@/types/safe-area';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  config?: UseSafeAreaConfig;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  config,
}) => {
  const { containerStyle, contentStyle } = useSafeArea(config);

  return (
    <SafeAreaProvider>
      <View style={containerStyle}>
        <View style={contentStyle}>{children}</View>
      </View>
    </SafeAreaProvider>
  );
};
