// Comprehensive Movie Categories for Recommendation Website UI
// This data structure provides organized categories for filtering and discovering movies

const MOVIE_CATEGORIES = {
  genre: {
    title: "Genre",
    type: "multiple",
    options: [
      { id: 28, name: "Action", value: "action" },
      { id: 12, name: "Adventure", value: "adventure" },
      { id: 16, name: "Animation", value: "animation" },
      { id: 35, name: "Comedy", value: "comedy" },
      { id: 80, name: "Crime", value: "crime" },
      { id: 99, name: "Documentary", value: "documentary" },
      { id: 18, name: "Drama", value: "drama" },
      { id: 10751, name: "Family", value: "family" },
      { id: 14, name: "Fantasy", value: "fantasy" },
      { id: 36, name: "History", value: "history" },
      { id: 27, name: "Horror", value: "horror" },
      { id: 10402, name: "Music", value: "music" },
      { id: 9648, name: "Mystery", value: "mystery" },
      { id: 10749, name: "Romance", value: "romance" },
      { id: 878, name: "Science Fiction", value: "sci-fi" },
      { id: 10770, name: "TV Movie", value: "tv-movie" },
      { id: 53, name: "Thriller", value: "thriller" },
      { id: 10752, name: "War", value: "war" },
      { id: 37, name: "Western", value: "western" }
    ]
  },

  language: {
    title: "Language",
    type: "single",
    options: [
      { code: "en", name: "English", value: "english" },
      { code: "hi", name: "Hindi", value: "hindi" },
      { code: "es", name: "Spanish", value: "spanish" },
      { code: "fr", name: "French", value: "french" },
      { code: "de", name: "German", value: "german" },
      { code: "it", name: "Italian", value: "italian" },
      { code: "ja", name: "Japanese", value: "japanese" },
      { code: "ko", name: "Korean", value: "korean" },
      { code: "zh", name: "Chinese", value: "chinese" },
      { code: "ru", name: "Russian", value: "russian" },
      { code: "pt", name: "Portuguese", value: "portuguese" },
      { code: "ar", name: "Arabic", value: "arabic" },
      { code: "th", name: "Thai", value: "thai" },
      { code: "tr", name: "Turkish", value: "turkish" },
      { code: "pl", name: "Polish", value: "polish" }
    ]
  },

  releaseYear: {
    title: "Release Year / Decade",
    type: "single",
    options: [
      { name: "2020s (2020-2024)", value: "2020s", yearRange: [2020, 2024] },
      { name: "2010s (2010-2019)", value: "2010s", yearRange: [2010, 2019] },
      { name: "2000s (2000-2009)", value: "2000s", yearRange: [2000, 2009] },
      { name: "1990s (1990-1999)", value: "1990s", yearRange: [1990, 1999] },
      { name: "1980s (1980-1989)", value: "1980s", yearRange: [1980, 1989] },
      { name: "1970s (1970-1979)", value: "1970s", yearRange: [1970, 1979] },
      { name: "1960s (1960-1969)", value: "1960s", yearRange: [1960, 1969] },
      { name: "1950s (1950-1959)", value: "1950s", yearRange: [1950, 1959] },
      { name: "Classic (Before 1950)", value: "classic", yearRange: [1900, 1949] }
    ]
  },

  country: {
    title: "Country / Region",
    type: "single", 
    options: [
      { code: "US", name: "Hollywood (USA)", value: "hollywood" },
      { code: "IN", name: "Bollywood (India)", value: "bollywood" },
      { code: "KR", name: "Korean Cinema", value: "korean" },
      { code: "JP", name: "Japanese Cinema", value: "japanese" },
      { code: "CN", name: "Chinese Cinema", value: "chinese" },
      { code: "FR", name: "French Cinema", value: "french" },
      { code: "GB", name: "British Cinema", value: "british" },
      { code: "DE", name: "German Cinema", value: "german" },
      { code: "IT", name: "Italian Cinema", value: "italian" },
      { code: "ES", name: "Spanish Cinema", value: "spanish" },
      { code: "RU", name: "Russian Cinema", value: "russian" },
      { code: "BR", name: "Brazilian Cinema", value: "brazilian" },
      { code: "MX", name: "Mexican Cinema", value: "mexican" },
      { code: "CA", name: "Canadian Cinema", value: "canadian" },
      { code: "AU", name: "Australian Cinema", value: "australian" }
    ]
  },

  audienceType: {
    title: "Audience Type",
    type: "single",
    options: [
      { name: "Family Friendly", value: "family", certification: ["G", "PG"] },
      { name: "Kids & Children", value: "kids", certification: ["G"] },
      { name: "Teens", value: "teens", certification: ["PG-13"] },
      { name: "Young Adults", value: "young-adults", certification: ["PG-13", "R"] },
      { name: "Adults", value: "adults", certification: ["R", "NC-17"] },
      { name: "All Ages", value: "all-ages", certification: ["G", "PG", "PG-13"] },
      { name: "Mature Audiences", value: "mature", certification: ["R", "NC-17"] }
    ]
  },

  movieFormat: {
    title: "Movie Format",
    type: "multiple",
    options: [
      { name: "2D Standard", value: "2d" },
      { name: "3D", value: "3d" },
      { name: "IMAX", value: "imax" },
      { name: "Animation", value: "animation" },
      { name: "Stop Motion", value: "stop-motion" },
      { name: "CGI/Computer Animation", value: "cgi" },
      { name: "Live Action", value: "live-action" },
      { name: "Mixed Media", value: "mixed-media" },
      { name: "Black & White", value: "black-white" },
      { name: "Silent Film", value: "silent" },
      { name: "Documentary Style", value: "documentary" },
      { name: "Found Footage", value: "found-footage" }
    ]
  },

  platform: {
    title: "Platform / Availability",
    type: "multiple",
    options: [
      { name: "Netflix", value: "netflix", provider_id: 8 },
      { name: "Amazon Prime Video", value: "amazon-prime", provider_id: 9 },
      { name: "Disney+", value: "disney-plus", provider_id: 337 },
      { name: "HBO Max", value: "hbo-max", provider_id: 384 },
      { name: "Hulu", value: "hulu", provider_id: 15 },
      { name: "Apple TV+", value: "apple-tv", provider_id: 350 },
      { name: "Paramount+", value: "paramount-plus", provider_id: 531 },
      { name: "YouTube Premium", value: "youtube-premium", provider_id: 188 },
      { name: "Peacock", value: "peacock", provider_id: 386 },
      { name: "Theatres / Cinema", value: "theatres" },
      { name: "VOD (Video on Demand)", value: "vod" },
      { name: "Free with Ads", value: "free-ads" },
      { name: "Rental", value: "rental" },
      { name: "Purchase", value: "purchase" }
    ]
  },

  ratings: {
    title: "Critic & User Ratings",
    type: "multiple",
    options: [
      { name: "IMDB 9.0+ (Exceptional)", value: "imdb-9-plus", range: [9.0, 10.0] },
      { name: "IMDB 8.0+ (Excellent)", value: "imdb-8-plus", range: [8.0, 10.0] },
      { name: "IMDB 7.0+ (Good)", value: "imdb-7-plus", range: [7.0, 10.0] },
      { name: "IMDB 6.0+ (Above Average)", value: "imdb-6-plus", range: [6.0, 10.0] },
      { name: "Rotten Tomatoes Certified Fresh (75%+)", value: "rt-certified-fresh" },
      { name: "Rotten Tomatoes Fresh (60%+)", value: "rt-fresh" },
      { name: "Metacritic 80+ (Universal Acclaim)", value: "metacritic-80-plus" },
      { name: "Metacritic 60+ (Generally Favorable)", value: "metacritic-60-plus" },
      { name: "Critics Choice Awards Winner", value: "critics-choice" },
      { name: "Popular on TMDB", value: "tmdb-popular" },
      { name: "Top Rated on TMDB", value: "tmdb-top-rated" }
    ]
  },

  awards: {
    title: "Award-Winning",
    type: "multiple",
    options: [
      { name: "Oscar Winners (Academy Awards)", value: "oscar-winner" },
      { name: "Oscar Nominated", value: "oscar-nominated" },
      { name: "Golden Globe Winners", value: "golden-globe-winner" },
      { name: "Cannes Film Festival Winners", value: "cannes-winner" },
      { name: "Cannes Film Festival Selections", value: "cannes-selection" },
      { name: "Venice Film Festival Winners", value: "venice-winner" },
      { name: "Berlin Film Festival Winners", value: "berlin-winner" },
      { name: "BAFTA Winners", value: "bafta-winner" },
      { name: "SAG Awards Winners", value: "sag-winner" },
      { name: "Critics Choice Awards Winners", value: "critics-choice-winner" },
      { name: "Sundance Film Festival Winners", value: "sundance-winner" },
      { name: "Toronto Film Festival Selections", value: "tiff-selection" },
      { name: "Emmy Awards (TV Movies)", value: "emmy-winner" },
      { name: "National Film Registry", value: "nfr-selection" }
    ]
  },

  mood: {
    title: "Mood / Theme Based",
    type: "multiple",
    options: [
      { name: "Feel-Good / Uplifting", value: "feel-good" },
      { name: "Heartwarming", value: "heartwarming" },
      { name: "Inspirational", value: "inspirational" },
      { name: "Dark & Gritty", value: "dark-gritty" },
      { name: "Mind-Bending", value: "mind-bending" },
      { name: "Edge-of-Your-Seat Thriller", value: "edge-seat-thriller" },
      { name: "Romantic", value: "romantic" },
      { name: "Coming of Age", value: "coming-of-age" },
      { name: "Based on True Story", value: "true-story" },
      { name: "Historical", value: "historical" },
      { name: "Biographical", value: "biographical" },
      { name: "Dystopian", value: "dystopian" },
      { name: "Post-Apocalyptic", value: "post-apocalyptic" },
      { name: "Time Travel", value: "time-travel" },
      { name: "Superhero", value: "superhero" },
      { name: "Cult Classic", value: "cult-classic" },
      { name: "Art House", value: "art-house" },
      { name: "Experimental", value: "experimental" },
      { name: "Nostalgic", value: "nostalgic" },
      { name: "Social Commentary", value: "social-commentary" }
    ]
  },

  director: {
    title: "Director / Actor Based",
    type: "multiple",
    options: [
      // Directors
      { name: "Christopher Nolan Films", value: "christopher-nolan", type: "director", person_id: 525 },
      { name: "Martin Scorsese Films", value: "martin-scorsese", type: "director", person_id: 1032 },
      { name: "Quentin Tarantino Films", value: "quentin-tarantino", type: "director", person_id: 138 },
      { name: "Steven Spielberg Films", value: "steven-spielberg", type: "director", person_id: 488 },
      { name: "Alfred Hitchcock Films", value: "alfred-hitchcock", type: "director", person_id: 2636 },
      { name: "Akira Kurosawa Films", value: "akira-kurosawa", type: "director", person_id: 5026 },
      { name: "Stanley Kubrick Films", value: "stanley-kubrick", type: "director", person_id: 240 },
      { name: "David Fincher Films", value: "david-fincher", type: "director", person_id: 7467 },
      { name: "Coen Brothers Films", value: "coen-brothers", type: "director" },
      { name: "Denis Villeneuve Films", value: "denis-villeneuve", type: "director", person_id: 51329 },
      
      // Popular International Actors
      { name: "Shah Rukh Khan Movies", value: "shah-rukh-khan", type: "actor", person_id: 51576 },
      { name: "Amitabh Bachchan Movies", value: "amitabh-bachchan", type: "actor", person_id: 34490 },
      { name: "Aamir Khan Movies", value: "aamir-khan", type: "actor", person_id: 93210 },
      { name: "Salman Khan Movies", value: "salman-khan", type: "actor", person_id: 93148 },
      
      // Hollywood Stars
      { name: "Leonardo DiCaprio Movies", value: "leonardo-dicaprio", type: "actor", person_id: 6193 },
      { name: "Tom Hanks Movies", value: "tom-hanks", type: "actor", person_id: 31 },
      { name: "Meryl Streep Movies", value: "meryl-streep", type: "actor", person_id: 5064 },
      { name: "Robert De Niro Movies", value: "robert-de-niro", type: "actor", person_id: 380 },
      { name: "Al Pacino Movies", value: "al-pacino", type: "actor", person_id: 1158 },
      { name: "Denzel Washington Movies", value: "denzel-washington", type: "actor", person_id: 5292 },
      { name: "Will Smith Movies", value: "will-smith", type: "actor", person_id: 2888 },
      { name: "Brad Pitt Movies", value: "brad-pitt", type: "actor", person_id: 287 },
      { name: "Angelina Jolie Movies", value: "angelina-jolie", type: "actor", person_id: 11701 },
      { name: "Scarlett Johansson Movies", value: "scarlett-johansson", type: "actor", person_id: 1245 }
    ]
  },

  runtime: {
    title: "Runtime",
    type: "single",
    options: [
      { name: "Short Films (Under 30 min)", value: "short", range: [0, 30] },
      { name: "Feature Length (30-90 min)", value: "feature-short", range: [30, 90] },
      { name: "Standard (90-120 min)", value: "standard", range: [90, 120] },
      { name: "Extended (120-150 min)", value: "extended", range: [120, 150] },
      { name: "Epic Length (150-180 min)", value: "epic", range: [150, 180] },
      { name: "Marathon (180+ min)", value: "marathon", range: [180, 999] },
      { name: "Quick Watch (Under 90 min)", value: "quick", range: [0, 90] },
      { name: "Evening Watch (90-150 min)", value: "evening", range: [90, 150] },
      { name: "Commitment Watch (150+ min)", value: "commitment", range: [150, 999] }
    ]
  },

  franchise: {
    title: "Franchise / Series",
    type: "multiple",
    options: [
      // Marvel Universe
      { name: "Marvel Cinematic Universe (MCU)", value: "mcu", collection_ids: [86311, 131295, 131296, 131297] },
      { name: "X-Men Universe", value: "x-men", collection_ids: [748, 453993] },
      { name: "Spider-Man Films", value: "spider-man", collection_ids: [556, 531241, 573436] },
      
      // DC Universe
      { name: "DC Extended Universe", value: "dceu", collection_ids: [948485] },
      { name: "Batman Films", value: "batman", collection_ids: [120794, 263, 948485] },
      { name: "Superman Films", value: "superman", collection_ids: [8537] },
      
      // Fantasy & Adventure
      { name: "Harry Potter Universe", value: "harry-potter", collection_ids: [1241, 435259] },
      { name: "Lord of the Rings / Hobbit", value: "lotr-hobbit", collection_ids: [119, 121938] },
      { name: "Star Wars Saga", value: "star-wars", collection_ids: [10] },
      { name: "Indiana Jones", value: "indiana-jones", collection_ids: [84] },
      { name: "Jurassic Park/World", value: "jurassic", collection_ids: [328, 495527] },
      
      // Action Franchises
      { name: "Fast & Furious", value: "fast-furious", collection_ids: [9485, 688042] },
      { name: "Mission: Impossible", value: "mission-impossible", collection_ids: [87359] },
      { name: "John Wick", value: "john-wick", collection_ids: [404609] },
      { name: "James Bond (007)", value: "james-bond", collection_ids: [645] },
      { name: "Die Hard", value: "die-hard", collection_ids: [1570] },
      { name: "Terminator", value: "terminator", collection_ids: [528] },
      { name: "Alien", value: "alien", collection_ids: [8091, 135416] },
      { name: "Predator", value: "predator", collection_ids: [399] },
      
      // Horror Franchises
      { name: "Halloween", value: "halloween", collection_ids: [91361, 126209] },
      { name: "Friday the 13th", value: "friday-13th", collection_ids: [9735] },
      { name: "A Nightmare on Elm Street", value: "nightmare-elm-street", collection_ids: [8581] },
      { name: "Saw", value: "saw", collection_ids: [656] },
      { name: "Scream", value: "scream", collection_ids: [2602] },
      { name: "The Conjuring Universe", value: "conjuring", collection_ids: [313086] },
      
      // Animation
      { name: "Pixar Films", value: "pixar" },
      { name: "Disney Animated Classics", value: "disney-animated" },
      { name: "Toy Story", value: "toy-story", collection_ids: [10194] },
      { name: "Shrek", value: "shrek", collection_ids: [2150] },
      { name: "Ice Age", value: "ice-age", collection_ids: [8354] },
      { name: "How to Train Your Dragon", value: "httyd", collection_ids: [89137] },
      
      // Other Popular Franchises
      { name: "Rocky / Creed", value: "rocky-creed", collection_ids: [1575, 553717] },
      { name: "Planet of the Apes", value: "planet-apes", collection_ids: [173710] },
      { name: "Transformers", value: "transformers", collection_ids: [8650] },
      { name: "Pirates of the Caribbean", value: "pirates-caribbean", collection_ids: [295] },
      { name: "The Matrix", value: "matrix", collection_ids: [2344] },
      { name: "Back to the Future", value: "back-future", collection_ids: [264] }
    ]
  }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOVIE_CATEGORIES;
}