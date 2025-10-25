# 🍳 Premium Recipes - World-Class Recipe Discovery App

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes

## 📦 Tech Stack

### Core Technologies
- **React 19** - Latest React with modern hooks and features
- **Redux Toolkit** - State management with modern best practices
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API requests

### UI & Styling
- **TailwindCSS** - Utility-first CSS framework with custom configuration
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon library
- **Custom Fonts** - Inter & Poppins for premium typography

### API
- **Edamam Recipe API** - Comprehensive recipe database with nutrition data

## 🎨 Design System

### Color Palette
- **Primary**: Red gradient (#ef4444 → #dc2626)
- **Accent**: Orange gradient (#f97316 → #ea580c)
- **Neutral**: Sophisticated grayscale for light/dark modes
- **Semantic colors** for success, error, warning states

### Typography
- **Display**: Poppins (headings, hero text)
- **Body**: Inter (all content, UI elements)

### Components
All components follow a consistent design language:
- Glass morphism effects with backdrop blur
- Luxury shadows for depth and hierarchy
- Smooth transitions and micro-interactions
- Responsive scaling and touch-friendly targets

## 📁 Project Structure

```
recipe-app/
├── public/                  # Static files
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Modal.js
│   │   │   ├── Toast.js
│   │   │   ├── Rating.js
│   │   │   ├── LoadingSkeleton.js
│   │   │   └── Onboarding.js
│   │   ├── Navigation/     # App navigation
│   │   ├── SearchBar/      # Advanced search & filters
│   │   ├── RecipeCard/     # Recipe card variants
│   │   ├── RecipeDetails/  # Detailed recipe modal
│   │   ├── RecipeList/     # Recipe grid/list
│   │   └── Favorites/      # Favorites page
│   ├── context/
│   │   └── ThemeContext.js # Dark/light theme provider
│   ├── redux/
│   │   ├── store.js        # Redux store configuration
│   │   └── recipeSlice.js  # Recipe state management
│   ├── App.js              # Main app component
│   └── styles.css          # Global styles & Tailwind
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies & scripts
```

## 🎯 Available Scripts

### Development
```bash
npm start          # Start development server on port 3000
npm test           # Run test suite
npm run build      # Create production build
```

### Production Build
```bash
npm run build      # Optimized production build
```
The build is optimized for best performance:
- Minified code
- Code splitting
- Asset optimization
- Source maps for debugging

## 🌟 Key Features Deep Dive

### Theme System
- Automatic system preference detection
- Smooth transitions between themes
- Persistent theme selection in localStorage
- Custom TailwindCSS dark mode classes

### State Management
- Redux Toolkit for efficient state updates
- LocalStorage persistence for favorites and ratings
- Debounced API calls for performance
- Optimistic UI updates

### Performance
- Lazy loading with code splitting
- Debounced search and filter inputs
- Memoized sorted recipe lists
- Optimized re-renders with React.memo

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management in modals
- High contrast color ratios
- Screen reader friendly

## 🔧 Configuration

### API Keys
The app uses the Edamam Recipe API. The API keys are already configured in the code for demo purposes. For production use, move them to environment variables:

1. Create a `.env` file in the root directory
2. Add your API credentials:
   ```
   REACT_APP_EDAMAM_APP_ID=your_app_id
   REACT_APP_EDAMAM_APP_KEY=your_app_key
   ```

### Customization
- **Colors**: Edit `tailwind.config.js` to customize the color palette
- **Fonts**: Update Google Fonts import in `src/styles.css`
- **API**: Modify `RecipeList.js` to use different recipe sources

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing
This is a premium demonstration project showcasing modern React development practices and world-class UX design.

## 📄 License
This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments
- **Edamam** for the comprehensive recipe API
- **TailwindCSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

---

**Built with ❤️ and attention to detail for a million-dollar user experience.**
