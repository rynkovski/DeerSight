import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  StyleProp,
  GestureResponderEvent,
  Animated,
  Easing
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FABProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  position?: 'bottomRight' | 'bottomLeft';
  size?: number;
  children?: React.ReactNode;
  backgroundColor?: string;
}

const FAB: React.FC<FABProps> = ({ 
  onPress, 
  style, 
  position = 'bottomRight',
  size = 56,
  backgroundColor = '#000',
  children 
}) => {
  const insets = useSafeAreaInsets();
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const getPositionStyle = (): ViewStyle => {
    const basePosition: ViewStyle = {
      position: 'absolute',
      bottom:   insets.bottom,
    };

    return {
      ...basePosition,
      ...(position === 'bottomRight' ? { right: 16 + insets.right } : { left: 16 + insets.left }),
    };
  };

  return (
    <Animated.View
      style={[
        styles.container,
        getPositionStyle(),
        { 
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          transform: [{ scale: scaleValue }]
        },
        style
      ]}
    >
      <TouchableOpacity
        style={[styles.button, { width: size, height: size }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;