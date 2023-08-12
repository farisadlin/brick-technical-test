import { fetchApiData } from "./config";

export const fetchSearchGithubData = async (endpoint, query, page, dispatch) => {
  const searchEndpoint = '/search'
  return fetchApiData(`${searchEndpoint}/${endpoint}?q=${query}&page=${page}`, dispatch);
};