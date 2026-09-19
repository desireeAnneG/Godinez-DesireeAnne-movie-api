# Movie Collection API

A simple Movie Collection REST API built with **Node.js + Express**, using a
plain JavaScript array as temporary in-memory storage (no database).

> ⚠️ **Note:** Data is stored in memory only. Any movies added via `POST`
> will disappear when the server restarts.

## Tech Stack
- Node.js
- Express
- Vanilla HTML/CSS/JavaScript (frontend, `public/index.html`)

## Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server runs at **http://localhost:3000**.
Open that URL in your browser to use the frontend (`public/index.html`).

## API Endpoints

### GET /api/movies
Retrieve all movies.

**Response `200`**
```json
[
  { "id": 1, "title": "Interstellar", "genre": "Science Fiction", "year": 2014 }
]
```

### GET /api/movies/:id
Retrieve a single movie by id.

**Response `200`**
```json
{ "id": 1, "title": "Interstellar", "genre": "Science Fiction", "year": 2014 }
```

**Response `404`** (movie not found)
```json
{ "error": "Movie with id 99 not found." }
```

### POST /api/movies
Add a new movie. `id` is assigned automatically.

**Request body**
```json
{ "title": "Inception", "genre": "Science Fiction", "year": 2010 }
```

**Response `201`**
```json
{
  "message": "Movie added successfully",
  "movie": { "id": 4, "title": "Inception", "genre": "Science Fiction", "year": 2010 }
}
```

**Response `400`** (missing required field)
```json
{ "error": "Missing required field(s): title, genre" }
```

## Project Structure
```
.
├── server.js          # Express server + REST API routes
├── package.json
├── public/
│   └── index.html     # Frontend: list movies, add movie form
└── README.md
```
