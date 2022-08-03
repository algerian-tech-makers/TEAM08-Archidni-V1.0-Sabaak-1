const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home/",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth?tab=login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
