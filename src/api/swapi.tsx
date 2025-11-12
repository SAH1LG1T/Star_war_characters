import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SWAPI_BASE_URL,
  timeout: 8000,
});

export interface HomeworldDetails {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  homeworld: string;
  films: string[];
  species: string[];
  created: string;
  url: string;
  eye_color:string;
}


export const getPeople = async ({page ,search}:{page: number ; search : string}) => {
  console.log(search)
  const query = search ? `search=${search}` : `page=${page}`;
  const response = await api.get(`/people?${query}`);
  // const response = await api.get(`/people?page=${page}?search=${search}`);
  return response.data;
};
