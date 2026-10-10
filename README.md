# Ganesh Chalisa

Empty React Native CLI starter, aligned with [AllChalisaApp](../ChalisaApp/AllChalisaApp) (RN `0.86.0` / React `19.2.3`).

## Stack

- React Native CLI (no Expo)
- Hermes enabled
- TypeScript entry (`App.tsx`)
- Empty `src/` for future screens, context, and components

## Prerequisites

- Node.js `>= 22.11.0`
- Android Studio / JDK for Android
- Xcode + CocoaPods for iOS

## Install

```bash
cd ~/Desktop/ganeshChalisa
npm install
```

### Android

```bash
npm start
# other terminal
npm run android
```

### iOS

```bash
cd ios && bundle install && bundle exec pod install && cd ..
npm start
# other terminal
npm run ios
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Metro bundler |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run build_android` | Release APK via Gradle |
| `npm run clean` | Clean Android build |
