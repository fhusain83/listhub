var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require("../models/index.js");

/* GET home page. */
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
			return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('local-signup', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', function(req, res){
		res.render('home', { user: req.user });
	});

	router.get('/mygroups', function(req,res){
		db.lists.findAll({}).then(function(results){
			res.render('list-man', {list: results});
		})
		// res.render('list-man');
	});

	router.get('/groups', function(req,res){
		db.events.findAll({}).then(function(results){
			res.render("list-join", {groups: results});
		});
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

module.exports = router;