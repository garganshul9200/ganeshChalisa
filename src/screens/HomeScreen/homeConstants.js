import {
  BookIcon,
  DiyaIcon,
  HeadphonesIcon,
  LotusIcon,
  OmIcon,
  WallpaperIcon,
} from '../../components/icons';

export const HEADER_TITLE = '|| श्री गणेशाय नमः ||';

export const HOME_ACTIONS = [
  {
    key: 'read',
    labelKey: 'readChalisa',
    Icon: BookIcon,
  },
  {
    key: 'listen',
    labelKey: 'listenNow',
    Icon: HeadphonesIcon,
  },
];

export const EXPLORE_ITEMS = [
  {
    key: 'aarti',
    titleKey: 'ganeshAarti',
    subtitleKey: 'ganeshAartiSubtitle',
    Icon: DiyaIcon,
  },
  {
    key: 'mantra',
    titleKey: 'ganeshMantra',
    subtitleKey: 'ganeshMantraSubtitle',
    Icon: OmIcon,
  },
  {
    key: 'names',
    titleKey: 'names108',
    subtitleKey: 'names108Subtitle',
    Icon: LotusIcon,
  },
  {
    key: 'wallpapers',
    titleKey: 'wallpapers',
    subtitleKey: 'wallpapersSubtitle',
    Icon: WallpaperIcon,
  },
];

export const SHLOKA =
  'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥';
