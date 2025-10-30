export default {
    name: 'Party Games',
    slug: 'party-games',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#1f2937'
    },
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.partygames.app'
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#1f2937'
        },
        package: 'com.partygames.app'
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        eas: {
            projectId: 'your-project-id'
        }
    }
};
