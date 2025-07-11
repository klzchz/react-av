import axios from "axios";
import { API_BASE_URL } from "../config";

// --- Interfaces de Tipos para os Dados 

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface StudioWin {
  name: string;
  winCount: number;
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MaxMinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface PagedMoviesResponse {
  content: Movie[];
  totalPages: number;
  number: number;
}

interface FetchMoviesParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

// Funções de Fetch 

export const fetchYearsWithMultipleWinners = () => {
  return axios.get<{ years: YearWithMultipleWinners[] }>(
    `${API_BASE_URL}?projection=years-with-multiple-winners`,
  );
};

export const fetchStudiosWithWinCount = () => {
  return axios.get<{ studios: StudioWin[] }>(
    `${API_BASE_URL}?projection=studios-with-win-count`,
  );
};

export const fetchMaxMinWinIntervalForProducers = () => {
  return axios.get<MaxMinIntervalResponse>(
    `${API_BASE_URL}?projection=max-min-win-interval-for-producers`,
  );
};

export const fetchMovieWinnersByYear = (year: number) => {
  return axios.get<Movie[]>(
    `${API_BASE_URL}?winner=true&year=${year}`,
  );
};

export const fetchMovies = ({
  page,
  size,
  winner,
  year,
}: FetchMoviesParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (winner !== undefined) {
    params.append("winner", winner.toString());
  }
  if (year) {
    params.append("year", year.toString());
  }

  return axios.get<PagedMoviesResponse>(`${API_BASE_URL}?${params.toString()}`);
};