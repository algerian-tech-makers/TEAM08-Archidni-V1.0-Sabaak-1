const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const { pwa } = require("./pwa");



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  pwa,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home/",
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
