/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.app')

const pathsFromTsConfig = pathsToModuleNameMapper(compilerOptions.paths , { prefix: `<rootDir>/` })
const testUtilsConfig = {"@test-helpers/(.*)" : "<rootDir>/test-utils/helpers/$1"}
const mappers = {...pathsFromTsConfig, ...testUtilsConfig}
//throw new Error(JSON.stringify(mappers))

export default {
  displayName: 'gmail-extension',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  moduleNameMapper: mappers,
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/gmail-extension',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
