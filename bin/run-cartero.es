import cartero from 'cartero';
import minimist from 'minimist';
import path from 'path';

let viewsDirPath = path.resolve( __dirname, '../views' );
let libDirPath = path.resolve( __dirname, '../lib' );
let appRootDirPath = path.resolve( __dirname, '../' );
let assetsOutputUrl = '/assets/'
let watchMode = true;

let carteroOptions = {
	// appTransforms : [
	// 	function( file ) {
	// 		return t_scss( file, { includePaths : [
	// 			path.resolve( __dirname, 'sass-mixins' ),
	// 			path.resolve( __dirname, 'sass-mixins/bourbon' ),
	// 			path.resolve( __dirname, 'sass-mixins/neat' )
	// 		] } );
	// 	},
	// 	function( file ) {
	// 		return t_cssdatauri( file );
	// 	}
	// ],
	appTransformDirs : [ viewsDirPath, libDirPath ].filter( Boolean ),
	appRootDirPath,
	outputDirUrl : assetsOutputUrl,
	// packageTransform : function( pkg, dir ) {
	// 	if( pkg._transformedByMobilized ) return pkg;

	// 	// if( _.contains( [ 'nunjucks' ], pkg.name ) ) {
	// 	// 	pkg.browserify = pkg.browserify || {};
	// 	// 	pkg.browserify.transform = pkg.browserify.transform || [];
	// 	// 	pkg.browserify.transform = pkg.browserify.transform.concat( 'browserify-shim' );
	// 	// }

	// 	pkg._transformedByMobilized = true;

	// 	return pkg;
	// },
	// factorThreshold : function() { return false; }
	watch : false,
	sourceMaps : true,
	browserifyOptions : { extensions : [ '.es' ] },
	// postProcessors : [
	// 	function( file ) {
	// 		return autoprefixer( file );
	// 	}
	// ]
};

let carteroInput;
let outputDirPath = path.resolve( __dirname, '../public/assets' );

let argv = minimist( process.argv.slice( 2 ),
	{
		alias : {
			prod : 'p',
			test : 't',
			help : 'h',
			main : 'm'
		},
		boolean : [ 'prod', 'test', 'help' ]
	}
);

if( argv.main ) carteroInput = argv.main.split( ',' );
else carteroInput = viewsDirPath + '/**/*.main.*';

let c = cartero( carteroInput, outputDirPath, carteroOptions );

// workaround for cartero, for exit the process
// taken from https://github.com/rotundasoftware/cartero/blob/master/bin/cmd.js#L61-L64
c.on( 'done', function() {
	if( ! carteroOptions.watch )
		process.exit( 0 );
} );