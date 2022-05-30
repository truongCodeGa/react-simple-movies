export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "bdfbaf7689830bc3bb7922af5b3c9f42";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieSearch: (query, page = 1) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (id) => `${tmdbEndpoint}/${id}?api_key=${apiKey}`,
  getMovieCategory: (id, type) =>
    `${tmdbEndpoint}/${id}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500${url}`,
};

//Bài 224: Tối ưu API Config
