
export interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface UseSafeAreaConfig {
  includeTop?: boolean;
  includeBottom?: boolean;
  topBackgroundColor?: string;
  bottomBackgroundColor?: string;
  additionalTopPadding?: number;
  additionalBottomPadding?: number;
}