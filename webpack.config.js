const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let package = require('./package.json');

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

function modifyManifest(buffer) {
  // copy-webpack-plugin passes a buffer
  var manifest = JSON.parse(buffer.toString());

  // make any modifications you like, such as
  manifest.version = package.version;

  // pretty print to JSON with two spaces
  manifest_JSON = JSON.stringify(manifest, null, 2);
  return manifest_JSON;
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
          ignore: [ 'pages/**/*', 'manifest.json' ]
        },
        {
          from: "./src/manifest.json",
          to: path.resolve('dist'),
          transform (content) {
            return modifyManifest(content);
          }
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