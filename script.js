document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieList = document.getElementById('movie-list');

    movieForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const description = document.getElementById('description').value;

        if (title && director && description) {
            const newMovie = { title, director, description };
            await addMovie(newMovie);
            movieForm.reset();
            fetchMovies();
        }
    });

    async function fetchMovies() {
        const response = await fetch('http://localhost:3000/movies');
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
    }

    async function addMovie(movie) {
        await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
    }

    fetchMovies();
});

async function deleteMovie(id, button) {
    await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    });
    button.parentElement.remove();
}
