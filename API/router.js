const express = require('express');
const router = express.Router();

const bookController = require('./Controllers/bookController');
const userController = require('./Controllers/userController');
const bookReviewController = require('./Controllers/bookReviewController');

router.get('/',  (req, res) => {
	res.sendFile( __dirname + "/" + "index.html" );
})

router.route('/home')
  	.post(userController.userConnection, (req, res) => {});
router.route('/books')
	.get(bookController.findAll, (req, res) => {})
	.post(bookController.insertBook, (req, res) => {})
	.delete(bookController.deleteOne, (req, res) => {});
router.route('/books/:title')
	.put(bookController.updateBook, (req, res) => {})
	.get(bookController.findOne, (req, res) => {});
router.route('/users')
	.post(userController.createUser, (req, res) => {})
  	.get(userController.findAll, (req, res) => {})
  	.delete(userController.deleteOne, (req, res) => {});
router.route('/users/:username')
  	.get(userController.findByUsername, (req, res) => {})
  	.put(userController.updateUser, (req, res) => {});
router.route('/users/:username/:isbn')
	.post(bookReviewController.createReview, (req, res) => {})
	.delete(bookReviewController.deleteOne, (req, res) => {})
	.get(bookReviewController.findOne, (req, res) => {})
	.put(bookReviewController.updateReview, (req, res) => {});
router.route('/book_reviews')
	.get(bookReviewController.findAll, (req, res) => {});
router.route('/book_reviews/:username')
	.get(bookReviewController.findForUser, (req, res) => {});

module.exports = router;