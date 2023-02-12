
const path = require('path');
const webpack = require('webpack');

module.exports = { 

	mode: 'production',

	entry: "./src/js/main.js",

	resolve: { 
		modules: [ 
			path.join(__dirname, "src"),
			"node_modules"
		]
	},

	output: { 
		path: path.resolve(__dirname, "dist"),
		filename: 'decoder-game.js',
		library: 'decoderGame',
		libraryTarget: 'window',
		libraryExport: 'default'
  	},

	optimization: { 
		minimize: true
	},

	plugins: [ 
		new webpack.ProvidePlugin({ 
		  $: 'jquery',
		  jQuery: 'jquery',
		})
	],

	module: { 
		rules: [ 
			{ 
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}
		],
	}

};