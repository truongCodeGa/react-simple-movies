import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
const HomePage = () => {
  return (
    <Fragment>
      {/* now playing */}
      <section className="movies-layout page-container pb-20 text-white ">
        <h2 className="capitalize mb-5 text-3xl font-bold">Now Playing</h2>
        <MovieList></MovieList>
      </section>
      {/* top reted */}
      <section className="movies-layout page-container pb-20 text-white ">
        <h2 className="capitalize mb-5 text-3xl font-bold">Top reated</h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      {/* trending */}
      <section className="movies-layout page-container pb-20 text-white ">
        <h2 className="capitalize mb-5 text-3xl font-bold">Trending</h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
