module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      {functions: true, classes: true, variables: false},
    ], // disable the rule for variables, but enable it for functions and classes
    '@typescript-eslint/no-shadow': 'off',
    'no-fallthrough': 'off',
  },
};
