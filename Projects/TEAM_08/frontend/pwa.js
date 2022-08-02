module.exports = {
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    skipWaiting: true,
    reloadOnOnline: false,
    buildExcludes: [/chunks\/images\/.*$/],
    exclude: [
      /\.map$/, // dont cache map files
    ],
  },
};
