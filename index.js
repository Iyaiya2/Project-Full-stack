const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let movies = [
    { id: 1, title: 'Avengers', director: 'Joss Whedon', description: 'Les héros les plus puissants de la Terre doivent se réunir et apprendre à se battre en équipe.' },
    { id: 2, title: 'Spiderman', director: 'Sam Raimi', description: 'Lorsqu’il est mordu par une araignée génétiquement modifiée, un lycéen ringard, timide et maladroit acquiert des capacités d’araignée.' },
    { id: 3, title: 'Thor', director: 'Kenneth Branagh', description: 'Le dieu puissant mais arrogant Thor est chassé d’Asgard pour vivre parmi les humains à Midgard (Terre).' },
    { id: 4, title: 'Aquaman', director: 'James Wan', description: 'Arthur Curry, l’héritier né de l’homme du royaume sous-marin d’Atlantis, part en quête d’empêcher une guerre entre les mondes de l’océan et de la terre.' },
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
