import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Centralized API request function
const makeApiRequest = async (params) => {
    try {
        const response = await axios.get(BASE_URL+"/movie/fetch", { params });
        return response.data;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

// Function to fetch adventure movies
export const fetchAdventureMovies = async () => {
    return await makeApiRequest({ action: "adventure" });
};

// Function to fetch all movie genres
export const fetchAllMovieGenres = async () => {
    return await makeApiRequest({ action: "allGenreList" });
};

// Function to fetch all TV genres
export const fetchAllTVGenres = async () => {
    return await makeApiRequest({ action: "allGenreListTV" });
};

// Function to fetch detailed information for a specific item
export const fetchDetails = async (type, id, append = null) => {
    return await makeApiRequest({
        action: "details",
        type,
        id,
        append: true,
    });
};

// Function to fetch user reviews for a specific item
export const fetchReviews = async (type, id) => {
    return await makeApiRequest({
        action: "reviews",
        type,
        id,
    });
};

// Function to perform a search query for the specified type
export const searchMedia = async (type, query) => {
    return await makeApiRequest({
        action: "search",
        type,
        query,
    });
};

// Function to fetch a list of items for the specified type and category
export const fetchItemsByCategory = async (type, category) => {
    return await makeApiRequest({
        type,
        category,
    });
};

const url = `${BASE_URL}/movie/moviestatus`;

export const getMoviesByStatus = async (userId) => {
    try {
        const response = await axios.get(`${url}`, {
            params: { id: userId },
        });
        return response.data; // Contains { watching, watched, toWatch }
    } catch (error) {
        console.error("Error fetching movies by status:", error);
        throw error;
    }
};

export const upsertMovieStatus = async (userId, movieId, status) => {
    try {
        console.log(userId, movieId, status);
        const response = await axios.post(`${url}`, {
            userId,
            movieId,
            status,
        });
        return response.data; // Contains the result of the upsert operation
    } catch (error) {
        console.error("Error updating movie status:", error);
        throw error;
    }
};

const url2 = `${BASE_URL}/tv/tvstatus`;

export const getTvSeriesByStatus = async (userId) => {
    try {
        const response = await axios.get(`${url2}`, {
            params: { id: userId },
        });

        return response.data; // Contains { watching, watched, toWatch }
    } catch (error) {
        console.error("Error fetching movies by status:", error);
        throw error;
    }
};

export const upsertTVStatus = async (userId, seriesId, status) => {
    try {
        console.log(userId, seriesId, status);
        const response = await axios.post(`${url2}`, {
            userId,
            seriesId,
            status,
        });
        return response.data; // Contains the result of the upsert operation
    } catch (error) {
        console.error("Error updating movie status:", error);
        throw error;
    }
};
