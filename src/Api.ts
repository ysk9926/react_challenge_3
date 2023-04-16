const API_KEY = "5b458cad0b474d21129c717626038657";
const BASE_URL = "https://api.themoviedb.org/3/";

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
