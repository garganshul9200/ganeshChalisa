import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ActionCard from '../../components/ActionCard';
import HomeMenu from '../../components/HomeMenu';
import ScreenWrapper from '../../components/ScreenWrapper';
import {moderateVerticalScale, scale} from '../../utils/scale';
import ExploreSection from './ExploreSection';
import HomeHeader from './HomeHeader';
import HomeHero from './HomeHero';
import QuoteCard from './QuoteCard';
import {HOME_ACTIONS} from './homeConstants';
import {useHomeScreen} from './useHomeScreen';

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: moderateVerticalScale(28),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: moderateVerticalScale(12),
  },
});

const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {
    menuOpen,
    openMenu,
    closeMenu,
    onReadPress,
    onListenPress,
    onExplorePress,
    onMenuSelect,
    t,
  } = useHomeScreen(navigation);

  const actionHandlers = {
    read: onReadPress,
    listen: onListenPress,
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <HomeHeader onMenuPress={openMenu} />
        <HomeHero />
        <View style={styles.actionsRow}>
          {HOME_ACTIONS.map(action => (
            <ActionCard
              key={action.key}
              label={t[action.labelKey]}
              Icon={action.Icon}
              onPress={actionHandlers[action.key]}
            />
          ))}
        </View>
        <ExploreSection onItemPress={onExplorePress} />
        <QuoteCard />
      </ScrollView>
      <HomeMenu
        visible={menuOpen}
        onClose={closeMenu}
        onSelect={onMenuSelect}
        anchorTop={insets.top + moderateVerticalScale(44)}
      />
    </ScreenWrapper>
  );
};

export default memo(HomeScreen);
