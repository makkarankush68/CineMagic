import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !movies[0]) return;
  movies = movies.filter(
    (m) => m?.poster_path && m?.popularity > 3 && m?.vote_count > 30
  );
  return (
    <>
      {movies && (
        <div className=" overflow-hidden">
          <div className="max-w-screen overflow-x-hidden">
            {title && (
              <h1 className="sm:text-2xl text-xl font-semibold sm:py-6 p-3 w-50 sm:h-20">
                {title}
              </h1>
            )}
            <div className="flex overflow-x-scroll p-2 ">
              <div className="flex ">
                {movies.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;
