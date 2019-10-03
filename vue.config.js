//publicPath allows it to run on relative web address
//runtime compiler enabls dynamic template editing by user
module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  devServer: {
    proxy: process.env.NODE_ENV !== 'development' ? undefined : {
      '^/api': {
        'target': 'https://directory.bbmri-eric.eu',
        'keepOrigin': true
      },
    }
  }
};