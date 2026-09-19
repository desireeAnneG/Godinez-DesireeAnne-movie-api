const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------------
// Temporary in-memory data storage
// NOTE: This is a plain JavaScript array, not a database.
// Any movies added via POST will disappear when the server restarts.
// ---------------------------------------------------------------------------
let movies = [
  { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
  { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
  { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

// Keeps track of the next id to assign (auto-increment simulation)
let nextId = movies.length + 1;

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /api/movies — retrieve all movies
app.get('/api/movies', (req, res) => {
  res.status(200).json(movies);
});

// GET /api/movies/:id — retrieve one movie
app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Movie id must be a number.' });
  }

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: `Movie with id ${id} not found.` });
  }

  res.status(200).json(movie);
});

// POST /api/movies — add a new movie
app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  // Validate required fields
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!genre) missingFields.push('genre');
  if (!year) missingFields.push('year');

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required field(s): ${missingFields.join(', ')}`
    });
  }

  const yearNumber = Number(year);
  if (Number.isNaN(yearNumber)) {
    return res.status(400).json({ error: 'Year must be a valid number.' });
  }

  const newMovie = {
    id: nextId++,
    title: String(title).trim(),
    genre: String(genre).trim(),
    year: yearNumber
  };

  movies.push(newMovie);

  res.status(201).json({
    message: 'Movie added successfully',
    movie: newMovie
  });
});

// Fallback for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Movie Collection API running at http://localhost:${PORT}`);
});
