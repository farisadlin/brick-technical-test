import { PAGE_LIMIT } from "@/constants";

/* eslint-disable no-useless-catch */
const BASE_URL = import.meta.env.VITE_BASE_URL

const apiConfig = {
    headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    },
};

export const fetchApiData = async endpoint => {
    const response = await fetch(`${BASE_URL}${endpoint}&per_page=${PAGE_LIMIT}`, {
        headers: {
            ...apiConfig.headers,
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    return response.json();
};
