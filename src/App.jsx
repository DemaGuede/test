import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "./config/firebase";
import Auth from "./components/Auth";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      // console.log(data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  async function updateMovieTitle(id, e) {
    e.preventDefault();
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    setUpdatedTitle("");
    getMovieList();
  }

  async function deleteMovie(id) {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  async function onSubmitMovie(e) {
    e.preventDefault();
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        userId: auth?.currentUser?.uid,
      });
      setNewMovieTitle("");
      setNewReleaseDate("");
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Auth />
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p> Date: {movie.releaseDate} </p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
            <form onSubmit={(e) => updateMovieTitle(movie.id, e)}>
              <input
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input type="submit" value="Update Title" />
            </form>
          </div>
        ))}
      </div>
      <br />
      <form onSubmit={onSubmitMovie}>
        <input
          value={newMovieTitle}
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          value={newReleaseDate}
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input type="submit" value="Submit Movie" />
      </form>
    </div>
  );
};

export default App;
