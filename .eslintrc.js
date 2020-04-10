/*
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-04-10 16:53:22
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\.eslintrc.js
 * @Juck is coding...
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single']
  }
}