import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  movies = movies.filter((m) => m.poster_path && m.popularity > 7);
  if (!movies || !movies[0]) return;

  return (
    <div className="w-screen overflow-hidden">
      <div className="max-w-screen overflow-x-hidden">
        <h1 className="sm:text-2xl text-xl font-semibold sm:py-6 py-3 w-50 sm:h-20">
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
