import { fetchApiData } from "./config";

export const fetchSearchGithubData = async (endpoint, query, page) => {
  const searchEndpoint = '/search'
  return fetchApiData(`${searchEndpoint}/${endpoint}?q=${query}&page=${page}`);
};