# Mají Otevřeno? 🇨🇿

A Czech mobile web application that helps users determine if shops are open on public holidays.

## Overview

**Mají Otevřeno?** (Are They Open?) provides real-time information about Czech public holidays and their impact on shop opening hours. The app features a clean, mobile-first interface with two main screens:

- **Today Screen**: Current day holiday status with visual indicators
- **Calendar Screen**: Interactive calendar showing all Czech public holidays

## Features

- ✅ Real-time holiday detection for current date
- 📅 Interactive calendar with holiday highlighting  
- 🏪 Shop category status (supermarkets, pharmacies, gas stations, etc.)
- 🔄 Dynamic Easter calculation using Jean Meeus algorithm
- 📱 Mobile-optimized responsive design
- 🌐 Complete Czech localization
- ⚡ Fast performance with localStorage caching
- 🔍 SEO optimized with structured data

## Technology Stack

- **Angular 20** with standalone components
- **TypeScript 5.8** with strict mode
- **SCSS** for styling with CSS custom properties
- **PWA** capabilities with web manifest
- **Karma + Jasmine** for testing

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
ng serve

# Build for production
npm run build

# Run tests
npm test
```

## Architecture

### Core Services
- **HolidayService**: Main holiday operations interface
- **HolidayGeneratorService**: Dynamic holiday generation for any year
- **EasterCalculatorService**: Astronomical Easter calculation (Jean Meeus algorithm)
- **MetaService**: Dynamic page title and meta tag management
- **TimeService**: Date/time utilities and Czech formatting

### Data Models
- Complete Czech public holiday coverage (13 holidays including Easter)
- Shop categories with holiday behavior rules
- Timezone-safe date handling

## Development Story

This application was created as a demonstration of [Claude Code](https://claude.ai/code) capabilities. The entire project - from initial idea to production-ready application - was developed through collaborative sessions with Claude Code in **less than 8 hours** total development time.

### Time Breakdown
- **Session 1** (70 min): Initial setup, wireframing, Angular scaffolding
- **Session 2** (60 min): Core services and data models
- **Session 3** (60 min): UI components and navigation
- **Session 4** (70 min): Styling and time handling
- **Session 5** (60 min): Holiday logic refinements
- **Session 6** (60 min): Easter calculation and testing
- **Session 7** (60 min): SEO optimizations

## Deployment

The app is designed for deployment as a static site with the following requirements:
- Serve `index.html` for all routes (SPA routing)
- Ensure `robots.txt` and `sitemap.xml` are accessible
- Configure proper MIME types for assets

## License

This project is open source and available under the MIT License.