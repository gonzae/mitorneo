var express = require( 'express' );
var router = express.Router();

/* GET home page. */
router.get( '/', function( req, res, next ) {
	res.render( 'home/_home.nunj', { title: 'Express' }, 'home/home.main.es' );
} );

module.exports = router;
