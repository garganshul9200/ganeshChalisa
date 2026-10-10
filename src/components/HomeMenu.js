import React, {memo, useMemo} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {moderateScale, scale} from '../utils/scale';
import {
  GlobeIcon,
  MoonIcon,
  SettingsIcon,
  ShareIcon,
  StarIcon,
} from './icons';

const MENU_ITEMS = [
  {key: 'settings', label: 'Settings', Icon: SettingsIcon},
  {key: 'language', label: 'Change Language', Icon: GlobeIcon},
  {key: 'theme', label: 'Change Theme', Icon: MoonIcon},
  {key: 'share', label: 'Share App', Icon: ShareIcon},
  {key: 'rate', label: 'Rate App', Icon: StarIcon},
];

const HomeMenu = memo(({visible, onClose, onSelect, anchorTop}) => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.card, {top: anchorTop}]}>
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.key}
              style={[
                styles.row,
                index < MENU_ITEMS.length - 1 && styles.rowBorder,
              ]}
              onPress={() => onSelect(item.key)}>
              <item.Icon size={moderateScale(18)} color={colors.text} />
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
});

HomeMenu.displayName = 'HomeMenu';

const createStyles = colors =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    card: {
      position: 'absolute',
      right: scale(16),
      width: scale(190),
      backgroundColor: colors.menuCard,
      borderRadius: moderateScale(16),
      paddingVertical: moderateScale(6),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.12,
      shadowRadius: 14,
      elevation: 8,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(12),
      paddingHorizontal: scale(16),
      paddingVertical: moderateScale(12),
    },
    rowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    label: {
      color: colors.text,
      fontSize: moderateScale(14),
      fontWeight: '500',
    },
  });

export default HomeMenu;
