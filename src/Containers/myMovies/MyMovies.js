import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { fetchDetails } from "../../Api/movieApi";
import AuthContext  from "../../Context/AuthContext"; 
import "./myMovies.css";

const MyMovies = () => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [galleryMovies, setGalleryMovies] = useState([]);
    const [activeCategory, setActiveCategory] = useState("To Watch");
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchingMovies, setWatchingMovies] = useState([]);
    const [toWatchMovies, setToWatchMovies] = useState([]);
    const { movieStat } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch movies based on IDs in movieStat
    const fetchMoviesByCategory = async (ids) => {
        try {
            const movieDetails = await Promise.all(
                ids.map((id) => fetchDetails("movie", id))
            );
            return movieDetails;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            return [];
        }
    };

    // Fetch all movies when movieStat changes
    useEffect(() => {
        if (movieStat) {
            const fetchAllMovies = async () => {
                const [watched, watching, toWatch] = await Promise.all([
                    fetchMoviesByCategory(movieStat.watched),
                    fetchMoviesByCategory(movieStat.watching),
                    fetchMoviesByCategory(movieStat.toWatch),
                ]);
                setWatchedMovies(watched);
                setWatchingMovies(watching);
                setToWatchMovies(toWatch);

                // Set default category movies
                setGalleryMovies(toWatch); // Default to "To Watch"
            };

            fetchAllMovies();
        }
    }, [movieStat]);

    // Handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        if (category === "To Watch") setGalleryMovies(toWatchMovies);
        if (category === "Watching") setGalleryMovies(watchingMovies);
        if (category === "Watched") setGalleryMovies(watchedMovies);
    };

    return (
        <div>
            <div className="content__movie">
                <Navbar />
                <div className="movie-categories">
                    {["To Watch", "Watching", "Watched"].map((category) => (
                        <div
                            key={category}
                            className={
                                activeCategory === category
                                    ? "movie-categories_category-active"
                                    : "movie-categories_category"
                            }
                            onClick={() => handleCategoryChange(category)}
                        >
                            <p>{category}</p>
                            <div
                                className={
                                    activeCategory === category
                                        ? "category-line-active"
                                        : "category-line"
                                }
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="white-line"></div>

                <div className="movie-list">
                    {galleryMovies.length > 0 ? (
                        galleryMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="movie-list__movie"
                                onClick={() => navigate(`/movieTrailer/${movie.id}`)}
                            >
                                <img
                                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="movie-title">{movie.title}</div>
                                <div className="movie-info">
                                    <p>{movie.release_date}</p>
                                    <span>{movie.vote_average}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No movies in this category</p>
                    )}
                </div>
                <div className="white-line"></div>
            </div>
            <div className="movie-footer">
                <Footer />
            </div>
        </div>
    );
};

export default MyMovies;
