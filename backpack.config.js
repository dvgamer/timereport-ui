module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './api/index.dev.js'
    return config
  }
}
