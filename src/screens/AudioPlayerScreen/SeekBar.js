import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {PanResponder, StyleSheet, View} from 'react-native';
import {moderateVerticalScale} from '../../utils/scale';

function SeekBar({position, duration, onSeek, colors}) {
  const [barWidth, setBarWidth] = useState(1);
  const [dragPosition, setDragPosition] = useState(null);
  const styles = useMemo(() => createStyles(), []);

  const latestRef = useRef({onSeek, duration, barWidth});
  latestRef.current = {onSeek, duration, barWidth};

  const seekAt = useRef(x => {
    const {onSeek: seek, duration: trackDuration, barWidth: width} =
      latestRef.current;
    if (trackDuration <= 0 || width <= 0) {
      return;
    }
    const seconds = Math.min(Math.max(x / width, 0), 1) * trackDuration;
    setDragPosition(seconds);
    seek(seconds);
  }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => seekAt(e.nativeEvent.locationX),
      onPanResponderMove: e => seekAt(e.nativeEvent.locationX),
      onPanResponderRelease: () => setDragPosition(null),
      onPanResponderTerminate: () => setDragPosition(null),
    }),
  ).current;

  const onLayout = useCallback(e => {
    setBarWidth(e.nativeEvent.layout.width);
  }, []);

  const progress =
    duration > 0 ? Math.min((dragPosition ?? position) / duration, 1) : 0;

  return (
    <View
      style={styles.sliderWrap}
      onLayout={onLayout}
      {...panResponder.panHandlers}>
      <View style={[styles.seekTrack, {backgroundColor: colors.border}]}>
        <View
          style={[
            styles.seekFill,
            {width: `${progress * 100}%`, backgroundColor: colors.primary},
          ]}
        />
        <View
          style={[
            styles.seekThumb,
            {
              left: `${progress * 100}%`,
              backgroundColor: colors.primary,
              borderColor: colors.background,
            },
          ]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

export default memo(SeekBar);

const createStyles = () =>
  StyleSheet.create({
    sliderWrap: {
      width: '100%',
      marginBottom: moderateVerticalScale(8),
      paddingVertical: moderateVerticalScale(12),
      justifyContent: 'center',
    },
    seekTrack: {
      height: 6,
      borderRadius: 3,
      width: '100%',
      overflow: 'visible',
    },
    seekFill: {
      height: '100%',
      borderRadius: 3,
    },
    seekThumb: {
      position: 'absolute',
      top: -5,
      width: 16,
      height: 16,
      borderRadius: 8,
      marginLeft: -8,
      borderWidth: 2,
    },
  });
