//Packages
const path = require('path');
const async = require('async');
const scrape = require('html-metadata');

//Models
const User = require('../models/User');
const List = require('../models/List');
const Wish = require('../models/Wish');

//Services
const assignmentService = require('../services/assignmentService');
const emailService = require('../services/emailService');

module.exports = function(app){
	app.get('/allLists', function(req, res){
		List.find({})
			.populate('members')
			.populate('captain')
			.exec(function(err, users){
				res.send(users)
			})
	});

	app.get('/allUsers/:listId', function(req, res){
		let listId = req.params.listId;
	});

	app.get('/data/:type/:userId', function(req, res){
		let userId = req.params.userId;
		let reqType = req.params.type;
		let dataType;

		switch (reqType.toLowerCase()) {
			case 'user':
			User.findById(userId).populate('exceptions').populate('selected').exec(function(err, oUser){
				res.send(oUser);
			});
			break
			case 'list':
			List
				.findById(userId)
				.populate({
					path: "members",
					model: "User",
					populate: {
						path: "selected"
					}
				})
				.populate('captain')
				.exec(function(err, oList){
					List.populate(oList, {
						path: 'members.wishlist',
						model: 'Wish'
					}, function(err, uList){
						res.send(uList);
					});
			});
			break
			default:
			User.findById(userId).populate('exceptions').populate('selected').exec(function(err, oUser){
				res.send(oUser);
			});
		}
	});

	app.post('/list', function(req, res){
		let listName = req.body.name;
		let userList = req.body.users;
		let memberArray = []

		async.each(userList, function(user, callback){
			let oUser = new User(user);
			oUser.save(function(err, model){
				memberArray.push(model._id);
				callback();
			});
		}, function(){
			let oList = new List({
				name: listName,
				members: memberArray,
				captain: memberArray[0],
				drawStarted: false,
				drawCompleted: false
			});
			oList.save(function(){
				oList.populate('members')
					.populate('captain')
					.populate(function(){
						res.send(oList)
					});
			});
		})
	});

	app.post('/applyExceptions', function(req, res){
		let userList = req.body.list.members;

		async.each(userList, function(clientUser, callback){
			let clientId = clientUser._id.toString();
			User.findById(clientId).exec(function(err, dbUser){
				dbUser.exceptions = clientUser.exceptions;
				dbUser.save(function(){
					callback();
				});					
			});
		}, function(){
			List.findById(req.body.list._id).populate('members').populate('captain').exec(function(err, list){
				let resp = assignmentService.trigger(list.members);;
				res.send(resp)
			});
		})
	});

	app.post('/user', function(req, res){

	});

	app.put('/addUserSelection', function(req, res){
		let userId = req.body.userId;
		let selectionId = req.body.selectionId;

		User.findById(userId).exec(function(err, oUser){
			oUser.selected = selectionId;
			oUser.save(function(){
				User.findById(selectionId).exec(function(err, xUser){
					xUser.amISelected = true;
					xUser.save(function(){
						res.send("Ok!")
					});
				});
			});
		});
	});

	app.put('/updateDrawn', function(req, res){
		let userId = req.body.userId;

		User.findById(userId).exec(function(err, oUser){
			oUser.drawn = true;
			oUser.save(function(){
				res.send("ok!")
			});
		});
	});

	app.post('/triggerEmail', function(req, res){
		let userId = req.body.userId;

		User.findById(userId).populate('selected').exec(function(err, oUser){
			emailService.sendReminderEmail(oUser);
			res.send("ok")
		});

	});

	app.put('/user/:userId', function(){
		let userId = req.params.userId;
	});

	app.post('/addWish', function(req, res){
		let userId = req.body.userId;
		let wish = req.body.wish;

		User.findById(userId).exec(function(err, oUser){
			let oWish = new Wish(wish);
			oWish.save(function(){
				oUser.wishlist.unshift(oWish);
				oUser.save(function(){
					User.findOne({selected: oUser._id}).exec(function(err, xUser){
						emailService.sendWishEmail(xUser, oUser);
						res.send(oWish);
					});
				});
			});
		});
	});

	app.post('/scrapeWebsite', function(req, res){
		let url = req.body.url;
		
		scrape(url).then(function(metaData){
			res.send(metaData)
		}).catch(function(err){
			console.log('err is', err)
		});

	});
}