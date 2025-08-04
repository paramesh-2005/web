const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
// For educational purposes only - DO NOT USE in production
// Request your own key for free: https://developers.themoviedb.org/3
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Filter elements
const genreFilter = document.getElementById("genre-filter");
const languageFilter = document.getElementById("language-filter");
const yearFilter = document.getElementById("year-filter");
const ratingFilter = document.getElementById("rating-filter");
const countryFilter = document.getElementById("country-filter");
const audienceFilter = document.getElementById("audience-filter");
const runtimeFilter = document.getElementById("runtime-filter");
const franchiseFilter = document.getElementById("franchise-filter");

const toggleAdvancedBtn = document.getElementById("toggle-advanced");
const advancedFilters = document.getElementById("advanced-filters");
const applyFiltersBtn = document.getElementById("apply-filters");
const clearFiltersBtn = document.getElementById("clear-filters");

// Current filter state
let currentFilters = {
  genre: '',
  language: '',
  year: '',
  rating: '',
  country: '',
  audience: '',
  runtime: '',
  franchise: ''
};

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 7) return "orange";
  else return "red";
};

const showMovies = (movies) => {
  main.innerHTML = "";
  if (!movies || movies.length === 0) {
    main.innerHTML = `
      <div class="no-results">
        <h3>No movies found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    `;
    return;
  }
  
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;
    main.appendChild(movieElement);
  });
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
};

// Initialize filter dropdowns with categories
const initializeFilters = () => {
  // Populate Genre filter
  if (MOVIE_CATEGORIES.genre && MOVIE_CATEGORIES.genre.options) {
    MOVIE_CATEGORIES.genre.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      genreFilter.appendChild(optionElement);
    });
  }

  // Populate Language filter
  if (MOVIE_CATEGORIES.language && MOVIE_CATEGORIES.language.options) {
    MOVIE_CATEGORIES.language.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.code;
      optionElement.textContent = option.name;
      languageFilter.appendChild(optionElement);
    });
  }

  // Populate Year filter
  if (MOVIE_CATEGORIES.releaseYear && MOVIE_CATEGORIES.releaseYear.options) {
    MOVIE_CATEGORIES.releaseYear.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      yearFilter.appendChild(optionElement);
    });
  }

  // Populate Rating filter
  if (MOVIE_CATEGORIES.ratings && MOVIE_CATEGORIES.ratings.options) {
    MOVIE_CATEGORIES.ratings.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      ratingFilter.appendChild(optionElement);
    });
  }

  // Populate Country filter
  if (MOVIE_CATEGORIES.country && MOVIE_CATEGORIES.country.options) {
    MOVIE_CATEGORIES.country.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.code;
      optionElement.textContent = option.name;
      countryFilter.appendChild(optionElement);
    });
  }

  // Populate Audience filter
  if (MOVIE_CATEGORIES.audienceType && MOVIE_CATEGORIES.audienceType.options) {
    MOVIE_CATEGORIES.audienceType.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      audienceFilter.appendChild(optionElement);
    });
  }

  // Populate Runtime filter
  if (MOVIE_CATEGORIES.runtime && MOVIE_CATEGORIES.runtime.options) {
    MOVIE_CATEGORIES.runtime.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      runtimeFilter.appendChild(optionElement);
    });
  }

  // Populate Franchise filter
  if (MOVIE_CATEGORIES.franchise && MOVIE_CATEGORIES.franchise.options) {
    MOVIE_CATEGORIES.franchise.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      franchiseFilter.appendChild(optionElement);
    });
  }
};

// Build filtered API URL
const buildFilteredURL = () => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&sort_by=popularity.desc&page=1`;

  // Add genre filter
  if (currentFilters.genre) {
    url += `&with_genres=${currentFilters.genre}`;
  }

  // Add language filter
  if (currentFilters.language) {
    url += `&with_original_language=${currentFilters.language}`;
  }

  // Add year filter
  if (currentFilters.year && MOVIE_CATEGORIES.releaseYear) {
    const yearOption = MOVIE_CATEGORIES.releaseYear.options.find(opt => opt.value === currentFilters.year);
    if (yearOption && yearOption.yearRange) {
      url += `&primary_release_date.gte=${yearOption.yearRange[0]}-01-01`;
      url += `&primary_release_date.lte=${yearOption.yearRange[1]}-12-31`;
    }
  }

  // Add rating filter
  if (currentFilters.rating) {
    if (currentFilters.rating.includes('imdb-8-plus')) {
      url += `&vote_average.gte=8.0`;
    } else if (currentFilters.rating.includes('imdb-7-plus')) {
      url += `&vote_average.gte=7.0`;
    } else if (currentFilters.rating.includes('imdb-6-plus')) {
      url += `&vote_average.gte=6.0`;
    }
  }

  // Add country filter
  if (currentFilters.country) {
    url += `&with_origin_country=${currentFilters.country}`;
  }

  // Add runtime filter
  if (currentFilters.runtime && MOVIE_CATEGORIES.runtime) {
    const runtimeOption = MOVIE_CATEGORIES.runtime.options.find(opt => opt.value === currentFilters.runtime);
    if (runtimeOption && runtimeOption.range) {
      url += `&with_runtime.gte=${runtimeOption.range[0]}`;
      if (runtimeOption.range[1] < 999) {
        url += `&with_runtime.lte=${runtimeOption.range[1]}`;
      }
    }
  }

  return url;
};

// Apply filters function
const applyFilters = () => {
  // Update current filters
  currentFilters.genre = genreFilter.value;
  currentFilters.language = languageFilter.value;
  currentFilters.year = yearFilter.value;
  currentFilters.rating = ratingFilter.value;
  currentFilters.country = countryFilter.value;
  currentFilters.audience = audienceFilter.value;
  currentFilters.runtime = runtimeFilter.value;
  currentFilters.franchise = franchiseFilter.value;

  // Build and fetch filtered URL
  const filteredURL = buildFilteredURL();
  getMovies(filteredURL);
};

// Clear all filters
const clearFilters = () => {
  genreFilter.value = '';
  languageFilter.value = '';
  yearFilter.value = '';
  ratingFilter.value = '';
  countryFilter.value = '';
  audienceFilter.value = '';
  runtimeFilter.value = '';
  franchiseFilter.value = '';

  currentFilters = {
    genre: '',
    language: '',
    year: '',
    rating: '',
    country: '',
    audience: '',
    runtime: '',
    franchise: ''
  };

  // Load default movies
  getMovies(API_URL);
};

// Toggle advanced filters
const toggleAdvancedFilters = () => {
  const isHidden = advancedFilters.style.display === 'none';
  advancedFilters.style.display = isHidden ? 'block' : 'none';
  toggleAdvancedBtn.textContent = isHidden ? 'Hide Advanced Filters' : 'Show More Filters';
};

// Initialize the application
getMovies(API_URL);
initializeFilters();

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    history.go(0);
  }
});

// Filter event listeners
toggleAdvancedBtn.addEventListener('click', toggleAdvancedFilters);
applyFiltersBtn.addEventListener('click', applyFilters);
clearFiltersBtn.addEventListener('click', clearFilters);

// Quick filter changes (optional - apply on change)
genreFilter.addEventListener('change', applyFilters);
languageFilter.addEventListener('change', applyFilters);
yearFilter.addEventListener('change', applyFilters);
ratingFilter.addEventListener('change', applyFilters);