# Development Guide

## Getting Started

### Local Development
1. Clone the repository
2. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   # or
   php -S localhost:8000
   ```
3. Open http://localhost:8000 in your browser

### Development Mode
The app includes a development mode that provides mock data when the API is unavailable:
- Set `APP_CONFIG.DEVELOPMENT_MODE = true` in `script.js`
- Mock data will be used automatically when API calls fail
- Useful for offline development and testing

## File Structure
```
web/
├── index.html          # Main HTML file with semantic structure
├── style.css           # Enterprise-grade CSS with design system
├── script.js           # Modern JavaScript with class-based architecture  
├── mock-data.js        # Mock data for development
└── README.md          # Documentation
```

## Design System Usage

### CSS Custom Properties
Use the design system tokens for consistent styling:

```css
/* Colors */
background: var(--primary-600);
color: var(--neutral-100);

/* Spacing */
padding: var(--space-4) var(--space-6);
margin-bottom: var(--space-8);

/* Typography */
font-size: var(--font-size-lg);
font-weight: var(--font-weight-semibold);

/* Shadows */
box-shadow: var(--shadow-lg);

/* Transitions */
transition: all var(--transition-base);
```

### Component Classes
Key CSS classes for components:

- `.movie` - Movie card container
- `.movie-info` - Movie metadata section
- `.rating` - Rating badge with color variants
- `.search` - Search input component
- `.loading-state` - Loading indicator
- `.empty-state` - Empty/error state container

## JavaScript Architecture

### Adding New Features
1. Create utility functions in the `Utils` object
2. Add API methods to the `MovieService` class
3. Update the `AppState` class for new state properties
4. Extend `MovieRenderer` for new UI components
5. Add event handlers in `MovieApp` class

### Example: Adding a new component
```javascript
// 1. Add to Utils if needed
Utils.formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// 2. Update MovieRenderer
static createMovieElement(movie, index) {
  // Add new elements to the template
}

// 3. Update AppState if needed
constructor() {
  this.selectedMovie = null;
  // other state...
}
```

## Testing
- Test responsive design on different screen sizes
- Verify keyboard navigation works
- Check color contrast with browser tools
- Test with screen readers
- Validate HTML structure
- Test error states and loading states

## Deployment
The app is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Just ensure the API key is properly configured for production use.

## API Configuration
To use with a real API:
1. Get a free API key from [The Movie Database](https://developers.themoviedb.org/3)
2. Replace the API key in `APP_CONFIG.API_KEY`
3. Set `APP_CONFIG.DEVELOPMENT_MODE = false`
4. Test API connectivity

## Browser DevTools Tips
- Use the Elements panel to inspect CSS custom properties
- Check the Console for development mode messages
- Use the Network tab to monitor API calls
- Test responsive design with device simulation
- Use Lighthouse for performance and accessibility audits