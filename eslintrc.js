module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:astro/recommended', 'standard-with-typescript','plugin:tailwindcss/recommended', 'prettier'],
  plugins: ['tailwindcss'],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.astro']
  },
  overrides: [
    {
      files: ['./src/env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    }
  ]
}