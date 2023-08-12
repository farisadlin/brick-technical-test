import { FETCH_GITHUB_DATA_FAILED, FETCH_GITHUB_DATA_LOADING, FETCH_GITHUB_DATA_SUCCESS } from "./actionTypes";

export const fetchSearchGithubDataSuccess = (data) => ({
    type: FETCH_GITHUB_DATA_SUCCESS,
    payload: data,
});

export const fetchSearchGithubDataLoading = () => ({
    type: FETCH_GITHUB_DATA_LOADING,
});

export const fetchSearchGithubDataFailed = (error) => ({
    type: FETCH_GITHUB_DATA_FAILED,
    payload: error,
});