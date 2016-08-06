export default function( req, res, next ) {
	return res.render( 'home/_home.nunj', { title: 'Express' }, 'home/home.main.es' );
}