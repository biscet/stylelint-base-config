module.exports = {
  preset: 'jest-preset-stylelint',
  runner: "jest-light-runner",
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
};
