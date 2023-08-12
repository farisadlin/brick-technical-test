import { PAGE_LIMIT } from "@/constants";
import { fetchSearchGithubDataFailed } from "@/redux/actions/githubDataAction";

const BASE_URL = import.meta.env.VITE_BASE_URL

const apiConfig = {
    headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    },
};

export const fetchApiData = async (endpoint, dispatch) => {
    const response = await fetch(`${BASE_URL}${endpoint}&per_page=${PAGE_LIMIT}`, {
        headers: {
            ...apiConfig.headers,
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}`,
        },
    });
    
    if (!response.ok) {
        const errorMessage = await response.json()
        console.error(response)
        alert(errorMessage.message) // didn't have enough time to move this into ErrorPage
        await dispatch(fetchSearchGithubDataFailed({errorMessage: errorMessage, errorStatus: response.status, isError: !response.ok}))
        return response.message
    } else {
        return response.json();
    }

};
