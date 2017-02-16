var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	var temp = global.temp;
	res.render('index', { //render the index.ejs
    temp: temp
  });
});

router.post('/', ensureAuthenticated, function(req, res){
	console.log("test");
	var temp = req.body.temperature;
	req.checkBody('temperature', 'temperature is required').notEmpty();
	var errors = req.validationErrors();

	if(errors){
		res.redirect('/',{
			errors:errors,
			temp: temp
		});
	} else {
		global.temp = temp;
		res.redirect('/',{
			errors:errors,
			temp: temp
		});
	}
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/nindex');
	}
}

module.exports = router;