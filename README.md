# Podeo Media Player

A responsive web application that functions as both a media player and a management dashboard for shareable links. This application features white-labeling capabilities, authenticated routing, and a clean, user-friendly interface.

## Overview

The Podeo Media Player is a Next.js application that allows users to:

- Play media files via URL parameters
- Create and manage shareable media links
- Customize the application appearance through white-labeling
- Access protected routes with authentication

The application consists of two main components:

1. **Media Player**: A public-facing component that plays media based on URL parameters
2. **Dashboard**: An authenticated section for creating and managing shareable media links

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/yourusername/podeo-media-player.git
cd podeo-media-player
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if using the backend)
cd ../backend
npm install
```

3. Start the development server:

```bash
# For the frontend
cd frontend
npm run dev

# For the backend (in a separate terminal)
cd backend
npm run dev
```

4. Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## White-Labeling Configuration

The application supports theme customization through a white-labeling feature. You can easily switch between themes to change the look and feel of the application.

### Available Themes

- **Light Theme**: The default theme with a light color scheme
- **Dark Theme**: An alternative theme with a dark color scheme

### How to Switch Themes

There are two ways to change the theme:

1. **Through the Dashboard UI**:

   - Log in to the dashboard
   - Use the theme selector dropdown in the top navigation bar

2. **Programmatically**:
   - The application uses the `ThemeContext` to manage themes
   - Themes are stored in `localStorage` for persistence
   - CSS variables are used for theming, defined in `public/themes/[theme-name]/variables.css`

### Adding Custom Themes

To create a new theme:

1. Create a new directory in `public/themes/` with your theme name
2. Create a `variables.css` file in that directory with CSS variables
3. Update the theme selector in the dashboard to include your new theme

## Authentication

The application uses a simple authentication system with JWT tokens.

### Credentials

- **Username**: admin
- **Password**: password

### Authentication Flow

1. User enters credentials on the login page
2. The credentials are validated
3. Upon successful authentication, a JWT token is generated and stored in localStorage
4. Protected routes check for the presence of this token
5. The token is included in API requests as an Authorization header

### Protected Routes

- `/dashboard`: The main dashboard for managing media links

## Shareable Links

The application allows users to create and manage shareable media links.

### Creating Shareable Links

1. Log in to the dashboard
2. Fill out the form with:
   - MP3 URL (required)
   - Image URL (optional)
   - Track Name (required)
3. Submit the form
4. A shareable link is generated and copied to your clipboard automatically

### Link Format

Shareable links follow this format:

```
http://localhost3000.com/?mp3Url=[encoded-mp3-url]&imageUrl=[encoded-image-url]&name=[encoded-track-name]
```

### Managing Links

- All created links are displayed in a table in the dashboard
- Each link has options to:
  - Play: Opens the media player with the link parameters
  - Copy: Copies the shareable link to clipboard
  - Delete: Removes the link from the list

### Storage

- Links are stored in the browser's localStorage for demo purposes
- In a production environment, links would be stored in a database

## Architecture and Design Decisions

### Technology Stack

- **Frontend**: Next.js with React

  - Server-side rendering for improved SEO and performance
  - App Router for simplified routing and layouts
  - Client components for interactive elements

- **Styling**: CSS with variables for theming
  - Simple, clean CSS organization
  - CSS variables for dynamic theming
  - Responsive design for all screen sizes

### Design Patterns

- **Context API**: Used for global state management (authentication and theming)
- **Component-Based Architecture**: Modular components for better maintainability
- **Responsive Design**: Flexible layouts that adapt to different screen sizes
- **White-Labeling**: Theme configuration via CSS variables and context
