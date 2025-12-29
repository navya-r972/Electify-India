/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  // Note: i18n config is moved to app directory with Next.js 13+
  // The i18n configuration below is deprecated in the app directory
  // We're using client-side i18next instead
  // Next.js 13+ uses app directory by default
  // No need for experimental.appDir anymore
};

module.exports = withPWA(nextConfig);