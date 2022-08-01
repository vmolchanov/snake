const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@reducers': path.resolve(__dirname, 'src/store/reducers'),
      '@actions': path.resolve(__dirname, 'src/store/actions'),
      '@constants': path.resolve(__dirname, 'src/store/constants'),
    }
  },
};
