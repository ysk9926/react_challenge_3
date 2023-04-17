const API_KEY = "5b458cad0b474d21129c717626038657";
const BASE_URL = "https://api.themoviedb.org/3/";

interface IGenre {
  id: number;
  name: string;
}

interface IProductionCompanies {
  name: string;
  id: number;
  logo_path: string;
  original_country: string;
}

interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface IMovieDetails {
  backdrop_path: string;
  genres: IGenre[];
  id: number;
  overview: string;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface IgetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}
export function getTopRatedMovies() {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}
export function getUpcomingMovies() {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export const getMovie = (
  movieId: number
): Promise<IMovieDetails> | undefined => {
  if (!movieId) return;
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};
