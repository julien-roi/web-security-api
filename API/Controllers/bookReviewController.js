const mysql = require('mysql');
const db = require('../db');
const _ = require('lodash');

class bookReviewController{
	constructor() {}

	findAll(req, res) {
		const sql = mysql.format("SELECT * FROM book_reviews ");
	   	db.query(sql, (err, result) => {
	    	console.log(result);
	    	if (_.isEmpty(result)) return res.send("No book reviews data");
	    	return res.status(200).send(result);
		})
	}

	createReview(req, res) {
		const params = {
			username:req.params.username,
			isbn:req.params.isbn
		}
		const response = {
	    	rating:req.body.rating,
	    	review:req.body.review,
	    	review_date:req.body.review_date,
	   };
	   	const sql = mysql.format("SELECT id FROM users WHERE username = ?");
	   	db.query(sql, params.username, (error, results) => {
	   		if (_.isEmpty(results)) return res.end("Username doesn't exist");
	   		const sql2 = mysql.format("SELECT id FROM books WHERE isbn = ?");
	   		db.query(sql2, params.isbn, (er,rst) => {
	   			if (er) throw error;
	   			const response2 = {
	   				user_id:results[0].id,
	   				book_id:rst[0].id,
	   				rating:req.body.rating,
	    			review:req.body.review,
	    			review_date:req.body.review_date,
	   			}
	   			const sql3 = mysql.format("INSERT INTO book_reviews SET ?");
        		db.query(sql3, response2, (err, result) => {
        			if (err) throw error;
            		console.log(response2);
            		res.end('Book review added to database !!');
        		});
	   		})
	   	})
	}


	updateReview(req, res) {
		const params = {
			username:req.params.username,
			isbn:req.params.isbn
		}
		const response = {
	    	rating:req.body.rating,
	    	review:req.body.review,
	    	review_date:req.body.review_date,
	   };
	   	const sql = mysql.format("SELECT id FROM users WHERE username = ?");
	   	db.query(sql, params.username, (error, results) => {
	   		if (_.isEmpty(results)) return res.end("Username doesn't exist");
	   		const sql2 = mysql.format("SELECT id FROM books WHERE isbn = ?");
	   		db.query(sql2, params.isbn, (er,rst) => {
	   			if (er) throw error;
	   			const response2 = {
	   				user_id:results[0].id,
	   				book_id:rst[0].id,
	   				rating:req.body.rating,
	    			review:req.body.review,
	    			review_date:req.body.review_date,
	   			}
	   			const sql3 = mysql.format("INSERT INTO book_reviews SET ?");
        		db.query(sql3, response2, (err, result) => {
        			if (err) throw error;
            		console.log(response2);
            		res.end('Book review successfully updated !!');
        		});
	   		})
	   	})
	}


	findForUser(req, res) {
		const username = req.params.username;
		const sql = mysql.format("SELECT id FROM users WHERE username = ?");
	   	db.query(sql, username, (error, results) => {
	   		if (_.isEmpty(results)) return res.end("Username doesn't exist");
	   		const sql2 = mysql.format("SELECT * FROM book_reviews WHERE (book_reviews.user_id = ?)");
	  		db.query(sql2, results[0].id, (err, result) => {
	    		console.log(result);
	    		if (err) throw error;
	    		return res.status(200).send(result);
	  		})
	   	})
	}

	findOne(req, res) {
		const params = {
			username:req.params.username,
			isbn:req.params.isbn
		}
		const sql = mysql.format("SELECT * FROM users WHERE username = ?");
	   	db.query(sql, params.username, (error, results) => {
	   		if (_.isEmpty(results)) return res.end("Username doesn't exist");
	   		const sql2 = mysql.format("SELECT id FROM books WHERE isbn = ?");
	  		db.query(sql2, params.isbn, (err, result) => {
	    		if (err) throw error;
	    		const sql3 = mysql.format("SELECT * FROM book_reviews WHERE book_id = ? AND user_id = ?");
	    		db.query(sql3, [result[0].id, results[0].id], (er, rst) => {
	    			if (err) throw error;
	    			return res.status(200).send(rst);
	    		})
	  		})
	   	})
	}


	deleteOne(req, res) {
		const params = {
			username:req.params.username,
			isbn:req.params.isbn
		}
		const sql = mysql.format("SELECT id FROM users WHERE username = ?");
	   	db.query(sql, params.username, (error, results) => {
	   		if (_.isEmpty(results)) return res.end("Username doesn't exist");
	   		const sql2 = mysql.format("SELECT id FROM books WHERE isbn = ?");
	  		db.query(sql2, params.isbn, (err, result) => {
	    		if (err) throw error;
	    		const sql3 = mysql.format("DELETE FROM book_reviews WHERE book_id = ? AND user_id = ? ");
	    		db.query(sql3, [result[0].id, results[0].id], (er, rst) => {
	    			if (err) throw error;
	    			return res.status(200).send("Book review data has been deleted");
	    		})
	  		})
	   	})
	}

}


module.exports = new bookReviewController();
