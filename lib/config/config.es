process.env.NODE_CONFIG_STRICT_MODE = true;

console.log( '[config]', 'start' );

// Requiring the implementation triggers loading and returns a singleton
const config = require( 'config' );

console.log( '[config]', 'env ', config.util.getEnv( 'NODE_ENV' ) );

console.log( '[config]', 'end' );

export default config;