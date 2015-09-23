(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var erfcinv = require( 'compute-erfcinv' );
},{"compute-erfcinv":5}],2:[function(require,module,exports){
'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, arr, accessor )
*	Computes the inverse complementary error function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfcinv( out, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			out[ i ] = ERFCINV( v );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./number.js":7}],3:[function(require,module,exports){
'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, arr )
*	Computes the inverse complementary error function for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfcinv( out, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			out[ i ] = ERFCINV( x[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./number.js":7}],4:[function(require,module,exports){
'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( arr, path[, sep] )
*	Computes the inverse complementary error function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function erfcinv( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		v, i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[ i ], ERFCINV( v ) );
			} else {
				dset( x[ i ], NaN );
			}
		}
	}
	return x;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./number.js":7,"utils-deep-get":64,"utils-deep-set":70}],5:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var erfcinv1 = require( './number.js' ),
	erfcinv2 = require( './array.js' ),
	erfcinv3 = require( './accessor.js' ),
	erfcinv4 = require( './deepset.js' ),
	erfcinv5 = require( './matrix.js' ),
	erfcinv6 = require( './typedarray.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( x[, opts] )
*	Computes the inverse complementary error function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated complementary inverse error function value(s)
*/
function erfcinv( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( isNumber( x ) || isnan( x ) ) {
		return erfcinv1( x );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return erfcinv5( out, x );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return erfcinv6( out, x );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return erfcinv4( x, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'erfcinv()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return erfcinv3( out, x, opts.accessor );
		}
		return erfcinv2( out, x );
	}
	return NaN;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./accessor.js":2,"./array.js":3,"./deepset.js":4,"./matrix.js":6,"./number.js":7,"./typedarray.js":8,"./validate.js":9,"compute-array-constructors":11,"dstructs-matrix":23,"validate.io-array-like":73,"validate.io-matrix-like":78,"validate.io-nan":79,"validate.io-number-primitive":80,"validate.io-typed-array-like":84}],6:[function(require,module,exports){
'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, x )
*	Evaluates the inverse complementary error function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function erfcinv( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'erfcinv()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = ERFCINV( x.data[ i ] );
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./number.js":7}],7:[function(require,module,exports){
'use strict';

/**
* erfcinv( x )
*
* Method:
*	1. For `|x| <= 0.5`, evaluate inverse erf using the rational approximation:
*
*		`erfcinv = x(x+10)(Y+R(x))`
*
*	where `Y` is a constant and `R(x)` is optimized for a low absolute error compared to `|Y|`. Max error `~2e-18`.
*
*	2. For `0.5 > 1-|x| >= 0`, evaluate inverse erf using the rational approximation:
*
*		`erfcinv = sqrt(-2*log(1-x)) / (Y + R(1-x))`
*
*	where `Y `is a constant, and R(q) is optimised for a low absolute error compared to `Y`. Max error `~7e-17`.
*
*	3. For `1-|x| < 0.25`, we have a series of rational approximations all of the general form:
*
*		`p = sqrt(-log(1-x))`
*
*	Then the result is given by:
*
*		`erfcinv = p(Y+R(p-B))`
*
*	where `Y` is a constant, `B` is the lowest value of `p` for which the approximation is valid, and `R(x-B)` is optimized for a low absolute error compared to `Y`.
*
*	Note that almost all code will really go through the first or maybe second approximation.  After than we are dealing with very small input values.
*
*	If `p < 3`, max error `~1e-20`.
*	If `p < 6`, max error `~8e-21`.
*	If `p < 18`, max error `~1e-19`.
*	If `p < 44`, max error `~6e-20`.
*	If `p >= 44`, max error `~1e-20`.
*/

// MODULES //

var polyval = require( 'compute-polynomial' );


// CONSTANTS //

var // Coefficients for erfcinv on [0, 0.5]:
	Y1 = 8.91314744949340820313e-2,
	P1 = [
		-5.38772965071242932965e-3,
		8.22687874676915743155e-3,
		2.19878681111168899165e-2,
		-3.65637971411762664006e-2,
		-1.26926147662974029034e-2,
		3.34806625409744615033e-2,
		-8.36874819741736770379e-3,
		-5.08781949658280665617e-4
	],
	Q1 = [
		8.86216390456424707504e-4,
		-2.33393759374190016776e-3,
		7.95283687341571680018e-2,
		-5.27396382340099713954e-2,
		-7.1228902341542847553e-1,
		6.62328840472002992063e-1,
		1.56221558398423026363,
		-1.56574558234175846809,
		-9.70005043303290640362e-1,
		1
	],

	// Coefficients for erfcinv for 0.5 > 1-x >= 0:
	Y2 = 2.249481201171875,
	P2 = [
		-3.67192254707729348546,
		2.11294655448340526258e1,
		1.7445385985570866523e1,
		-4.46382324441786960818e1,
		-1.88510648058714251895e1,
		1.76447298408374015486e1,
		8.37050328343119927838,
		1.05264680699391713268e-1,
		-2.02433508355938759655e-1
	],
	Q2 = [
		1.72114765761200282724,
		2.26436933413139721736e1,
		1.08268667355460159008e1,
		4.85609213108739935468e1,
		-2.01432634680485188801e1,
		-2.86608180499800029974e1,
		3.9713437953343869095,
		6.24264124854247537712,
		1
	],

	// Coefficients for erfcinv for sqrt( -log(1-x)):
	Y3 = 8.07220458984375e-1,
	P3 = [
		-6.81149956853776992068e-10,
		2.85225331782217055858e-8,
		-6.79465575181126350155e-7,
		2.14558995388805277169e-3,
		2.90157910005329060432e-2,
		1.42869534408157156766e-1,
		3.37785538912035898924e-1,
		3.87079738972604337464e-1,
		1.17030156341995252019e-1,
		-1.63794047193317060787e-1,
		-1.31102781679951906451e-1
	],
	Q3 = [
		1.105924229346489121e-2,
		1.52264338295331783612e-1,
		8.48854343457902036425e-1,
		2.59301921623620271374,
		4.77846592945843778382,
		5.38168345707006855425,
		3.46625407242567245975,
		1
	],

	Y4 = 9.3995571136474609375e-1,
	P4 = [
		2.66339227425782031962e-12,
		-2.30404776911882601748e-10,
		4.60469890584317994083e-6,
		1.57544617424960554631e-4,
		1.87123492819559223345e-3,
		9.50804701325919603619e-3,
		1.85573306514231072324e-2,
		-2.22426529213447927281e-3,
		-3.50353787183177984712e-2
	],
	Q4 = [
		7.64675292302794483503e-5,
		2.63861676657015992959e-3,
		3.41589143670947727934e-2,
		2.20091105764131249824e-1,
		7.62059164553623404043e-1,
		1.3653349817554063097,
		1
	],

	Y5 = 9.8362827301025390625e-1,
	P5 = [
		9.9055709973310326855e-17,
		-2.81128735628831791805e-14,
        4.62596163522878599135e-9,
        4.49696789927706453732e-7,
        1.49624783758342370182e-5,
        2.09386317487588078668e-4,
        1.05628862152492910091e-3,
        -1.12951438745580278863e-3,
		-1.67431005076633737133e-2
	],
	Q5 = [
		2.82243172016108031869e-7,
		2.75335474764726041141e-5,
        9.64011807005165528527e-4,
        1.60746087093676504695e-2,
        1.38151865749083321638e-1,
        5.91429344886417493481e-1,
        1
	];


// FUNCTIONS //

/**
* FUNCTION: calc( x, v, P, Q, Y )
*	Calculates a rational approximation.
*
* @private
* @param {Number} x
* @param {Number} v
* @param {Array} P - array of polynomial coefficients
* @param {Array} Q - array of polynomial coefficients
* @param {Number} Y
* @returns {Number} rational approximation
*/
function calc( x, v, P, Q, Y ) {
	var s, r;
	s = x - v;
	r = polyval( P, s ) / polyval( Q, s );
	return Y*x + r*x;
} // end FUNCTION calc()


// ERFINV //

/**
* FUNCTION: erfcinv( x )
*	Evaluates the complementary inverse error function for an input value.
*
* @private
* @param {Number} x - input value
* @returns {Number} evaluated complementary inverse error function
*/
function erfcinv( x ) {
	var sign = false,
		val,
		q, g, r;

	// [1] Special cases...

	// NaN:
	if ( x !== x ) {
		return NaN;
	}
	// x not on the interval: [0,2]
	if ( x < 0 || x > 2 ) {
		throw new RangeError ( 'erfcinv()::invalid input argument. Value must be on the interval [0,2]. Value: `' + x + '`.' );
	}
	if ( x === 0 ) {
		return Number.POSITIVE_INFINITY;
	}
	if ( x === 2 ) {
		return Number.NEGATIVE_INFINITY;
	}
	if ( x === 1 ) {
		return 0;
	}
	// [2] Get the sign and make use of `erfc` reflection formula: `erfc(-z) = 2 - erfc(z)`...
	if ( x > 1 ) {
		q = 2 - x;
		x = 1 - q;
		sign = true;
	} else {
		q = x;
		x = 1 - x;
	}
	// [3] |x| <= 0.5
	if ( x <= 0.5 ) {
		g = x * (x+10);
		r = polyval( P1, x ) / polyval( Q1, x );
		val = g*Y1 + g*r;
		return ( sign ) ? -val : val;
	}

	// [4] 1-|x| >= 0.25
	if ( q >= 0.25 ) {
		g = Math.sqrt( -2 * Math.log( q ) );
		q = q - 0.25;
		r = polyval( P2, q ) / polyval( Q2, q );
		val = g / (Y2+r);
		return ( sign ) ? -val : val;
	}
	q = Math.sqrt( -Math.log( q ) );

	// [5] q < 3
	if ( q < 3 ) {
		return calc( q, 1.125, P3, Q3, Y3 );
	}
	// [6] q < 6
	if ( q < 6 ) {
		return calc( q, 3, P4, Q4, Y4 );
	}
	// Note that the smallest number in JavaScript is 5e-324. Math.sqrt( -Math.log( 5e-324 ) ) ~27.2844
	return calc( q, 6, P5, Q5, Y5 );

	// Note that in the boost library, they are able to go to much smaller values, as 128 bit long doubles support ~1e-5000; something which JavaScript does not natively support.
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"compute-polynomial":12}],8:[function(require,module,exports){
'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, arr )
*	Computes the inverse complementary error function for each typed-array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfcinv( out, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		out[ i ] = ERFCINV( x[ i ] );
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"./number.js":7}],9:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'erfcinv()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'erfcinv()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'erfcinv()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'erfcinv()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'erfcinv()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'erfcinv()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":76,"validate.io-function":77,"validate.io-object":81,"validate.io-string-primitive":83}],10:[function(require,module,exports){
'use strict';

var CTORS = {
	'int8': Int8Array,
	'uint8': Uint8Array,
	'uint8_clamped': Uint8ClampedArray,
	'int16': Int16Array,
	'uint16': Uint16Array,
	'int32': Int32Array,
	'uint32': Uint32Array,
	'float32': Float32Array,
	'float64': Float64Array,
	'generic': Array
};


// EXPORTS //

module.exports = CTORS;

},{}],11:[function(require,module,exports){
'use strict';

// CTORS //

var CTORS = require( './ctors.js' );


// GET CTOR //

/**
* FUNCTION: getCtor( dtype )
*	Returns an array constructor corresponding to an input data type.
*
* @param {String} dtype - data type
* @returns {Function|Null} array constructor or null
*/
function getCtor( dtype ) {
	return CTORS[ dtype ] || null;
} // end FUNCTION getCtor()


// EXPORTS //

module.exports = getCtor;

},{"./ctors.js":10}],12:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArray = require( 'validate.io-array' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// POLYVAL //

/**
* FUNCTION: polyval( coef, x )
*	Evaluates a polynomial.
*
* @private
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Number} x - value at which to evaluate the polynomial
* @return {Number} evaluated polynomial
*/
function polyval( c, x ) {
	var len = c.length,
		p = 0,
		i = 0;
	for ( ; i < len; i++ ) {
		p = p*x + c[ i ];
	}
	return p;
} // end FUNCTION polyval()


// EVALUATE //

/**
* FUNCTION: evaluate( coef, x[, options] )
*	Evaluates a polynomial.
*
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Array|Number[]|Number} x - value(s) at which to evaluate the polynomial
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @param {Function} [options.accessor] - accessor function for accessing array values
* @returns {Number|Number[]} evaluated polynomial
*/
function evaluate( c, x, opts ) {
	var copy = true,
		clbk,
		len,
		arr,
		v, i;
	if ( !isNumberArray( c ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Coefficients must be provided as an array of number primitives. Value: `' + c + '`.' );
	}
	if ( isNumber( x ) ) {
		return polyval( c, x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Second argument must be either a single number primitive or an array of values. Value: `' + x + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'polynomial()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'polynomial()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'polynomial()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	len = x.length;
	if ( copy ) {
		arr = new Array( len );
	} else {
		arr = x;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			v = clbk( x[ i ], i );
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Accessed array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			v = x[ i ];
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	}
	return arr;
} // end FUNCTION evaluate()


// EXPORTS //

module.exports = evaluate;

},{"validate.io-array":13,"validate.io-boolean-primitive":76,"validate.io-function":77,"validate.io-number-primitive":80,"validate.io-number-primitive-array":14,"validate.io-object":81}],13:[function(require,module,exports){
'use strict';

/**
* FUNCTION: isArray( value )
*	Validates if a value is an array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is an array
*/
function isArray( value ) {
	return Object.prototype.toString.call( value ) === '[object Array]';
} // end FUNCTION isArray()

// EXPORTS //

module.exports = Array.isArray || isArray;

},{}],14:[function(require,module,exports){
/**
*
*	VALIDATE: number-primitive-array
*
*
*	DESCRIPTION:
*		- Validates if a value is an array of primitive numbers.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// IS NUMBER ARRAY //

/**
* FUNCTION: isNumberArray( value )
*	Validates if a value is an array of number primitives, excluding NaN.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is an array of number primitives
*/
function isNumberArray( value ) {
	var len, v;
	if ( !isArray( value ) ) {
		return false;
	}
	len = value.length;
	if ( !len ) {
		return false;
	}
	for ( var i = 0; i < len; i++ ) {
		v = value[ i ];
		if ( typeof v !== 'number' || v !== v ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isNumberArray()


// EXPORTS //

module.exports = isNumberArray;

},{"validate.io-array":13}],15:[function(require,module,exports){
'use strict';

// BASE TYPES //

var BTYPES = {
	'int8': Int8Array,
	'uint8': Uint8Array,
	'uint8_clamped': Uint8ClampedArray,
	'int16': Int16Array,
	'uint16': Uint16Array,
	'int32': Int32Array,
	'uint32': Uint32Array,
	'float32': Float32Array,
	'float64': Float64Array
};


// EXPORTS //

module.exports = BTYPES;

},{}],16:[function(require,module,exports){
'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, shape, dtype )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {String} dtype - matrix data type
* @param {Number[]} shape - matrix dimensions/shape
* @param {Number} offset - matrix offset
* @param {Number[]} strides - matrix strides
* @returns {Matrix} Matrix instance
*/
function Matrix( data, dtype, shape, offset, strides ) {
	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, dtype, shape, offset, strides );
	}
	// Underlying data type:
	Object.defineProperty( this, 'dtype', {
		'value': dtype,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix dimensions:
	Object.defineProperty( this, 'shape', {
		'value': shape,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix strides:
	Object.defineProperty( this, 'strides', {
		'value': strides,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix offset:
	Object.defineProperty( this, 'offset', {
		'value': offset,
		'configurable': false,
		'enumerable': true,
		'writable': true
	});

	// Number of matrix dimensions:
	Object.defineProperty( this, 'ndims', {
		'value': shape.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix length:
	Object.defineProperty( this, 'length', {
		'value': data.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Number of bytes used by the matrix elements:
	Object.defineProperty( this, 'nbytes', {
		'value': data.byteLength,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix data store:
	Object.defineProperty( this, 'data', {
		'value': data,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.js' );
Matrix.prototype.iset = require( './iset.js' );
Matrix.prototype.mset = require( './mset.js' );
Matrix.prototype.sset = require( './sset.js' );

Matrix.prototype.get = require( './get.js' );
Matrix.prototype.iget = require( './iget.js' );
Matrix.prototype.mget = require( './mget.js' );
Matrix.prototype.sget = require( './sget.js' );

Matrix.prototype.toString = require( './toString.js' );


// EXPORTS //

module.exports = Matrix;

},{"./get.js":19,"./iget.js":21,"./iset.js":24,"./mget.js":28,"./mset.js":30,"./set.js":38,"./sget.js":40,"./sset.js":42,"./toString.js":44}],17:[function(require,module,exports){
'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, shape, dtype )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {String} dtype - matrix data type
* @param {Number[]} shape - matrix dimensions/shape
* @param {Number} offset - matrix offset
* @param {Number[]} strides - matrix strides
* @returns {Matrix} Matrix instance
*/
function Matrix( data, dtype, shape, offset, strides ) {
	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, dtype, shape, offset, strides );
	}
	this.dtype = dtype;
	this.shape = shape;
	this.strides = strides;
	this.offset = offset;
	this.ndims = shape.length;
	this.length = data.length;
	this.nbytes = data.byteLength;
	this.data = data;
	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.raw.js' );
Matrix.prototype.iset = require( './iset.raw.js' );
Matrix.prototype.mset = require( './mset.raw.js' );
Matrix.prototype.sset = require( './sset.raw.js' );

Matrix.prototype.get = require( './get.raw.js' );
Matrix.prototype.iget = require( './iget.raw.js' );
Matrix.prototype.mget = require( './mget.raw.js' );
Matrix.prototype.sget = require( './sget.raw.js' );

Matrix.prototype.toString = require( './toString.js' );


// EXPORTS //

module.exports = Matrix;

},{"./get.raw.js":20,"./iget.raw.js":22,"./iset.raw.js":25,"./mget.raw.js":29,"./mset.raw.js":31,"./set.raw.js":39,"./sget.raw.js":41,"./sset.raw.js":43,"./toString.js":44}],18:[function(require,module,exports){
'use strict';

// DATA TYPES //

var DTYPES = [
	'int8',
	'uint8',
	'uint8_clamped',
	'int16',
	'uint16',
	'int32',
	'uint32',
	'float32',
	'float64'
];


// EXPORTS //

module.exports = DTYPES;

},{}],19:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// GET //

/**
* FUNCTION: get( i, j )
*	Returns a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number|Undefined} matrix element
*/
function get( i, j ) {
	/*jshint validthis:true */
	if ( !isNonNegativeInteger( i ) || !isNonNegativeInteger( j ) ) {
		throw new TypeError( 'get()::invalid input argument. Indices must be nonnegative integers. Values: `[' + i + ','+ j + ']`.' );
	}
	return this.data[ this.offset + i*this.strides[0] + j*this.strides[1] ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"validate.io-nonnegative-integer":58}],20:[function(require,module,exports){
'use strict';

/**
* FUNCTION: get( i, j )
*	Returns a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number|Undefined} matrix element
*/
function get( i, j ) {
	/*jshint validthis:true */
	return this.data[ this.offset + i*this.strides[0] + j*this.strides[1] ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],21:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// IGET //

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number|Undefined} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	var r, j;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iget()::invalid input argument. Must provide a integer. Value: `' + idx + '`.' );
	}
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	return this.data[ this.offset + r + j*this.strides[1] ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;

},{"validate.io-integer-primitive":56}],22:[function(require,module,exports){
'use strict';

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number|Undefined} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	var r, j;
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	return this.data[ this.offset + r + j*this.strides[1] ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;

},{}],23:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = require( './matrix.js' );
module.exports.raw = require( './matrix.raw.js' );

},{"./matrix.js":26,"./matrix.raw.js":27}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' ),
	isNumber = require( 'validate.io-number-primitive' );


// ISET //

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	var r, j;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iset()::invalid input argument. An index must be an integer. Value: `' + idx + '`.' );
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'iset()::invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return this;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	this.data[ this.offset + r + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;

},{"validate.io-integer-primitive":56,"validate.io-number-primitive":80}],25:[function(require,module,exports){
'use strict';

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	var r, j;
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return this;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	this.data[ this.offset + r + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;

},{}],26:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' ),
	contains = require( 'validate.io-contains' ),
	isArray = require( 'validate.io-array' ),
	cast = require( 'compute-cast-arrays' ),
	getType = require( 'compute-dtype' ),
	Matrix = require( './ctor.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// CREATE MATRIX //

/**
* FUNCTION: matrix( [data,] shape[, dtype] )
*	Returns a Matrix instance.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function matrix() {
	var dtype,
		ndims,
		shape,
		data,
		vFLG,
		len,
		dt,
		i;

	// Parse the input arguments (polymorphic interface)...
	if ( arguments.length === 1 ) {
		shape = arguments[ 0 ];
		vFLG = 2; // arg #s
	}
	else if ( arguments.length === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
			vFLG = 23; // arg #s
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
			vFLG = 12; // arg #s
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
		vFLG = 123; // arg #s
	}

	// Input argument validation...
	if ( !isNonNegativeIntegerArray( shape ) ) {
		throw new TypeError( 'matrix()::invalid input argument. A matrix shape must be an array of nonnegative integers. Value: `' + shape + '`.' );
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	// If a `dtype` has been provided, validate...
	if ( vFLG === 123 || vFLG === 23 ) {
		if ( !contains( DTYPES, dtype ) ) {
			throw new TypeError( 'matrix()::invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.' );
		}
	} else {
		dtype = 'float64';
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	// If a `data` argument has been provided, validate...
	if ( vFLG === 123 || vFLG === 12 ) {
		dt = getType( data );
		if ( !contains( DTYPES, dt ) && !isArray( data ) ) {
			throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
		if ( len !== data.length ) {
			throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the input data length.' );
		}
		// Only cast if either 1) both a `data` and `dtype` argument have been provided and they do not agree or 2) when provided a plain Array...
		if ( ( vFLG === 123 && dt !== dtype ) || dt === 'generic' ) {
			data = cast( data, dtype );
		}
	} else {
		// Initialize a zero-filled typed array:
		data = new BTYPES[ dtype ]( len );
	}
	// Return a new Matrix instance:
	return new Matrix( data, dtype, shape, 0, [shape[1],1] );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;

},{"./btypes.js":15,"./ctor.js":16,"./dtypes.js":18,"compute-cast-arrays":45,"compute-dtype":48,"validate.io-array":53,"validate.io-contains":54,"validate.io-nonnegative-integer-array":57,"validate.io-string-primitive":83}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' ),
	getType = require( 'compute-dtype' ),
	Matrix = require( './ctor.raw.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// CREATE MATRIX //

/**
* FUNCTION: matrix( [data,] shape[, dtype] )
*	Returns a Matrix instance.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function matrix() {
	var dtype,
		ndims,
		shape,
		data,
		len,
		i;

	if ( arguments.length === 1 ) {
		shape = arguments[ 0 ];
	}
	else if ( arguments.length === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	if ( data ) {
		if ( !dtype ) {
			dtype = getType( data );
			if ( !contains( DTYPES, dtype ) ) {
				throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
			}
		}
		if ( len !== data.length ) {
			throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the input data length.' );
		}
	} else {
		// Initialize a zero-filled typed array...
		if ( !dtype ) {
			dtype = 'float64';
		}
		data = new BTYPES[ dtype ]( len );
	}
	// Return a new Matrix instance:
	return new Matrix( data, dtype, shape, 0, [shape[1],1] );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;

},{"./btypes.js":15,"./ctor.raw.js":17,"./dtypes.js":18,"compute-dtype":48,"validate.io-contains":54,"validate.io-string-primitive":83}],28:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// MGET //

/**
* FUNCTION: mget( i[, j] )
*	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @returns {Matrix} a new Matrix instance
*/
function mget( rows, cols ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		out,
		sgn,
		d,
		s0, s1, s2, s3,
		o,
		r, dr,
		i, j, m, n;

	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o = this.offset;

	if ( arguments.length < 2 ) {
		if ( !isNonNegativeIntegerArray( rows ) ) {
			throw new TypeError( 'mget()::invalid input argument. Linear indices must be specified as a nonnegative integer array. Value: `' + rows + '`.' );
		}
		// Filter the input indices to ensure within bounds...
		i = [];
		for ( n = 0; n < rows.length; n++ ) {
			if ( rows[ n ] < this.length ) {
				i.push( rows[ n ] );
			}
		}
		m = i.length;

		// Create a row vector (matrix):
		d = new BTYPES[ this.dtype ]( m );
		out = new this.constructor( d, this.dtype, [1,m], 0, [m,1] );

		sgn = ( s0 < 0 ) ? -1 : 1;
		for ( n = 0; n < m; n++ ) {
			j = i[ n ] % s0;
			r = sgn * ( i[n] - j );
			d[ n ] = this.data[ o + r + j*s1 ];
		}
	} else {
		nRows = this.shape[ 0 ];
		if ( rows === null ) {
			i = new Array( nRows );
			for ( n = 0; n < nRows; n++ ) {
				i[ n ] = n;
			}
		}
		else if ( isNonNegativeIntegerArray( rows ) ) {
			i = [];
			for ( n = 0; n < rows.length; n++ ) {
				if ( rows[ n ] < nRows ) {
					i.push( rows[ n ] );
				}
			}
		}
		else {
			throw new TypeError( 'mget()::invalid input argument. Row indices must be specified as a nonnegative integer array. Value: `' + rows + '`.' );
		}

		nCols = this.shape[ 1 ];
		if ( cols === null ) {
			j = new Array( nCols );
			for ( n = 0; n < nCols; n++ ) {
				j[ n ] = n;
			}
		}
		else if ( isNonNegativeIntegerArray( cols ) ) {
			j = [];
			for ( n = 0; n < cols.length; n++ ) {
				if ( cols[ n ] < nCols ) {
					j.push( cols[ n ] );
				}
			}
		}
		else {
			throw new TypeError( 'mget()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + cols + '`.' );
		}
		nRows = i.length;
		nCols = j.length;

		d = new BTYPES[ this.dtype ]( nRows*nCols );
		out = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1]);

		s2 = out.strides[ 0 ];
		s3 = out.strides[ 1 ];
		for ( m = 0; m < nRows; m++ ) {
			r = o + i[m]*s0;
			dr = m * s2;
			for ( n = 0; n < nCols; n++ ) {
				d[ dr + n*s3 ] = this.data[ r + j[n]*s1 ];
			}
		}
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;

},{"./btypes.js":15,"validate.io-nonnegative-integer-array":57}],29:[function(require,module,exports){
'use strict';

// VARIABLES //

var BTYPES = require( './btypes.js' );


// MGET //

/**
* FUNCTION: mget( i[, j] )
*	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @returns {Matrix} a new Matrix instance
*/
function mget( rows, cols ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		out,
		sgn,
		d,
		s0, s1, s2, s3,
		o,
		r, dr,
		i, j, m, n;

	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o = this.offset;

	if ( arguments.length < 2 ) {
		i = rows;
		m = i.length;

		// Create a row vector (matrix):
		d = new BTYPES[ this.dtype ]( m );
		out = new this.constructor( d, this.dtype, [1,m], 0, [m,1] );

		sgn = ( s0 < 0 ) ? -1 : 1;
		for ( n = 0; n < m; n++ ) {
			j = i[ n ] % s0;
			r = sgn * ( i[n] - j );
			d[ n ] = this.data[ o + r + j*s1 ];
		}
	} else {
		if ( rows === null ) {
			nRows = this.shape[ 0 ];
			i = new Array( nRows );
			for ( n = 0; n < nRows; n++ ) {
				i[ n ] = n;
			}
		} else {
			nRows = rows.length;
			i = rows;
		}

		if ( cols === null ) {
			nCols = this.shape[ 1 ];
			j = new Array( nCols );
			for ( n = 0; n < nCols; n++ ) {
				j[ n ] = n;
			}
		} else {
			nCols = cols.length;
			j = cols;
		}

		d = new BTYPES[ this.dtype ]( nRows*nCols );
		out = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

		s2 = out.strides[ 0 ];
		s3 = out.strides[ 1 ];
		for ( m = 0; m < nRows; m++ ) {
			r = o + i[m]*s0;
			dr = m * s2;
			for ( n = 0; n < nCols; n++ ) {
				d[ dr + n*s3 ] = this.data[ r + j[n]*s1 ];
			}
		}
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;

},{"./btypes.js":15}],30:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// FUNCTIONS //

var mset1 = require( './mset1.js' ),
	mset2 = require( './mset2.js' ),
	mset3 = require( './mset3.js' ),
	mset4 = require( './mset4.js' ),
	mset5 = require( './mset5.js' ),
	mset6 = require( './mset6.js' );

/**
* FUNCTION: getIndices( idx, len )
*	Validates and returns an array of indices.
*
* @private
* @param {Number[]|Null} idx - indices
* @param {Number} len - max index
* @returns {Number[]} indices
*/
function getIndices( idx, len ) {
	var out,
		i;
	if ( idx === null ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = i;
		}
	}
	else if ( isNonNegativeIntegerArray( idx ) ) {
		out = [];
		for ( i = 0; i < idx.length; i++ ) {
			if ( idx[ i ] < len ) {
				out.push( idx[ i ] );
			}
		}
	}
	else {
		throw new TypeError( 'mset()::invalid input argument. Row and column indices must be arrays of nonnegative integers. Value: `' + idx + '`.' );
	}
	return out;
} // end FUNCTION getIndices()


// MSET //

/**
* FUNCTION: mset( i[, j], value[, thisArg] )
*	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @returns {Matrix} Matrix instance
*/
function mset() {
	/*jshint validthis:true */
	var nargs = arguments.length,
		args,
		rows,
		cols,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
		}
		// indices, clbk
		if ( isFunction( args[ 1 ] ) ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( isNumber( args[ 1 ] ) ) {
			mset1( this, args[ 0 ], args[ 1 ] );
		}
		// indices, matrix
		else {
			// NOTE: no validation for Matrix instance.
			mset3( this, args[ 0 ], args[ 1 ] );
		}
	}
	// 3 input arguments...
	else if ( nargs === 3 ) {
		// indices, clbk, context
		if ( isFunction( args[ 1 ] ) ) {
			if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
				throw new TypeError( 'mset()::invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
			}
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( isFunction( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset4( this, rows, cols, args[ 2 ], this );
		}
		// rows, cols, number
		else if ( isNumber( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset5( this, rows, cols, args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );

			// NOTE: no validation for Matrix instance.
			mset6( this, rows, cols, args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		// rows, cols, function, context
		if ( !isFunction( args[ 2 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. Callback argument must be a function. Value: `' + args[ 2 ] + '`.' );
		}
		rows = getIndices( args[ 0 ], this.shape[ 0 ] );
		cols = getIndices( args[ 1 ], this.shape[ 1 ] );
		mset4( this, rows, cols, args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;

},{"./mset1.js":32,"./mset2.js":33,"./mset3.js":34,"./mset4.js":35,"./mset5.js":36,"./mset6.js":37,"validate.io-function":77,"validate.io-nonnegative-integer-array":57,"validate.io-number-primitive":80}],31:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var mset1 = require( './mset1.js' ),
	mset2 = require( './mset2.js' ),
	mset3 = require( './mset3.js' ),
	mset4 = require( './mset4.js' ),
	mset5 = require( './mset5.js' ),
	mset6 = require( './mset6.js' );

/**
* FUNCTION: getIndices( idx, len )
*	Returns an array of indices.
*
* @private
* @param {Number[]|Null} idx - indices
* @param {Number} len - max index
* @returns {Number[]} indices
*/
function getIndices( idx, len ) {
	var out,
		i;
	if ( idx === null ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = i;
		}
	} else {
		out = idx;
	}
	return out;
} // end FUNCTION getIndices()


// MSET //

/**
* FUNCTION: mset( i[, j], value[, thisArg] )
*	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @returns {Matrix} Matrix instance
*/
function mset() {
	/*jshint validthis:true */
	var nargs = arguments.length,
		args,
		rows,
		cols,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		// indices, clbk
		if ( typeof args[ 1 ] === 'function' ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( typeof args[ 1 ] === 'number' ) {
			mset1( this, args[ 0 ], args[ 1 ] );
		}
		// indices, matrix
		else {
			mset3( this, args[ 0 ], args[ 1 ] );
		}
	}
	// 3 input arguments...
	else if ( nargs === 3 ) {
		// indices, clbk, context
		if ( typeof args[ 1 ] === 'function' ) {
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( typeof args[ 2 ] === 'function' ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset4( this, rows, cols, args[ 2 ], this );
		}
		// rows, cols, number
		else if ( typeof args[ 2 ] === 'number' ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset5( this, rows, cols, args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset6( this, rows, cols, args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		rows = getIndices( args[ 0 ], this.shape[ 0 ] );
		cols = getIndices( args[ 1 ], this.shape[ 1 ] );
		mset4( this, rows, cols, args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;

},{"./mset1.js":32,"./mset2.js":33,"./mset3.js":34,"./mset4.js":35,"./mset5.js":36,"./mset6.js":37}],32:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset1( mat, idx, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Number} v - numeric value
*/
function mset1( mat, idx, v ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		len = idx.length,
		o = mat.offset,
		sgn,
		r, j, n;

	sgn = ( s0 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		j = idx[ n ] % s0;
		r = sgn * ( idx[n] - j );
		mat.data[ o + r + j*s1 ] = v;
	}
} // end FUNCTION mset1()


// EXPORTS //

module.exports = mset1;

},{}],33:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset2( mat, idx, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset2( mat, idx, clbk, ctx ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		len = idx.length,
		o = mat.offset,
		sgn,
		r, c,
		i, k, n;

	sgn = ( s0 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		// Get the column number:
		c = idx[ n ] % s0;

		// Determine the row offset:
		i = sgn * ( idx[n] - c );

		// Get the row number:
		r = i / s0;

		// Calculate the index:
		k = o + i + c*s1;

		// Set the value:
		mat.data[ k ] = clbk.call( ctx, mat.data[ k ], r, c, k );
	}
} // end FUNCTION mset2()


// EXPORTS //

module.exports = mset2;

},{}],34:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset3( mat, idx, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Matrix} m - Matrix instance
*/
function mset3( mat, idx, m ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		s2 = m.strides[ 0 ],
		s3 = m.strides[ 1 ],
		len = idx.length,
		o0 = mat.offset,
		o1 = m.offset,
		sgn0, sgn1,
		r0, r1,
		j0, j1,
		n;

	if ( m.length !== len ) {
		throw new Error( 'mset()::invalid input argument. Number of indices does not match the number of elements in the value matrix.' );
	}
	sgn0 = ( s0 < 0 ) ? -1 : 1;
	sgn1 = ( s2 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		// Get the column number and row offset for the first matrix:
		j0 = idx[ n ] % s0;
		r0 = sgn0 * ( idx[n] - j0 );

		// Get the column number and row offset for the value matrix:
		j1 = n % s2;
		r1 = sgn1 * ( n - j1 );

		mat.data[ o0 + r0 + j0*s1 ] = m.data[ o1 + r1 + j1*s3  ];
	}
} // end FUNCTION mset3()


// EXPORTS //

module.exports = mset3;

},{}],35:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset4( mat, rows, cols, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset4( mat, rows, cols, clbk, ctx ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o = mat.offset,
		r,
		i, j, k;

	for ( i = 0; i < nRows; i++ ) {
		r = o + rows[i]*s0;
		for ( j = 0; j < nCols; j++ ) {
			k = r + cols[j]*s1;
			mat.data[ k ] = clbk.call( ctx, mat.data[ k ], rows[ i ], cols[ j ], k );
		}
	}
} // end FUNCTION mset4()


// EXPORTS //

module.exports = mset4;

},{}],36:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset5( mat, rows, cols, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Number} v - numeric value
*/
function mset5( mat, rows, cols, v ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o = mat.offset,
		r,
		i, j;

	for ( i = 0; i < nRows; i++ ) {
		r = o + rows[i]*s0;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r + cols[j]*s1 ] = v;
		}
	}
} // end FUNCTION mset5()


// EXPORTS //

module.exports = mset5;

},{}],37:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset6( mat, rows, cols, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Matrix} m - Matrix instance
*/
function mset6( mat, rows, cols, m ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		s2 = m.strides[ 0 ],
		s3 = m.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o0 = mat.offset,
		o1 = m.offset,
		r0, r1,
		i, j;

	if ( m.shape[ 0 ] !== nRows || m.shape[ 1 ] !== nCols ) {
		throw new Error( 'mset()::invalid input argument. The dimensions given by the row and column indices do not match the value matrix dimensions.' );
	}
	for ( i = 0; i < nRows; i++ ) {
		r0 = o0 + rows[i]*s0;
		r1 = o1 + i*s2;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r0 + cols[j]*s1 ] = m.data[ r1 + j*s3 ];
		}
	}
} // end FUNCTION mset6()


// EXPORTS //

module.exports = mset6;

},{}],38:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isNumber = require( 'validate.io-number-primitive' );


// SET //

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	if ( !isNonNegativeInteger( i ) || !isNonNegativeInteger( j ) ) {
		throw new TypeError( 'set()::invalid input argument. Row and column indices must be nonnegative integers. Values: `[' + i + ',' + j + ']`.' );
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'set()::invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	i = this.offset + i*this.strides[0] + j*this.strides[1];
	if ( i >= 0 ) {
		this.data[ i ] = v;
	}
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"validate.io-nonnegative-integer":58,"validate.io-number-primitive":80}],39:[function(require,module,exports){
'use strict';

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	i = this.offset + i*this.strides[0] + j*this.strides[1];
	if ( i >= 0 ) {
		this.data[ i ] = v;
	}
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	ispace = require( 'compute-indexspace' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// SUBSEQUENCE GET //

/**
* FUNCTION: sget( subsequence )
*	Returns matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @returns {Matrix} Matrix instance
*/
function sget( seq ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		mat,
		len,
		s0, s1,
		o,
		d,
		r, dr,
		i, j;

	if ( !isString( seq ) ) {
		throw new TypeError( 'sget()::invalid input argument. Must provide a string primitive. Value: `' + seq + '`.' );
	}
	seqs = seq.split( ',' );
	if ( seqs.length !== 2 ) {
		throw new Error( 'sget()::invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.' );
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;
	len = nRows * nCols;

	d = new BTYPES[ this.dtype ]( len );
	mat = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		o = this.offset;
		for ( i = 0; i < nRows; i++ ) {
			r = o + rows[i]*s0;
			dr = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;

},{"./btypes.js":15,"compute-indexspace":52,"validate.io-string-primitive":83}],41:[function(require,module,exports){
'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// SUBSEQUENCE GET //

/**
* FUNCTION: sget( subsequence )
*	Returns matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @returns {Matrix} Matrix instance
*/
function sget( seq ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		mat,
		len,
		s0, s1,
		o,
		d,
		r, dr,
		i, j;

	seqs = seq.split( ',' );
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;
	len = nRows * nCols;

	d = new BTYPES[ this.dtype ]( len );
	mat = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		o = this.offset;
		for ( i = 0; i < nRows; i++ ) {
			r = o + rows[i]*s0;
			dr = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;

},{"./btypes.js":15,"compute-indexspace":52}],42:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isFunction = require( 'validate.io-function' ),
	ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, value[, thisArg] )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {Matrix} Matrix instance
*/
function sset( seq, val, thisArg ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		clbk,
		rows,
		cols,
		seqs,
		mat,
		ctx,
		s0, s1, s2, s3,
		o0, o1,
		r0, r1,
		i, j, k;

	if ( !isString( seq ) ) {
		throw new TypeError( 'sset()::invalid input argument. Must provide a string primitive. Value: `' + seq + '`.' );
	}
	seqs = seq.split( ',' );
	if ( seqs.length !== 2 ) {
		throw new Error( 'sset()::invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.' );
	}
	if ( isFunction( val ) ) {
		clbk = val;
	}
	else if ( !isNumber( val ) ) {
		mat = val;
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( !( nRows && nCols ) ) {
		return this;
	}
	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o0 = this.offset;

	// Callback...
	if ( clbk ) {
		if ( arguments.length > 2 ) {
			ctx = thisArg;
		} else {
			ctx = this;
		}
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				k = r0 + cols[j]*s1;
				this.data[ k ] = clbk.call( ctx, this.data[ k ], rows[i], cols[j], k );
			}
		}
	}
	// Input matrix...
	else if ( mat ) {
		if ( nRows !== mat.shape[ 0 ] ) {
			throw new Error( 'sset()::invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		if ( nCols !== mat.shape[ 1 ] ) {
			throw new Error( 'sset()::invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		o1 = mat.offset;
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			r1 = o1 + i*s2;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = mat.data[ r1 + j*s3 ];
			}
		}
	}
	// Single numeric value...
	else {
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = val;
			}
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;

},{"compute-indexspace":52,"validate.io-function":77,"validate.io-number-primitive":80,"validate.io-string-primitive":83}],43:[function(require,module,exports){
'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, value[, thisArg] )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {Matrix} Matrix instance
*/
function sset( seq, val, thisArg ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		clbk,
		rows,
		cols,
		seqs,
		mat,
		ctx,
		s0, s1, s2, s3,
		o0, o1,
		r0, r1,
		i, j, k;

	seqs = seq.split( ',' );
	if ( typeof val === 'function' ) {
		clbk = val;
	}
	else if ( typeof val !== 'number' ) {
		mat = val;
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( !( nRows && nCols ) ) {
		return this;
	}
	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o0 = this.offset;

	// Callback...
	if ( clbk ) {
		if ( arguments.length > 2 ) {
			ctx = thisArg;
		} else {
			ctx = this;
		}
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				k = r0 + cols[j]*s1;
				this.data[ k ] = clbk.call( ctx, this.data[ k ], rows[i], cols[j], k );
			}
		}
	}
	// Input matrix...
	else if ( mat ) {
		if ( nRows !== mat.shape[ 0 ] ) {
			throw new Error( 'sset()::invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		if ( nCols !== mat.shape[ 1 ] ) {
			throw new Error( 'sset()::invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		o1 = mat.offset;
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			r1 = o1 + i*s2;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = mat.data[ r1 + j*s3 ];
			}
		}
	}
	// Single numeric value...
	else {
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = val;
			}
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;

},{"compute-indexspace":52}],44:[function(require,module,exports){
'use strict';

/**
* FUNCTION: toString()
*	Returns a string representation of Matrix elements. Rows are delineated by semicolons. Column values are comma-delimited.
*
* @returns {String} string representation
*/
function toString() {
	/* jshint validthis: true */
	var nRows = this.shape[ 0 ],
		nCols = this.shape[ 1 ],
		s0 = this.strides[ 0 ],
		s1 = this.strides[ 1 ],
		m = nRows - 1,
		n = nCols - 1,
		str = '',
		o,
		i, j;

	for ( i = 0; i < nRows; i++ ) {
		o = this.offset + i*s0;
		for ( j = 0; j < nCols; j++ ) {
			str += this.data[ o + j*s1 ];
			if ( j < n ) {
				str += ',';
			}
		}
		if ( i < m ) {
			str += ';';
		}
	}
	return str;
} // end FUNCTION toString()


// EXPORTS //

module.exports = toString;

},{}],45:[function(require,module,exports){
'use strict';

// MODULES //

var arrayLike = require( 'validate.io-array-like' ),
	typeName = require( 'type-name' );


// VARIABLES //

var DTYPES = require( 'compute-array-dtype/lib/dtypes' ),
	CTORS = require( 'compute-array-constructors/lib/ctors' );


// CAST //

/**
* FUNCTION: cast( x, type )
*	Casts an input array or array-like object to a specified type.
*
* @param {Object|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - value to cast
* @param {String|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} type - type to which to cast or a value from which the desired type should be inferred
* @returns {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} casted value
*/
function cast( x, type ) {
	/* jshint newcap:false */
	var ctor,
		len,
		d,
		i;

	if ( !arrayLike( x ) ) {
		throw new TypeError( 'cast()::invalid input argument. First argument must be an array-like object. Value: `' + x + '`.' );
	}
	if ( typeof type === 'string' ) {
		ctor = CTORS[ type ];
	} else {
		ctor = CTORS[ DTYPES[ typeName( type ) ] ];
	}
	if ( ctor === void 0 ) {
		throw new Error( 'cast()::invalid input argument. Unrecognized/unsupported type to which to cast. Value: `' + type + '`.' );
	}
	len = x.length;
	d = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		d[ i ] = x[ i ];
	}
	return d;
} // end FUNCTION cast()


// EXPORTS //

module.exports = cast;

},{"compute-array-constructors/lib/ctors":10,"compute-array-dtype/lib/dtypes":46,"type-name":47,"validate.io-array-like":73}],46:[function(require,module,exports){
'use strict';

var DTYPES = {
	'Int8Array': 'int8',
	'Uint8Array': 'uint8',
	'Uint8ClampedArray': 'uint8_clamped',
	'Int16Array': 'int16',
	'Uint16Array': 'uint16',
	'Int32Array': 'int32',
	'Uint32Array': 'uint32',
	'Float32Array': 'float32',
	'Float64Array': 'float64',
	'Array': 'generic'
};


// EXPORTS //

module.exports = DTYPES;

},{}],47:[function(require,module,exports){
/**
 * type-name - Just a reasonable typeof
 * 
 * https://github.com/twada/type-name
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';

var toStr = Object.prototype.toString;

function funcName (f) {
    return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec(f.toString())[1];
}

function ctorName (obj) {
    var strName = toStr.call(obj).slice(8, -1);
    if (strName === 'Object' && obj.constructor) {
        return funcName(obj.constructor);
    }
    return strName;
}

function typeName (val) {
    var type;
    if (val === null) {
        return 'null';
    }
    type = typeof(val);
    if (type === 'object') {
        return ctorName(val);
    }
    return type;
}

module.exports = typeName;

},{}],48:[function(require,module,exports){
'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	getType = require( 'compute-array-dtype' );


// DTYPE //

/**
* FUNCTION: dtype( value )
*	Determines the data type of an input value.
*
* @param {*} value - input value
* @returns {String} data type
*/
function dtype( value ) {
	var type,
		dt;
	if ( value === null ) {
		return 'null';
	}
	// Check for base types:
	type = typeof value;
	switch ( type ) {
		case 'undefined':
		case 'boolean':
		case 'number':
		case 'string':
		case 'function':
		case 'symbol':
			return type;
	}
	// Resort to slower look-up:
	type = typeName( value );

	// Is value a known array type?
	dt = getType( type );
	if ( dt ) {
		return dt;
	}
	// Is value a buffer object?
	if ( type === 'Buffer' || type === 'ArrayBuffer' ) {
		return 'binary';
	}
	// Assume the value is a generic object (Object|Class instance) which could contain any or multiple data types...
	return 'generic';
} // end FUNCTION dtype()


// EXPORTS //

module.exports = dtype;

},{"compute-array-dtype":50,"type-name":51}],49:[function(require,module,exports){
module.exports=require(46)
},{}],50:[function(require,module,exports){
'use strict';

// DTYPES //

var DTYPES = require( './dtypes.js' );


// GET DTYPE //

/**
* FUNCTION: getType( name )
*	Returns an array data type corresponding to an array constructor name.
*
* @param {String} name - constructor name
* @returns {String|Null} array data type or null
*/
function getType( name ) {
	return DTYPES[ name ] || null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;

},{"./dtypes.js":49}],51:[function(require,module,exports){
module.exports=require(47)
},{}],52:[function(require,module,exports){
/**
*
*	COMPUTE: indexspace
*
*
*	DESCRIPTION:
*		- Generates a linearly spaced index array from a subsequence string.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VARIABLES //

var re = /^(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?):(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?)(?:\:(?=-?\d*)(?:-?\d+)?)?$/;

/**
*	^(...)
*	=> require that the string begin with either a digit (+ or -), an `end` keyword, or a colon
*
*	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
*	=> match but do not capture
*		(?:-(?=\d+))?
*		=> match but do not capture a minus sign but only if followed by one or more digits
*		\d*
*		=> 0 or more digits
*		|
*		=> OR
*		end(?:-\d+|/\d+)?
*		=> the word `end` exactly, which may be followed by either a minus sign and 1 or more digits or a division sign and 1 or more digits
*
*	:
*	=> match a colon exactly
*
*	(?:(?:-(?=\d+))?\d*|end(?:-\d+|/\\d+)?)
*	=> same as above
*
*	(?:\:(?=-?\d*)(?:-?\d+)?)?
*	=> match but do not capture
*		\:(?=-?\d*)
*		=> a colon but only if followed by either a possible minus sign and 0 or more digits
*		(?:-?\d+)?
*		=> match but do not capture a possible minus sign and 1 or more digits
*
*	$
*	=> require that the string end with either a digit, `end` keyword, or a colon.
*
*
* Examples:
*	-	:
*	-	::
*	-	4:
*	-	:4
*	-	::-1
*	-	3::-1
*	-	:10:2
*	-	1:3:1
*	-	9:1:-3
*	-	1:-1
*	-	:-1
*	-	-5:
*	-	1:-5:2
*	-	-9:10:1
*	-	-9:-4:2
*	-	-4:-9:-2
*	-	1:end:2
*	-	:end/2
*	-	end/2:end:5
*/

var reEnd = /^end/,
	reMatch = /(-|\/)(?=\d+)(\d+)?$/;


// INDEXSPACE

/**
* FUNCTION: indexspace( str, len )
*	Generates a linearly spaced index array from a subsequence string.
*
* @param {String} str - subsequence string
* @param {Number} len - reference array length
* @returns {Number[]} array of indices
*/
function indexspace( str, len ) {
	var x1,
		x2,
		tmp,
		inc,
		arr;
	if ( !isString( str ) || !re.test( str ) ) {
		throw new Error( 'indexspace()::invalid input argument. Invalid subsequence syntax. Please consult documentation. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'indexspace()::invalid input argument. Reference array length must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( !len ) {
		return [];
	}
	str = str.split( ':' );
	x1 = str[ 0 ];
	x2 = str[ 1 ];

	if ( str.length === 2 ) {
		inc = 1;
	} else {
		inc = parseInt( str[ 2 ], 10 );
	}
	// Handle zero increment...
	if ( inc === 0 ) {
		throw new Error( 'indexspace()::invalid syntax. Increment must be an integer not equal to 0. Value: `' + inc + '`.' );
	}

	// START //

	// Handle use of 'end' keyword...
	if ( reEnd.test( x1 ) ) {
		tmp = x1.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x1 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x1 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x1 = 0;
				}
			} else {
				x1 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x1 = Math.ceil( x1 );
			}
		} else {
			x1 = len - 1;
		}
	} else {
		x1 = parseInt( x1, 10 );

		// Handle empty index...
		if ( x1 !== x1 ) {
			// :-?\d*:-?\d+
			if ( inc < 0 ) {
				// Max index:
				x1 = len - 1;
			} else {
				// Min index:
				x1 = 0;
			}
		}
		// Handle negative index...
		else if ( x1 < 0 ) {
			x1 = len + x1; // len-x1
			if ( x1 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x1 = 0;
			}
		}
		// Handle exceeding bounds...
		else if ( x1 >= len ) {
			return [];
		}
	}

	// END //

	// NOTE: here, we determine an inclusive `end` value; i.e., the last acceptable index value.

	// Handle use of 'end' keyword...
	if ( reEnd.test( x2 ) ) {
		tmp = x2.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x2 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x2 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x2 = 0;
				}
			} else {
				x2 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x2 = Math.ceil( x2 ) - 1;
			}
		} else {
			x2 = len - 1;
		}
	} else {
		x2 = parseInt( x2, 10 );

		// Handle empty index...
		if ( x2 !== x2 ) {
			// -?\d*::-?\d+
			if ( inc < 0 ) {
				// Min index:
				x2 = 0;
			} else {
				// Max index:
				x2 = len - 1;
			}
		}
		// Handle negative index...
		else if ( x2 < 0 ) {
			x2 = len + x2; // len-x2
			if ( x2 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x2 = 0;
			}
			if ( inc > 0 ) {
				x2 = x2 - 1;
			}
		}
		// Handle positive index...
		else {
			if ( inc < 0 ) {
				x2 = x2 + 1;
			}
			else if ( x2 >= len ) {
				x2 = len - 1;
			}
			else {
				x2 = x2 - 1;
			}
		}
	}

	// INDICES //

	arr = [];
	if ( inc < 0 ) {
		if ( x2 > x1 ) {
			return arr;
		}
		while ( x1 >= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	} else {
		if ( x1 > x2 ) {
			return arr;
		}
		while ( x1 <= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	}
	return arr;
} // end FUNCTION indexspace()


// EXPORTS //

module.exports = indexspace;

},{"validate.io-nonnegative-integer":58,"validate.io-string-primitive":83}],53:[function(require,module,exports){
module.exports=require(13)
},{}],54:[function(require,module,exports){
/**
*
*	VALIDATE: contains
*
*
*	DESCRIPTION:
*		- Validates if an array contains an input value.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isnan = require( 'validate.io-nan-primitive' );


// CONTAINS //

/**
* FUNCTION: contains( arr, value )
*	Validates if an array contains an input value.
*
* @param {Array} arr - search array
* @param {*} value - search value
* @returns {Boolean} boolean indicating if an array contains an input value
*/
function contains( arr, value ) {
	var len, i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'contains()::invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( isnan( value ) ) {
		for ( i = 0; i < len; i++ ) {
			if ( isnan( arr[ i ] ) ) {
				return true;
			}
		}
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === value ) {
			return true;
		}
	}
	return false;
} // end FUNCTION contains()


// EXPORTS //

module.exports = contains;

},{"validate.io-array":53,"validate.io-nan-primitive":55}],55:[function(require,module,exports){
/**
*
*	VALIDATE: nan-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a NaN primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: nan( value )
*	Validates if a value is a NaN primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether the value is a NaN primitive
*/
function nan( value ) {
	return typeof value === 'number' && value !== value;
} // end FUNCTION nan()


// EXPORTS //

module.exports = nan;

},{}],56:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// IS INTEGER //

/**
* FUNCTION: isInteger( value )
*	Validates if a value is a number primitive, excluding `NaN`, and an integer.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a integer primitive
*/
function isInteger( value ) {
	return isNumber( value ) && value%1 === 0;
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"validate.io-number-primitive":80}],57:[function(require,module,exports){
/**
*
*	VALIDATE: nonnegative-integer-array
*
*
*	DESCRIPTION:
*		- Validates if a value is a nonnegative integer array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// IS NONNEGATIVE INTEGER ARRAY //

/**
* FUNCTION: isNonNegativeIntegerArray( value )
*	Validates if a value is a nonnegative integer array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a nonnegative integer array
*/
function isNonNegativeIntegerArray( value ) {
	var len;
	if ( !isArray( value ) ) {
		return false;
	}
	len = value.length;
	if ( !len ) {
		return false;
	}
	for ( var i = 0; i < len; i++ ) {
		if ( !isNonNegativeInteger( value[i] ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isNonNegativeIntegerArray()


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"validate.io-array":53,"validate.io-nonnegative-integer":58}],58:[function(require,module,exports){
/**
*
*	VALIDATE: nonnegative-integer
*
*
*	DESCRIPTION:
*		- Validates if a value is a nonnegative integer.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// IS NONNEGATIVE INTEGER //

/**
* FUNCTION: isNonNegativeInteger( value )
*	Validates if a value is a nonnegative integer.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a nonnegative integer
*/
function isNonNegativeInteger( value ) {
	return isInteger( value ) && value >= 0;
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"validate.io-integer":59}],59:[function(require,module,exports){
/**
*
*	VALIDATE: integer
*
*
*	DESCRIPTION:
*		- Validates if a value is an integer.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );


// ISINTEGER //

/**
* FUNCTION: isInteger( value )
*	Validates if a value is an integer.
*
* @param {Number} value - value to be validated
* @returns {Boolean} boolean indicating whether value is an integer
*/
function isInteger( value ) {
	return isNumber( value ) && value%1 === 0;
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"validate.io-number":60}],60:[function(require,module,exports){
/**
*
*	VALIDATE: number
*
*
*	DESCRIPTION:
*		- Validates if a value is a number.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isNumber( value )
*	Validates if a value is a number.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a number
*/
function isNumber( value ) {
	return ( typeof value === 'number' || Object.prototype.toString.call( value ) === '[object Number]' ) && value.valueOf() === value.valueOf();
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],61:[function(require,module,exports){
'use strict';

/**
* FUNCTION: deepGet( obj, props )
*	Deep get a nested property.
*
* @param {Object|Array} obj - input object
* @param {Array} props - list of properties defining a key path
* @returns {*} nested property value
*/
function deepGet( obj, props ) {
	var len = props.length,
		v = obj,
		i;

	for ( i = 0; i < len; i++ ) {
		if ( typeof v === 'object' && v !== null && v.hasOwnProperty( props[i] ) ) {
			v = v[ props[i] ];
		} else {
			return;
		}
	}
	return v;
} // end FUNCTION deepGet()


// EXPORTS //

module.exports = deepGet;

},{}],62:[function(require,module,exports){
'use strict';

/**
* FUNCTION: defaults()
*	Returns default options.
*
* @returns {Object} default options
*/
function defaults() {
	return {
		'sep': '.'
	};
} // end FUNCTION defaults()


// EXPORTS //

module.exports = defaults;

},{}],63:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dget = require( './deepget.js' );


// FACTORY //

/**
* FUNCTION: factory( path[, opts] )
*	Creates a reusable deep get factory.
*
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {String} [opts.sep='.'] - key path separator
* @returns {Function} deep get factory
*/
function factory( path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	/**
	* FUNCTION: deepGet( obj )
	*	Deep get a nested property.
	*
	* @param {Object|Array} obj - input object
	* @returns {*} nested property value
	*/
	return function deepGet( obj ) {
		if ( typeof obj !== 'object' || obj === null ) {
			return;
		}
		return dget( obj, props );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./deepget.js":61,"./defaults.js":62,"./validate.js":65,"validate.io-array":66,"validate.io-string-primitive":83}],64:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dget = require( './deepget.js' );


// DEEP GET //

/**
* FUNCTION: deepGet( obj, path[, opts] )
*	Deep get a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {String} [opts.sep='.'] - key path separator
* @returns {*} nested property value
*/
function deepGet( obj, path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dget( obj, props );
} // end FUNCTION deepGet()


// EXPORTS //

module.exports = deepGet;
module.exports.factory = require( './factory.js' );

},{"./deepget.js":61,"./defaults.js":62,"./factory.js":63,"./validate.js":65,"validate.io-array":66,"validate.io-string-primitive":83}],65:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for function options
* @param {Object} options - function options
* @param {String} [options.sep] - key path separator
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'deepGet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'deepGet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-object":81,"validate.io-string-primitive":83}],66:[function(require,module,exports){
module.exports=require(13)
},{}],67:[function(require,module,exports){
'use strict';

/**
* FUNCTION: deepSet( obj, props, create, value )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {Array} props - list of properties defining a key path
* @param {Boolean} create - boolean indicating whether to create a path if the key path does not already exist
* @param {*} value - value to set
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, props, create, val ) {
	var len = props.length,
		bool = false,
		v = obj,
		p,
		i;

	for ( i = 0; i < len; i++ ) {
		p = props[ i ];
		if ( typeof v === 'object' && v !== null ) {
			if ( !v.hasOwnProperty( p ) ) {
				if ( create ) {
					v[ p ] = {};
				} else {
					break;
				}
			}
			if ( i === len-1 ) {
				if ( typeof val === 'function' ) {
					v[ p ] = val( v[ p ] );
				} else {
					v[ p ] = val;
				}
				bool = true;
			} else {
				v = v[ p ];
			}
		} else {
			break;
		}
	}
	return bool;
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;

},{}],68:[function(require,module,exports){
'use strict';

/**
* FUNCTION: defaults()
*	Returns default options.
*
* @returns {Object} default options
*/
function defaults() {
	return {
		'create': false,
		'sep': '.'
	};
} // end FUNCTION defaults()


// EXPORTS //

module.exports = defaults;

},{}],69:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dset = require( './deepset.js' );


// FACTORY //

/**
* FUNCTION: factory( path[, opts] )
*	Creates a reusable deep set factory.
*
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Function} deep set factory
*/
function factory( path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	/**
	* FUNCTION: deepSet( obj, value )
	*	Deep sets a nested property.
	*
	* @param {Object|Array} obj - input object
	* @param {*} value - value to set
	* @returns {Boolean} boolean indicating if the property was successfully set
	*/
	return function deepSet( obj, value ) {
		if ( typeof obj !== 'object' || obj === null ) {
			return false;
		}
		return dset( obj, props, opts.create, value );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./deepset.js":67,"./defaults.js":68,"./validate.js":71,"validate.io-array":72,"validate.io-string-primitive":83}],70:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dset = require( './deepset.js' );


// DEEP SET //

/**
* FUNCTION: deepSet( obj, path, value[, opts] )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {*} value - value to set
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, path, value, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return false;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 3 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dset( obj, props, opts.create, value );
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;
module.exports.factory = require( './factory.js' );

},{"./deepset.js":67,"./defaults.js":68,"./factory.js":69,"./validate.js":71,"validate.io-array":72,"validate.io-string-primitive":83}],71:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for function options
* @param {Object} options - function options
* @param {Boolean} [options.create] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [options.sep] - key path separator
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'deepSet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'create' ) ) {
		opts.create = options.create;
		if ( !isBoolean( opts.create ) ) {
			return new TypeError( 'deepSet()::invalid option. Create option must be a boolean primitive. Option: `' + opts.create + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'deepSet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":76,"validate.io-object":81,"validate.io-string-primitive":83}],72:[function(require,module,exports){
module.exports=require(13)
},{}],73:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// CONSTANTS //

var MAX = require( 'compute-const-max-safe-integer' );


// IS ARRAY-LIKE //

/**
* FUNCTION: isArrayLike( value )
*	Validates if a value is array-like.
*
* @param {*} value - value to validate
* @param {Boolean} boolean indicating if a value is array-like
*/
function isArrayLike( value ) {
	return value !== void 0 && value !== null && typeof value !== 'function' && isInteger( value.length ) && value.length >= 0 && value.length <= MAX;
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"compute-const-max-safe-integer":74,"validate.io-integer-primitive":75}],74:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = 9007199254740991; // Math.pow( 2, 53 ) - 1

},{}],75:[function(require,module,exports){
module.exports=require(56)
},{"validate.io-number-primitive":80}],76:[function(require,module,exports){
/**
*
*	VALIDATE: boolean-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a boolean primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isBoolean( value )
*	Validates if a value is a boolean primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a boolean primitive
*/
function isBoolean( value ) {
	return value === true || value === false;
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],77:[function(require,module,exports){
/**
*
*	VALIDATE: function
*
*
*	DESCRIPTION:
*		- Validates if a value is a function.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isFunction( value )
*	Validates if a value is a function.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a function
*/
function isFunction( value ) {
	return ( typeof value === 'function' );
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{}],78:[function(require,module,exports){
'use strict';

/**
* FUNCTION: matrixLike( value )
*	Validates if a value is matrix-like.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is matrix-like
*/
function matrixLike( v ) {
	return v !== null &&
		typeof v === 'object' &&
		typeof v.data === 'object' &&
		typeof v.shape === 'object' &&
		typeof v.offset === 'number' &&
		typeof v.strides === 'object' &&
		typeof v.dtype === 'string' &&
		typeof v.length === 'number';
} // end FUNCTION matrixLike()


// EXPORTS //

module.exports = matrixLike;

},{}],79:[function(require,module,exports){
/**
*
*	VALIDATE: nan
*
*
*	DESCRIPTION:
*		- Validates if a value is NaN.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: nan( value )
*	Validates if a value is not-a-number.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether the value is a NaN
*/
function nan( value ) {
	return ( typeof value === 'number' || Object.prototype.toString.call( value ) === '[object Number]' ) && value.valueOf() !== value.valueOf();
} // end FUNCTION nan()


// EXPORTS //

module.exports = nan;

},{}],80:[function(require,module,exports){
/**
*
*	VALIDATE: number-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a number primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isNumber( value )
*	Validates if a value is a number primitive, excluding `NaN`.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a number primitive
*/
function isNumber( value ) {
	return (typeof value === 'number') && (value === value);
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],81:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// ISOBJECT //

/**
* FUNCTION: isObject( value )
*	Validates if a value is a object; e.g., {}.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a object
*/
function isObject( value ) {
	return ( typeof value === 'object' && value !== null && !isArray( value ) );
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"validate.io-array":82}],82:[function(require,module,exports){
module.exports=require(13)
},{}],83:[function(require,module,exports){
/**
*
*	VALIDATE: string-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a string primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isString( value )
*	Validates if a value is a string primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a string primitive
*/
function isString( value ) {
	return typeof value === 'string';
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],84:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// CONSTANTS //

var MAX = require( 'compute-const-max-safe-integer' );


// IS TYPED-ARRAY-LIKE //

/**
* FUNCTION: isTypedArrayLike( value )
*	Validates if a value is typed-array-like.
*
* @param {*} value - value to validate
* @param {Boolean} boolean indicating if a value is typed-array-like
*/
function isTypedArrayLike( value ) {
	return value !== null &&
		typeof value === 'object' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX &&
		typeof value.BYTES_PER_ELEMENT === 'number' &&
		typeof value.byteOffset === 'number' &&
		typeof value.byteLength === 'number';
} // end FUNCTION isTypedArrayLike()


// EXPORTS //

module.exports = isTypedArrayLike;

},{"compute-const-max-safe-integer":85,"validate.io-integer-primitive":86}],85:[function(require,module,exports){
module.exports=require(74)
},{}],86:[function(require,module,exports){
module.exports=require(56)
},{"validate.io-number-primitive":80}]},{},[1])