const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
// For educational purposes only - DO NOT USE in production
// Request your own key for free: https://developers.themoviedb.org/3
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

// DOM Elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

// State
let currentQuery = "";
let isLoading = false;

// Utility Functions
const getClassByRate = (vote) => {
  if (vote >= 7.5) return "high";
  else if (vote >= 6) return "medium";
  else return "low";
};

const showLoading = () => {
  if (isLoading) return;
  isLoading = true;
  loading.style.display = "flex";
  errorMessage.style.display = "none";
  main.innerHTML = "";
};

const hideLoading = () => {
  isLoading = false;
  loading.style.display = "none";
};

const showError = (message) => {
  hideLoading();
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  main.innerHTML = "";
};

const showNoResults = (query) => {
  hideLoading();
  main.innerHTML = `
    <div class="no-results">
      <h3>No movies found</h3>
      <p>Sorry, we couldn't find any movies matching "${query}". Try a different search term.</p>
    </div>
  `;
};

const createMovieCard = (movie) => {
  const { title, poster_path, vote_average, overview, release_date } = movie;
  const year = release_date ? new Date(release_date).getFullYear() : '';
  
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.setAttribute("tabindex", "0");
  movieElement.setAttribute("role", "button");
  movieElement.setAttribute("aria-label", `View details for ${title}`);
  
  // Create poster element
  const posterElement = poster_path 
    ? `<img src="${IMG_PATH + poster_path}" alt="${title} poster" class="movie-poster" loading="lazy" />`
    : `<div class="movie-poster-placeholder">
         <div>
           <div>No Image</div>
           <div>Available</div>
         </div>
       </div>`;
  
  movieElement.innerHTML = `
    ${posterElement}
    <div class="movie-content">
      <div class="movie-header">
        <h3 class="movie-title">${title}${year ? ` (${year})` : ''}</h3>
        <span class="movie-rating ${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
      </div>
    </div>
    <div class="movie-overview">
      <h4>Overview</h4>
      <p>${overview || 'No overview available for this movie.'}</p>
    </div>
  `;
  
  // Add keyboard support
  movieElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Could add modal functionality here in future
      console.log(`Selected movie: ${title}`);
    }
  });
  
  return movieElement;
};

const showMovies = (movies) => {
  hideLoading();
  
  if (!movies || movies.length === 0) {
    if (currentQuery) {
      showNoResults(currentQuery);
    } else {
      showError("No movies to display");
    }
    return;
  }
  
  main.innerHTML = "";
  const fragment = document.createDocumentFragment();
  
  movies.forEach((movie) => {
    if (movie.poster_path || movie.title) { // Only show movies with at least a title
      fragment.appendChild(createMovieCard(movie));
    }
  });
  
  main.appendChild(fragment);
};

// Mock data for demonstration when API is not available
const mockMovies = [
  {
    title: "The Shawshank Redemption",
    poster_path: null,
    vote_average: 9.3,
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    release_date: "1994-09-23"
  },
  {
    title: "The Godfather",
    poster_path: null,
    vote_average: 9.2,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    release_date: "1972-03-24"
  },
  {
    title: "The Dark Knight",
    poster_path: null,
    vote_average: 9.0,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    release_date: "2008-07-18"
  },
  {
    title: "Pulp Fiction",
    poster_path: null,
    vote_average: 8.9,
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    release_date: "1994-10-14"
  },
  {
    title: "Forrest Gump",
    poster_path: null,
    vote_average: 8.8,
    overview: "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.",
    release_date: "1994-07-06"
  },
  {
    title: "Inception",
    poster_path: null,
    vote_average: 8.7,
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    release_date: "2010-07-16"
  }
];

const getMovies = async (url, query = "") => {
  if (isLoading) return;
  
  try {
    showLoading();
    currentQuery = query;
    
    // Try to fetch from API first
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movies (${res.status})`);
    }
    
    const data = await res.json();
    
    if (data.results) {
      showMovies(data.results);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    
    // Fallback to mock data for demonstration
    if (!query) {
      console.log("Using mock data for demonstration");
      setTimeout(() => {
        showMovies(mockMovies);
      }, 500); // Simulate loading delay
    } else {
      // Filter mock data for search
      const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => {
        showMovies(filteredMovies);
      }, 500);
    }
  }
};

// Debounce function for search
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Initialize app
const init = () => {
  getMovies(API_URL);
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  
  if (searchTerm) {
    getMovies(SEARCH_API + encodeURIComponent(searchTerm), searchTerm);
  } else {
    getMovies(API_URL);
    currentQuery = "";
  }
});

// Add real-time search with debouncing
const debouncedSearch = debounce((searchTerm) => {
  if (searchTerm.length >= 2) {
    getMovies(SEARCH_API + encodeURIComponent(searchTerm), searchTerm);
  } else if (searchTerm.length === 0) {
    getMovies(API_URL);
    currentQuery = "";
  }
}, 300);

search.addEventListener("input", (e) => {
  debouncedSearch(e.target.value.trim());
});

// Clear search on Escape key
search.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    search.value = "";
    getMovies(API_URL);
    currentQuery = "";
    search.blur();
  }
});

// Initialize the app
init();