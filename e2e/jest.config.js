module.exports = {
  preset: "jest-puppeteer",
  verbose: true,
  globals: {
    URL: process.env.URL || 'http://localhost'
  }
}
