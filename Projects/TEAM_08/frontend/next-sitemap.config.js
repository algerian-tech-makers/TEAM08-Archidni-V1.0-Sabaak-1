/** @type {import('next-sitemap').IConfig} */


const config = {
  siteUrl: process.env.SITE_URL || "http://localhost:4000",
  generateRobotsTxt: true,
  exclude: ["/dashboard/*", "/admin"],
};

module.exports = config;
