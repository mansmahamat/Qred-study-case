/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@tanstack/.*|react-native-.*|expo-modules-core)/)',
  ],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};
