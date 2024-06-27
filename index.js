const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let movies = [
    { id: 1, title: 'Avengers', director: 'Joss Whedon', description: 'Earth\'s mightiest heroes must come together and learn to fight as a team.' },
    { id: 2, title: 'Spiderman', director: 'Sam Raimi', description: 'When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities.' },
    { id: 3, title: 'Thor', director: 'Kenneth Branagh', description: 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth).' },
    { id: 4, title: 'Aquaman', director: 'James Wan', description: 'Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.' },
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.post('/movies', (req, res) => {
    const newMovie = req.body;
    newMovie.id = movies.length + 1;
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    movies = movies.filter(movie => movie.id != id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
