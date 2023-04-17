const API_KEY = "5b458cad0b474d21129c717626038657";
const BASE_URL = "https://api.themoviedb.org/3";

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

export interface ITvShowDetails {
  backdrop_path: string;
  genres: IGenre[];
  id: number;
  poster_path: string;
  first_air_date: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  name: string;
  number_of_seasons: number;
  overview: string;
  tagline: string;
  status: string;
  vote_average: number;
}

export interface ITvShow {
  poster_path: string;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  name: string;
  genres: IGenre[];
}

export interface IGetTvShowsResults {
  page: number;
  results: ITvShow[];
  total_results: number;
  total_pages: number;
}

// TV Shows
export const getTvShowDetails = (
  tvId: number | null
): Promise<ITvShowDetails> | undefined => {
  if (!tvId) return;
  return fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const getAiringTodayTvShows = (): Promise<IGetTvShowsResults> => {
  return fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const getTopRatedTvShows = (): Promise<IGetTvShowsResults> => {
  return fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const getPopularTvShows = (): Promise<IGetTvShowsResults> => {
  return fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};
