// routes/jokeRoutes.js
const express = require('express');
const router = express.Router();
const JokeController = require('../controllers/jokeController');

// Route to get all categories
router.get('/categories', JokeController.getCategories);

// Route to get jokes by category
router.get('/joke/:category', JokeController.getJokesByCategory);

// Route to get a random joke
router.get('/random', JokeController.getRandomJoke);

router.get('/joke', (req, res) => {
    res.render('add-joke', { title: "Add Joke" });
});
// Route to add a new joke
router.post('/joke/add', JokeController.addJoke);

module.exports = router;