import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import nunjucks from 'nunjucks';
import hook from 'cartero-node-hook';
import carteroMiddleware from 'cartero-express-middleware';

import config from './lib/config';
import routes from './routes/index';
import users from './routes/users';

let app = express();

// view engine setup
nunjucks.configure( 'views', {
    autoescape : true,
    express : app
});

app.use( favicon ( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// configure Cartero Hook
let h = hook(
	path.join( __dirname, config.get( 'assets.compilation.output-directory' ) ),
	{ outputDirUrl : config.get( 'assets.serving-url' ) }
);

// Use Cartero Middleware (overrides res.render() method)
app.use( carteroMiddleware( h ) );

app.use( '/', routes );
app.use( '/users', users );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	let err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
});

// error handlers

// development error handler
// will print stacktrace
if( app.get( 'env' ) === 'development' ) {
	app.use( ( err, req, res, next ) => {
		res.status( err.status || 500 );
		res.render( 'error/_error.nunj', {
			message: err.message,
			error: err
		}, 'error/error.main.es' );
	} );
}

// production error handler
// no stacktraces leaked to user
app.use( ( err, req, res, next ) => {
	res.status( err.status || 500 );
	res.render( 'error/_error.nunj', {
		message: err.message,
		error: {}
	}, 'error/error.main.es'  );
} );

module.exports = app;
