# Video Portal

This is a fullstack video portal application that includes a members area for video listing and playback.

## Project Structure

```
video-portal
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── layout
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── video
│   │   │       ├── VideoList.tsx
│   │   │       ├── VideoPlayer.tsx
│   │   │       └── VideoCard.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── services
│   │   │   ├── auth.ts
│   │   │   └── video.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── controllers
│   │   │   ├── auth.ts
│   │   │   └── video.ts
│   │   ├── routes
│   │   │   ├── auth.ts
│   │   │   └── video.ts
│   │   ├── services
│   │   │   ├── auth.ts
│   │   │   └── video.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd video-portal
   ```

2. **Install dependencies for the client:**
   ```bash
   cd client
   npm install
   ```

3. **Install dependencies for the server:**
   ```bash
   cd ../server
   npm install
   ```

4. **Run the client:**
   ```bash
   cd ../client
   npm start
   ```

5. **Run the server:**
   ```bash
   cd ../server
   npm start
   ```

## Additional Notes

- Ensure that you have Node.js and npm installed on your machine.
- The client application is built with React and TypeScript.
- The server application is built with Node.js and Express.