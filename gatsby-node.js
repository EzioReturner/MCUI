const path = require('path')

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'mc-ui/lib': path.resolve(__dirname, '../src/components/'),
      },
    },
  })
}