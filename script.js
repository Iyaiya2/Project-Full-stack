document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieList = document.getElementById('movie-list');

    movieForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const description = document.getElementById('description').value;

        console.log('Form submitted with:', title, director, description); // Vérifier les valeurs dans la console

        if (title && director && description) {
            const newMovie = { title, director, description };
            await addMovie(newMovie);
            movieForm.reset();
            fetchMovies(); // Met à jour la liste des films après l'ajout
        }
    });

    async function fetchMovies() {
        try {
            const response = await fetch('http://localhost:3000/movies');
            if (!response.ok) {
                throw new Error('Fetch failed');
            }
            const movies = await response.json();
            movieList.innerHTML = '';
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><strong>${movie.title}</strong> - Directed by ${movie.director}</span>
                    <p>${movie.description}</p>
                    <button onclick="deleteMovie(${movie.id}, this)">Delete</button>
                `;
                movieList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    }

    async function addMovie(movie) {
        try {
            const response = await fetch('http://localhost:3000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
            if (!response.ok) {
                throw new Error('Add movie failed');
            }
        } catch (error) {
            console.error('Error adding movie:', error.message);
        }
    }

    async function deleteMovie(id, button) {
        try {
            const response = await fetch(`http://localhost:3000/movies/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Delete movie failed');
            }
            button.parentElement.remove(); // Supprime l'élément de la liste côté client
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    fetchMovies(); // Charge la liste des films au chargement de la page
});
