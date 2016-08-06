import express from 'express';

// Pages Middlewares:
import homePageMiddleware from '../views/home/_home.es';

let router = express.Router();

router.get( '/', ( req, res, next ) => {
	homePageMiddleware( req, res );
} );

module.exports = router;
