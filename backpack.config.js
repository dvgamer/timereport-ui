module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './index.dev.js'
    return config
  }
}
