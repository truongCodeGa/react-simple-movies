import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
//Bài 213: Fetching dữ liệu trang danh sách phim
//Bài 218: Thêm chức năng tìm kiếm phim
//Bài 219: Thêm Loading
//Bài 221: Thêm chức năng phân trang - Sử dụng react-paginate
//https://api.themoviedb.org/3/movie/latest?api_key
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>

const itemsPerPage = 20;
const MoviePage = () => {
  //phân trang
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  //https://api.themoviedb.org/3/movie/popular?api_key=bdfbaf7689830bc3bb7922af5b3c9f42&page=${nextPage}
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const movies = data?.results || [];

  // phân trang
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-5 page-container">
      <div className="flex">
        <div className="flex-1 ">
          <input
            type="text"
            className="w-full p-4 text-white
            rounded-l-lg bg-slate-800"
            placeholder="Type here to search"
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-pink rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div
          className="w-10 h-10 rounded-full border-4 
      border-pink border-t-transparent border-t-4 mx-auto my-10
      animate-spin
      "
        ></div>
      )}
      <div className="grid grid-cols-4 mt-10 gap-10 text-white">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-white">
        {/* phân trang */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </div>
  );
};

export default MoviePage;
