const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Base de données temporaire de films
let movies = [
    { id: uuidv4(), title: 'Avengers', director: 'Joss Whedon', description: 'Earth\'s mightiest heroes must come together and learn to fight as a team.' },
    { id: uuidv4(), title: 'Spider-Man: Homecoming', director: 'Jon Watts', description: 'Peter Parker tries to balance high school life with being Spider-Man.' },
    { id: uuidv4(), title: 'Thor: Ragnarok', director: 'Taika Waititi', description: 'Thor must escape captivity and prevent Ragnarok, the end of Asgardian civilization.' },
    { id: uuidv4(), title: 'Aquaman', director: 'James Wan', description: 'Arthur Curry must claim his throne as the rightful king of Atlantis.' }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.post('/movies', (req, res) => {
    const { title, director, description } = req.body;
    if (!title || !director || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newMovie = { id: uuidv4(), title, director, description };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = movies.length;
    movies = movies.filter(movie => movie.id !== id);
    const finalLength = movies.length;
    if (initialLength === finalLength) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.sendStatus(204);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
