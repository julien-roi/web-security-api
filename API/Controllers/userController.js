const mysql = require('mysql');
const db = require('../db');
const _ = require('lodash');

class userController{
	constructor() {}


	userConnection(req, res){
		response = {
	      	username:req.body.username,
	      	password:req.body.password
	   };
	   	const sql = mysql.format("SELECT * FROM users WHERE username = ?");
	   	db.query(sql, response.username, (err, result) => {
	    	if (_.isEmpty(result)) res.send("it doesn't work, maybe you put an invalid username");
	      	if (result[0].password != response.password){
	        	res.send("it doesn't work, maybe you put an invalid password");
	      	}else{
	         	console.log(response);
	         	res.sendFile(__dirname + "/public" + "/home.html");     
	        }
	   	});
	}


	findAll(req, res){
	   	const sql = mysql.format("SELECT * FROM users ");
	   	db.query(sql, (err, result) => {
	    	console.log(result);
	    	if (_.isEmpty(result)) return res.send("No users data");
	    	return res.status(200).send(result);
		})
	}



	findByUsername(req, res){
	  	const username = req.params.username;
	  	const sql = mysql.format("SELECT * FROM users WHERE username = ? " );
	  	db.query(sql, username, (err, result) => {
	    	console.log(result);
	    	if (_.isEmpty(result)) return res.send("Username doesn't exist");
	    	return res.status(200).send(result);
	  	})
	}

	deleteOne(req, res){
	  	const username = req.body.username;
	  	const sql = mysql.format('DELETE FROM users WHERE username = ?');
	   	db.query(sql, username, (err, result) => {
	    	if (err) throw error;
	    	return res.status(200).send("User data has been deleted");
	  	})
	}

	createUser(req, res){
		const response = {
	      	username:req.body.username,
	      	pin:req.body.pin,
	      	password:req.body.password,
	      	first_name:req.body.first_name,
	      	last_name:req.body.last_name
	   	};
	   	const sql = mysql.format("SELECT * FROM users WHERE username = ?");
	   	db.query(sql, response.username, (error, results) => {
	        if (_.isEmpty(results) || results[0].username != response.username) {
	        	const sql2 = mysql.format("INSERT INTO users SET ?")
	            db.query(sql2, response, (err, result) => {
	            	if (err) throw error;
	             	console.log(response);
	               	res.end('User added to database !!');
	            });
	        }else{
	            res.end("error, username already used"); 
	        } 
	   	});
	}


	updateUser(req, res){
		const username = req.params.username;
	  	const response = {
	    	username:req.body.username,
	    	pin:req.body.pin,
	    	password:req.body.password,
	    	first_name: req.body.first_name,
	    	last_name:req.body.last_name
	  	};
	   	const sql = mysql.format("SELECT * FROM users WHERE username = ?");
	   	db.query(sql, username, (error, results) => {
	        if (!_.isEmpty(results) || results[0].username == username) {
	        	const sql2 = mysql.format("SELECT username FROM users");
	        	db.query(sql2, (er,rst) =>{
	        		_.forEach(rst,(value) => {
	        			if (value.username == response.username) {
	        				return res.end("error, username already used");
	        				return false;
						}
					});
					const sql3 = mysql.format("UPDATE users SET ? WHERE username = ?");
	            	db.query(sql3, [response, username] , (err, result) => {
	            		if (err) throw error;
	               		console.log(response);
	               		res.end('User successfuly updated !!');
	               	});
	        	});  
	        }else{
	            res.end("error"); 
	        } 
	   	});
	}

}


module.exports = new userController();