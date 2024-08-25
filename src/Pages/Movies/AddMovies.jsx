import React from 'react';
import { useState } from 'react';
import './AddMovies.css';
import { toast } from 'react-toastify';

const AddMovies = () => {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    portraitImgUrl: "",
    landscapeImgUrl: "",
    rating: 0,
    genre: [],
    duration: 0,
  });

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Science Fiction",
    "Thriller",
    "Other",
  ];

  const handleGenreChange = (genre) => {
    if (movie.genre.includes(genre)) {
      setMovie({
        ...movie,
        genre: movie.genre.filter((selectedGenre) => selectedGenre !== genre),
      });
    }
    else {
      setMovie({ ...movie, genre: [...movie.genre, genre] });
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleCreateMovie = async () => {

    try {
      if (
        movie.title === "" ||
        movie.description === "" ||
        movie.rating === 0 ||
        movie.genre.length === 0 ||
        movie.duration === 0
      ) {
        toast.error("Please fill all the fields", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/movie/createmovie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Movie creation successful", data);

        toast.success("Movie Created Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.error("Movie creation failed", response.statusText);
        toast.error("Movie Creation Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    catch (error) {
      console.error("An error occurred during movie creation", error);
    }
    console.log(movie)
  }

  return (
    <div className="formpage">
      <h1>Add Movies</h1>
      <label>Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleInputChange}
      />
      <br />
      <label>Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={movie.description}
        onChange={handleInputChange}
      />
      <br />
      <label>Portrait Image</label>
      <input
        type="text"
        name="portraitImgUrl"
        placeholder="Add Portrait Image Url"
        value={movie.portraitImgUrl}
        onChange={handleInputChange}
      />
      <br />
      <label>Landscape Image</label>
      <input
        type="text"
        name="landscapeImgUrl"
        placeholder="Add Landscape Image Url"
        value={movie.landscapeImgUrl}
        onChange={handleInputChange}
      />
      <br />

      <label>Rating</label>
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={movie.rating}
        onChange={handleInputChange}
      />
      <br />
      <div>
        <p>Select Genres:</p>
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              name="genre"
              checked={movie.genre.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>

      <br />

      <label>Duration</label>
      <input
        type="number"
        name="duration"
        placeholder="Duration"
        value={movie.duration}
        onChange={handleInputChange}
      />
      <br />

      <button onClick={handleCreateMovie}>Create Movie</button>

    </div>
  )
}

export default AddMovies