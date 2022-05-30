import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { tmdbAPI, apiKey, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
//Bài 214: Trang chi tiết phim - Fetching dữ liệu
//Bài 215: Trang chi tiết phim - Code giao diện
//Bài 216: Trang chi tiết phim - Fetching dữ liệu diễn viên
//Bài 217: Trang chi tiết phim - Fetching dữ liệu trailers và similar
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  console.log("MovieDetailsPage", data);

  if (!data) return null;
  const { backdrop_path, poster_path, title, overview, genres } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[800px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className=" max-w-[1100px] mx-auto ">
        <div
          className="w-full h-[300px] mx-auto
        -mt-[150px] relative z-10
      "
        >
          <img
            src={tmdbAPI.imageOriginal(poster_path)}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
        </div>
        <div
          className="flex justify-center font-bold
      items-center text-white text-3xl my-10"
        >
          {title}
        </div>
        {genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-10">
            {genres.map((item) => (
              <span
                key={item.id}
                className="flex items-center
            py-2 px-4 rounded-3xl border  text-pur border-pur
             gap-x-5"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <div
          className="my-10 mx-auto text-center
      leading-7
      "
        >
          {overview}
        </div>
        <MovieCredits></MovieCredits>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  //credits
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
  const { data, error } = useSWR(
    tmdbAPI.getMovieCategory(movieId, "credits"),
    fetcher
  );
  console.log("MovieCredits", data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-white mb-10 text-3xl">Casts</h2>
      {/*  */}
      <Swiper
        className="grid grid-cols-4 gap-10"
        grabCursor={"true"}
        spaceBetween={40}
        slidesPerView={"auto"}
      >
        {cast.map((item) => {
          return (
            <SwiperSlide
              className={item.profile_path === null ? "hidden" : "cast-item"}
              key={item.id}
            >
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[300px] rounded-lg mb-3 object-cover"
              />

              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
//Bài 217: Trang chi tiết phim - Fetching dữ liệu trailers và similar
function MovieVideo() {
  const { movieId } = useParams();
  //videos
  //`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}
  const { data, error } = useSWR(
    tmdbAPI.getMovieCategory(movieId, "videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log("MovieVideo", results);
  return (
    <div className="flex flex-col gap-y-5 mt-14">
      {results.slice(0, 3).map((item) => (
        <div key={item.id}>
          <h3
            className="mb-5 text-xl font-medium p-3 
          inline-block bg-pur"
          >
            {item.name}
          </h3>
          <iframe
            width="300"
            height="500"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full object-fill"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  //similar
  //https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}
  const { data, error } = useSWR(
    tmdbAPI.getMovieCategory(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  console.log("MovieSimilar", data);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
