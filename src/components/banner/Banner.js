import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

//https://image.tmdb.org/t/p/original
//Bài 211: Tạo component Banner
//upcoming
const Banner = () => {
  const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  //   console.log("MovieList", data);
  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className="banner h-[400px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <BannerItems item={item}></BannerItems>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

const BannerItems = ({ item }) => {
  const { backdrop_path, title, release_date, vote_average, vote_count, id } =
    item;
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-full rounded-lg 
  bg-white relative"
    >
      <div
        className="overlay absolute inset-0 bg-gradient-to-t
  from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.3)] rounded-lg
    "
      ></div>
      <img
        src={tmdbAPI.imageOriginal(backdrop_path)}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-3">{title}</h2>
        <div className="flex gap-x-3 items-center mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            {new Date(release_date).getFullYear()}
          </span>
          <span className="py-2 px-4  border first-letter:border-white rounded-md">
            Vote : {vote_average}
          </span>
          <span className="py-2 px-4  border border-white rounded-md">
            Vote count : {vote_count}
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
};
export default Banner;
