/* eslint-disable */
export default {
  displayName: 'gmail-extension-content',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/apps/gmail-extension-content',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
