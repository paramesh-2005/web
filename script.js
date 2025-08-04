// Movie Discovery App - Enterprise Grade JavaScript Architecture
const APP_CONFIG = {
  API_KEY: "3fd2be6f0c70a2a598f084ddfb75487c",
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w1280",
  ENDPOINTS: {
    POPULAR: "discover/movie?sort_by=popularity.desc",
    SEARCH: "search/movie"
  },
  DEVELOPMENT_MODE: true // Enable mock data when API fails
};

// Mock data for development
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    vote_average: 8.8,
    overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable."
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 9.0,
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets."
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    vote_average: 8.6,
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    vote_average: 8.9,
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper."
  },
  {
    id: 5,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    vote_average: 8.7,
    overview: "Set in the 22nd century, The Matrix tells the story of a computer programmer who is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix."
  },
  {
    id: 6,
    title: "Goodfellas",
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    vote_average: 8.7,
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate."
  }
];

// State Management
class AppState {
  constructor() {
    this.isLoading = false;
    this.currentQuery = '';
    this.movies = [];
    this.error = null;
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.updateUI();
  }

  setMovies(movies) {
    this.movies = movies;
    this.error = null;
    this.updateUI();
  }

  setError(error) {
    this.error = error;
    this.movies = [];
    this.updateUI();
  }

  updateUI() {
    MovieRenderer.render(this);
  }
}

// Utility Functions
const Utils = {
  getClassByRate(vote) {
    if (vote >= 7.5) return "green";
    if (vote >= 7) return "orange";
    return "red";
  },

  formatRating(rating) {
    return rating ? rating.toFixed(1) : 'N/A';
  },

  truncateText(text, maxLength = 150) {
    if (!text) return 'No overview available.';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// API Service
class MovieService {
  static async fetchMovies(endpoint, params = {}) {
    try {
      const urlParams = new URLSearchParams({
        api_key: APP_CONFIG.API_KEY,
        page: 1,
        ...params
      });
      
      const url = `${APP_CONFIG.BASE_URL}/${endpoint}?${urlParams}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback to mock data in development mode
      if (APP_CONFIG.DEVELOPMENT_MODE) {
        console.log('Falling back to mock data');
        return this.getMockData(endpoint, params);
      }
      
      throw new Error('Failed to fetch movies. Please try again later.');
    }
  }

  static getMockData(endpoint, params = {}) {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        if (params.query) {
          // Filter mock data for search
          const filtered = MOCK_MOVIES.filter(movie => 
            movie.title.toLowerCase().includes(params.query.toLowerCase())
          );
          resolve(filtered);
        } else {
          // Return all mock movies for popular
          resolve(MOCK_MOVIES);
        }
      }, 500);
    });
  }

  static async getPopularMovies() {
    return this.fetchMovies(APP_CONFIG.ENDPOINTS.POPULAR);
  }

  static async searchMovies(query) {
    if (!query.trim()) {
      throw new Error('Search query cannot be empty');
    }
    return this.fetchMovies(APP_CONFIG.ENDPOINTS.SEARCH, { query: query.trim() });
  }
}

// UI Rendering
class MovieRenderer {
  static render(state) {
    const main = document.getElementById("main");
    
    if (state.isLoading) {
      this.renderLoading(main);
      return;
    }

    if (state.error) {
      this.renderError(main, state.error);
      return;
    }

    if (state.movies.length === 0) {
      this.renderEmptyState(main, state.currentQuery);
      return;
    }

    this.renderMovies(main, state.movies);
  }

  static renderLoading(container) {
    container.innerHTML = `
      <div class="loading-state">
        <div aria-live="polite">Loading movies...</div>
      </div>
    `;
  }

  static renderError(container, error) {
    container.innerHTML = `
      <div class="empty-state" role="alert">
        <h3>Oops! Something went wrong</h3>
        <p>${error}</p>
      </div>
    `;
  }

  static renderEmptyState(container, query) {
    const message = query 
      ? `No movies found for "${query}". Try a different search term.`
      : 'No movies to display.';
    
    container.innerHTML = `
      <div class="empty-state">
        <h3>No Results</h3>
        <p>${message}</p>
      </div>
    `;
  }

  static renderMovies(container, movies) {
    container.innerHTML = "";
    
    movies.forEach((movie, index) => {
      const movieElement = this.createMovieElement(movie, index);
      container.appendChild(movieElement);
    });
  }

  static createMovieElement(movie, index) {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("article");
    movieElement.classList.add("movie");
    movieElement.setAttribute("tabindex", "0");
    movieElement.setAttribute("role", "button");
    movieElement.setAttribute("aria-label", `View details for ${title}`);
    
    const imageUrl = poster_path 
      ? `${APP_CONFIG.IMAGE_BASE_URL}${poster_path}`
      : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
    
    movieElement.innerHTML = `
      <img
        src="${imageUrl}"
        alt="${title} movie poster"
        loading="${index < 6 ? 'eager' : 'lazy'}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="rating ${Utils.getClassByRate(vote_average)}" 
              aria-label="Rating: ${Utils.formatRating(vote_average)} out of 10">
          ⭐ ${Utils.formatRating(vote_average)}
        </span>
      </div>
      <div class="overview" role="region" aria-label="Movie overview">
        <h3>Overview</h3>
        <p>${Utils.truncateText(overview)}</p>
      </div>
    `;

    // Add keyboard navigation
    movieElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        movieElement.classList.toggle('overview-visible');
      }
    });

    return movieElement;
  }
}

// Application Controller
class MovieApp {
  constructor() {
    this.state = new AppState();
    this.initializeElements();
    this.bindEvents();
    this.loadInitialData();
  }

  initializeElements() {
    this.form = document.getElementById("form");
    this.searchInput = document.getElementById("search");
  }

  bindEvents() {
    // Debounced search to improve performance
    const debouncedSearch = Utils.debounce((query) => {
      this.handleSearch(query);
    }, 300);

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = this.searchInput.value.trim();
      this.handleSearch(query);
    });

    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      if (query) {
        debouncedSearch(query);
      } else {
        this.loadPopularMovies();
      }
    });

    // Clear search and reload popular movies when input is cleared
    this.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.clearSearch();
      }
    });
  }

  async loadInitialData() {
    await this.loadPopularMovies();
  }

  async loadPopularMovies() {
    try {
      this.state.setLoading(true);
      this.state.currentQuery = '';
      const movies = await MovieService.getPopularMovies();
      this.state.setMovies(movies);
    } catch (error) {
      this.state.setError(error.message);
    } finally {
      this.state.setLoading(false);
    }
  }

  async handleSearch(query) {
    if (!query) {
      this.loadPopularMovies();
      return;
    }

    try {
      this.state.setLoading(true);
      this.state.currentQuery = query;
      const movies = await MovieService.searchMovies(query);
      this.state.setMovies(movies);
    } catch (error) {
      this.state.setError(error.message);
    } finally {
      this.state.setLoading(false);
    }
  }

  clearSearch() {
    this.searchInput.value = '';
    this.loadPopularMovies();
    this.searchInput.focus();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MovieApp();
});