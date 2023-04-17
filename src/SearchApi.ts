const API_KEY = "5b458cad0b474d21129c717626038657";
const BASE_URL = "https://api.themoviedb.org/3";

interface ISearch {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
}

export interface IGetSearchResult {
  dates: {
    maximum: string;
    minimum: string;
  };

  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export function searchMovies(keyword: string | null) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&region=krR&query=${keyword}&language=ko-KR&page=1`
  ).then((response) => response.json());
}
export function searchTv(keyword: string | null) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&region=krR&query=${keyword}&language=ko-KR&page=1`
  ).then((response) => response.json());
}
