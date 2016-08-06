import cartero from 'cartero';
import minimist from 'minimist';
import path from 'path';
import config from '../lib/config';

let appRootDirPath = path.resolve( __dirname, '../' );

let viewsDirPath = path.join( appRootDirPath, '/views' );
let libDirPath = path.join( appRootDirPath, '/lib' );
let outputDirPath = path.join( appRootDirPath, config.get( 'assets.compilation.output-directory' ) );

let carteroOptions = {
	appTransformDirs : [ viewsDirPath, libDirPath ].filter( Boolean ),
	appRootDirPath,
	outputDirUrl : config.get( 'assets.serving-url' ),
	watch : config.get( 'assets.compilation.watchMode' ),
	sourceMaps : true,
	browserifyOptions : { extensions : [ '.es' ] }
};

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

let carteroInput;
if( argv.main ) {
	carteroInput = argv.main.split( ',' );
} else {
	carteroInput = viewsDirPath + '/**/*.main.*';
}

let c = cartero( carteroInput, outputDirPath, carteroOptions );

c.on( 'done', function() {
	if( ! carteroOptions.watch )
		process.exit( 0 );
} );