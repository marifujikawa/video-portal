# Video Portal

A modern web application for streaming videos, built with Next.js. The platform features categorized video content, live streaming capabilities, and personalized playlists.

## Features

- Video categorization and filtering
- Live streaming section
- Continue watching functionality
- Personal watchlist
- Responsive video player
- Horizontal scrolling video carousels

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A local or remote video API server

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:marifujikawa/video-portal.git
cd video-portal
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. To run the tests:
```bash
npm run test
```

## API Integration

The application expects the following API endpoints:

- `GET /videos` - Fetch all videos with pagination
- `GET /videos/:id` - Fetch single video details
- `PATCH /videos/:id/increment/likes` - Update video likes
- `GET /videos?title_contains=keyword` - Filter videos by title


