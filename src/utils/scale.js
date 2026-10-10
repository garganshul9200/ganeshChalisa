/**
 * Lightweight responsive scaling - replaces react-native-size-matters (~50KB saved).
 * Uses Dimensions for consistent scaling across devices.
 */
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 375;

const scaleFactor = width / BASE_WIDTH;

export const scale = (size) => Math.round(size * scaleFactor);
export const moderateScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);
export const moderateVerticalScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);
