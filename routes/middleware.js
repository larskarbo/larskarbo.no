/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash'),
	keystone = require('keystone'),
	url = require('url');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {

	// keystone.list('Side').model
	// 	.find()
	// 	.where({
	// 		slug:{ $ne: 'heim'}
	// 	})
	// 	.sort('sortOrder')
	// 	.exec(function(err, result){
	// 		var sider = result.map(function(el){
	// 			return {
	// 				label: el.tittel,
	// 				key: el.slug,
	// 				href: '/'+el.slug
	// 			}
	// 		})
	// 	})

	res.locals.navLinks = [
		{ label: 'Heim', key: 'heim', href: '/' },
		{ label: 'Turar', key: 'turar', href: '/turar' },
		{ label: 'Overnatting', key: 'overnatting', href: '/overnatting' },
		// { label: 'Partnarar', key: 'samarbeidspartnarar', href: '/samarbeidspartnarar' },
		{ label: 'Om oss', key: 'om-oss', href: '/om-oss'},
		{ label: 'Kontakt', key: 'kontakt', href: '/kontakt' },
	];

	res.locals.user = req.user;
	
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

