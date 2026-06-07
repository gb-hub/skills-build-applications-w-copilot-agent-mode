# OctoFit Tracker - Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Setup

### Prerequisites

- Node.js LTS
- npm

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and set the required variable:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

**Note:** If `VITE_CODESPACE_NAME` is not set, the app will default to `http://localhost:8000` for development.

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Architecture

### Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** react-router-dom v7
- **Styling:** Bootstrap 5

### API Integration

The frontend communicates with the backend API at:

```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/
```

For development, it falls back to:

```
http://localhost:8000/api/
```

#### API Helper Functions (`src/utils/api.js`)

- `getApiBaseUrl()` - Get the base API URL with fallback
- `getApiUrl(path)` - Build a full API endpoint URL
- `fetchData(endpoint)` - Fetch data from an endpoint (handles paginated and array responses)
- `createData(endpoint, payload)` - POST request to create data
- `updateData(endpoint, payload)` - PUT request to update data
- `deleteData(endpoint)` - DELETE request to remove data

### Components

#### Pages

- **Home** (`src/App.jsx`) - Landing page with feature overview
- **About** (`src/App.jsx`) - Application information
- **Activities** (`src/components/Activities.jsx`) - Log and view activities
- **Workouts** (`src/components/Workouts.jsx`) - Browse available workouts
- **Leaderboard** (`src/components/Leaderboard.jsx`) - Competitive rankings
- **Teams** (`src/components/Teams.jsx`) - Team management
- **Users** (`src/components/Users.jsx`) - User directory

#### Features

All components include:

- Loading states
- Error handling
- Data fetching with error recovery
- Bootstrap styling
- Responsive design

### Responsive Navigation

The navbar automatically adapts to mobile screens with a toggle button. All components are responsive and work on devices of all sizes.

## API Endpoints

The frontend expects the following endpoints on the backend:

- `GET /api/activities/` - List activities (paginated or array)
- `POST /api/activities/` - Create activity
- `GET /api/workouts/` - List workouts
- `POST /api/workouts/` - Create workout
- `GET /api/leaderboard/` - Get leaderboard rankings
- `GET /api/teams/` - List teams
- `POST /api/teams/` - Create team
- `GET /api/users/` - List users
- `POST /api/users/` - Create user

## Development Notes

### Handling Different Response Formats

The `fetchData()` helper automatically handles:

- Paginated responses with `{ results: [...] }`
- Direct array responses `[...]`
- Single object responses `{ ... }`

### Environment Variables

Vite exposes environment variables through `import.meta.env`. Variables prefixed with `VITE_` are automatically included in the client bundle.

```javascript
// Example usage
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
```

### Debugging API Calls

Open the browser console to see:

- API URLs being called
- Error messages if requests fail
- Warnings if environment variables are not set

## Troubleshooting

### "VITE_CODESPACE_NAME is not defined" warning

This is expected in development. The app will use the localhost fallback. To set it, create `.env.local` and restart the dev server.

### API requests failing with 404 or CORS errors

- Ensure the backend is running on port 8000
- Verify `VITE_CODESPACE_NAME` is set correctly
- Check that backend endpoints are implemented and responding

### HMR not working

Restart the dev server if you make changes to environment variables or configuration files.

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [react-router-dom Documentation](https://reactrouter.com/)
- [Bootstrap Documentation](https://getbootstrap.com/)
