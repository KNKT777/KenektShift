import express from 'express';
// eslint.config.js
export default [
    {
      ignores: ['node_modules/**/*', 'dist/**/*'],
    },
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
      },
    },
  ];
  