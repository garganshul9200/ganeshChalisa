import React, {memo} from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

const defaults = {width: 22, height: 22, strokeWidth: 1.6};

const Icon = memo(function Icon({children, size = 22, color = '#3C2415', strokeWidth = 1.6}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {children}
    </Svg>
  );
});

export const MenuDotsIcon = memo(({size = 20, color = '#3C2415'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx="12" cy="5" r="1.7" />
    <Circle cx="12" cy="12" r="1.7" />
    <Circle cx="12" cy="19" r="1.7" />
  </Svg>
));

export const SettingsIcon = memo(props => (
  <Icon {...defaults} {...props}>
    <Circle cx="12" cy="12" r="3" />
    <Path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
));

export const GlobeIcon = memo(props => (
  <Icon {...defaults} {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Icon>
));

export const MoonIcon = memo(props => (
  <Icon {...defaults} {...props}>
    <Path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" />
  </Icon>
));

export const ShareIcon = memo(props => (
  <Icon {...defaults} {...props}>
    <Circle cx="18" cy="5" r="2.5" />
    <Circle cx="6" cy="12" r="2.5" />
    <Circle cx="18" cy="19" r="2.5" />
    <Path d="M8.3 13.2l7.4 4.3M15.7 6.5l-7.4 4.3" />
  </Icon>
));

export const StarIcon = memo(props => (
  <Icon {...defaults} {...props}>
    <Path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.5 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />
  </Icon>
));

export const BookIcon = memo(({size = 28, color = '#FFFFFF'}) => (
  <Icon size={size} color={color} strokeWidth={1.8}>
    <Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5z" />
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
  </Icon>
));

export const HeadphonesIcon = memo(({size = 28, color = '#E07030'}) => (
  <Icon size={size} color={color} strokeWidth={1.8}>
    <Path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2zM17 11h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-7z" />
    <Path d="M4 13a8 8 0 0 1 16 0" />
  </Icon>
));

export const DiyaIcon = memo(({size = 26, color = '#E07030'}) => (
  <Icon size={size} color={color} strokeWidth={1.7}>
    <Path d="M12 3c1.2 2 1.2 3.5 0 5-1.2-1.5-1.2-3 0-5z" />
    <Path d="M5 14c0-3.5 3-6 7-6s7 2.5 7 6c0 1.5-3 2.5-7 2.5S5 15.5 5 14z" />
    <Path d="M6 18.5h12" />
  </Icon>
));

export const OmIcon = memo(({size = 26, color = '#E07030'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8.5 15.5c1.8 1.6 4.2 1.6 5.2-.2.7-1.2.2-2.6-1.1-3.1-1.5-.6-2.7.4-3.6 1.5-.7.9-1.6 1.4-2.7 1.2-1.4-.3-2.2-1.7-1.8-3 .5-1.7 2.4-2.4 4-1.5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.5 8.2c1.3-1.4 3.4-1.3 4.2.3.6 1.2.1 2.5-1 3.1"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Circle cx="17.2" cy="6.2" r="1.1" fill={color} />
    <Path
      d="M10.2 7.8c.3-1.6 1.5-2.6 3-2.6"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </Svg>
));

export const LotusIcon = memo(({size = 26, color = '#E07030'}) => (
  <Icon size={size} color={color} strokeWidth={1.6}>
    <Path d="M12 20c-2.5-2-4-4.5-4-7a4 4 0 0 1 8 0c0 2.5-1.5 5-4 7z" />
    <Path d="M8 13c-2.5-.5-4-2-4.5-4 2 .2 3.5 1.2 4.5 3zM16 13c2.5-.5 4-2 4.5-4-2 .2-3.5 1.2-4.5 3z" />
    <Path d="M12 9c-1-2.5-1-4.5 0-6 1 1.5 1 3.5 0 6z" />
  </Icon>
));

export const WallpaperIcon = memo(({size = 26, color = '#E07030'}) => (
  <Icon size={size} color={color} strokeWidth={1.7}>
    <Rect x="3" y="5" width="18" height="14" rx="2.5" />
    <Path d="M3 15l4.5-4.5a2 2 0 0 1 2.8 0L15 15" />
    <Path d="M13 13l1.5-1.5a2 2 0 0 1 2.8 0L21 15" />
    <Circle cx="9" cy="9" r="1.2" fill={color} stroke="none" />
  </Icon>
));

export const QuoteIcon = memo(({size = 22, color = '#E07030'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M10.5 8H6.2C5 8 4 9 4 10.2V14h5.2V10.8H7.4V9.6h3.1V8zM20 8h-4.3c-1.2 0-2.2 1-2.2 2.2V14H19V10.8h-1.8V9.6H20V8z" />
  </Svg>
));
