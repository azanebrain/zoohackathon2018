const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES_PATH = './src/pages';

function generateHtmlPlugins(items) {
  return items.map( (name) => new HtmlPlugin(
    {
      filename: `./${name}.html`,
      chunks: [ name ],
      template: './src/pages/template.html'
    }
  ))
}

const config = {
  entry: {
    background: `${PAGES_PATH}/background`,
    content: `${PAGES_PATH}/content`,
    options: `${PAGES_PATH}/options`,
    popup: `${PAGES_PATH}/popup`,
    polyfills: `${PAGES_PATH}/polyfills`,
  },
  devtool: 'cheap-module-source-map',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  output: {
    path: path.resolve('dist/pages'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin(
      [
        {
          from: 'src',
          to: path.resolve('dist'),
          ignore: [ 'pages/**/*' ]
        }
      ]
    ),
    ...generateHtmlPlugins(
      [
        'background',
        'options',
        'popup'
      ]
    )
  ]
};

//if( process.argv.includes('development') ) {}


module.exports = config;