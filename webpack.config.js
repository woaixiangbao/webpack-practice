module.exports = function(env = {}){
	const webpack 			= require('webpack'),
		  path 				= require('path'),
		  fs				= require('fs'),
		  packageConf 		= JSON.parse(fs.readFileSync('package.json','utf-8'));

	let name 				= packageConf.name,
		version 			= packageConf.version,
		library				= name.replace(/^(\w)/, m => m.toUpperCase()),
		proxyPort 			= 8081,
		plugins				= [],
		loaders				= [];

		console.log(env);
	if(env.production){
		name += `-${version}.min`;

		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					drop_console: false
				}
			})
		);
	}

	if(fs.existsSync('./.babelrc')){
		let babelConf = JSON.parse(fs.readFileSync('.babelrc'));
		console.log(83838);
		console.log(babelConf);
		loaders.push({
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: babelConf
		});
	}

	console.log(63737);
	console.log(version);
	return {
		entry: './lib/app.js',
		output: {
			filename: `${name}.js`,
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/static/js/',
			library: `${library}`,
			libraryTarget: 'umd'
		},

		plugins: plugins,

		module:{
			loaders: loaders
		},

		devServer: {
			proxy: {
				'*': `http://127.0.0.1: ${proxyPort}`
			}
		}
	};
}