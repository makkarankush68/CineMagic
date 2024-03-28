import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !movies[0]) return;
  movies = movies.filter(
    (m) => m?.poster_path && m?.popularity > 3 && m?.vote_count > 30
  );
  // if (movies.length > 1) {
  //   const matchedMovies = movies.filter((movie) => {
  //     return movie.title === title;
  //   });

  //   if (matchedMovies.length > 0) {
  //     matchedMovies.forEach((matchedMovie) => {
  //       const index = movies.indexOf(matchedMovie);
  //       if (index !== -1) {
  //         movies.splice(index, 1);
  //         movies.unshift(matchedMovie);
  //       }
  //     });
  //   }
  // }
  return (
    <div className=" overflow-hidden">
      <div className="max-w-screen overflow-x-hidden">
        <h1 className="sm:text-2xl text-xl font-semibold sm:py-6 p-3 w-50 sm:h-20">
          {title}
        </h1>
        <div className="flex overflow-x-scroll p-2 ">
          <div className="flex ">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
