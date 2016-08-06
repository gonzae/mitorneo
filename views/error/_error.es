export default function( req, res, errObject ) {
	return res.render( 'error/_error.nunj', errObject, 'error/error.main.es' );
}