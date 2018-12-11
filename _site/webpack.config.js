module.exports = {
    // webpack folder's entry js - excluded from jekll's build process.
    context: __dirname,
    entry: "./src/assets/js/entry.js",
    output: {
      // we're going to put the generated file in the assets folder so jekyll will grab it.
        path: __dirname + '/assets/js/',
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
  };