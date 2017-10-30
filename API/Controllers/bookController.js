const mysql = require('mysql');
const db = require('../db');
const _ = require('lodash');


class bookController {
	constructor() {}

	findAll(req, res){
		const sql = mysql.format("SELECT * FROM books ");
	   	db.query(sql,(err, result) => {
	    console.log(result);
	    if (_.isEmpty(result)) return res.send("No books data");
	    return res.status(200).send(result);
		})
	}


	findOne(req, res){
	  const title = req.params.title;
	  const sql = mysql.format("SELECT * FROM books WHERE title = ? " );
	  db.query(sql, title, (err, result) => {
	    console.log(result);
	    if (_.isEmpty(result)) return res.send("Book doesn't exist");
	    return res.status(200).send(result);
	  })
	}

	insertBook(req, res){
		const response = {
	    	title:req.body.title,
	    	author:req.body.author,
	    	isbn:req.body.isbn,
	    	abstract:req.body.abstract,
	    	publisher:req.body.publisher,
	    	publication_year:req.body.publication_year
	   };
        const sql = mysql.format("INSERT INTO books SET ?")
        db.query(sql, response, (err, result) => {
        	if (err) throw error;
            console.log(response);
            res.end('Book added to database !!');
        });
	}

	updateBook(req, res){
		const title = req.params.title;
		const response = {
	    	title:req.body.title,
	    	author:req.body.author,
	    	isbn:req.body.isbn,
	    	abstract:req.body.abstract,
	    	publisher:req.body.publisher,
	    	publication_year:req.body.publication_year
	   };
    	const sql = mysql.format("SELECT * FROM books WHERE title = ?");
   		db.query(sql, title, (error, results) => {
        	if (!_.isEmpty(results)) {
            	const sql2 = mysql.format("UPDATE books SET ? WHERE title = ?")
            	db.query(sql2, [response, title],(err, result) => {
               		console.log(response);
               		res.end('Book successfully udpated !!');
            	});
         	} else {
            	res.end("error, book doesn't find"); 
         	} 
   		});
	}

	deleteOne(req, res){
		const title = req.body.title;
  		const sql = mysql.format('DELETE FROM books WHERE title = ?');
   		db.query(sql, title, (err, result) => {
    		if (err) throw error;
    		return res.status(200).send("book data has been deleted");
  		})
	}


}

module.exports = new bookController();