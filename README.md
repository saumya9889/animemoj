# AnimeFlix 🎬

A full-stack anime streaming website built with Next.js, featuring a Netflix-like dark theme and integration with GogoAnime and Zoro APIs via Consumet API.

## ✨ Features

- **🎬 Homepage**: Trending and popular anime with hero banner
- **🔍 Search**: Search anime across multiple databases (GogoAnime & Zoro)
- **📺 Anime Details**: Comprehensive anime information and episode lists
- **▶️ Video Player**: Stream episodes with quality selection
- **📚 Watchlist**: Save and manage your favorite anime locally
- **🏷️ Genres**: Browse anime by different genres
- **📱 Responsive**: Mobile-first design that works on all devices
- **🌙 Dark Theme**: Netflix-inspired dark color scheme

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Data Fetching**: SWR for caching and state management
- **APIs**: Consumet API (GogoAnime & Zoro)
- **Storage**: LocalStorage for watchlist
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
animeflix/
├── src/
│   ├── app/
│   │   ├── (homepage)
│   │   ├── anime/[id]/ (anime detail)
│   │   ├── watch/[id]/ (video player)
│   │   ├── search/ (search page)
│   │   ├── watchlist/ (user watchlist)
│   │   └── genres/ (genre browsing)
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── HeroBanner.js
│   │   ├── AnimeCard.js
│   │   ├── AnimeGrid.js
│   │   └── Player.js
│   └── lib/
│       ├── api.js (API functions)
│       └── watchlist.js (localStorage utilities)
├── public/
└── package.json
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd animeflix
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 API Integration

The app integrates with the [Consumet API](https://api.consumet.org) to fetch anime data from:

- **GogoAnime**: Popular anime database
- **Zoro**: Alternative anime source

### Example API Endpoints

```javascript
// Get popular anime
GET https://api.consumet.org/anime/gogoanime/popular

// Get anime info
GET https://api.consumet.org/anime/gogoanime/info/{id}

// Get episode streaming
GET https://api.consumet.org/anime/gogoanime/watch/{episodeId}

// Search anime
GET https://api.consumet.org/anime/gogoanime/{query}
```

## 🎯 Key Components

### Navbar

- Fixed navigation with scroll effects
- Watchlist counter
- Responsive mobile menu

### HeroBanner

- Featured anime showcase
- Netflix-style hero section
- Quick action buttons

### AnimeCard

- Hover effects and animations
- Watchlist integration
- Responsive image handling

### Video Player

- Multiple quality options
- Source switching (GogoAnime/Zoro)
- Responsive video controls

## 📱 Responsive Design

- **Mobile-first approach**
- **Grid layouts** that adapt to screen size
- **Touch-friendly** interactions
- **Optimized images** with Next.js Image component

## 🎨 Styling

- **TailwindCSS** for utility-first styling
- **Dark theme** inspired by Netflix
- **Smooth animations** and transitions
- **Custom color palette** with Netflix red (#E50914)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Customization

### Adding New APIs

1. **Update `src/lib/api.js`**
2. **Add new API functions**
3. **Integrate with components**

### Styling Changes

1. **Modify `tailwind.config.js`**
2. **Update component classes**
3. **Add custom CSS in `globals.css`**

## 📊 Performance Features

- **SWR caching** for API responses
- **Image optimization** with Next.js
- **Lazy loading** for better performance
- **Responsive images** with proper sizing

## 🛡️ Error Handling

- **Graceful fallbacks** for missing data
- **User-friendly error messages**
- **Loading states** for better UX
- **API error handling**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Consumet API](https://api.consumet.org) for anime data
- [Next.js](https://nextjs.org) for the amazing framework
- [TailwindCSS](https://tailwindcss.com) for styling utilities
- [SWR](https://swr.vercel.app) for data fetching

## 📞 Support

If you have any questions or need help:

- **Create an issue** on GitHub
- **Check the documentation**
- **Review the code examples**

---

**Happy Anime Watching! 🎉**
