# Tenpo Challenge

A modern React application built with TypeScript, Vite, and React Router for authentication and user management.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Query
- **Routing:** React Router v7
- **UI Components:** Radix UI
- **HTTP Client:** Axios
- **Code Quality:** ESLint, Prettier

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── constants/      # Application constants
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── lib/          # Utility functions
├── pages/        # Page components
├── services/     # API services
├── types/        # TypeScript type definitions
├── App.tsx       # Main application component
├── main.tsx      # Application entry point
└── index.css     # Global styles
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/CarLeonDev/tenpo_challenge
   cd tenpo_challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

> To login, email: test@test.com pass: test

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Infinite Scroll Table Solution

Combines React Query (`useInfiniteQuery`) for paginated/cached data fetching and `react-virtual` for row virtualization, rendering only visible content.

Features responsive design, dynamic row sizing, overscan optimization, debounced loading, and TypeScript type safety to handle large datasets efficiently with minimal DOM impact.

## Proposal for API call improvement

### Optimize Data Fetching

The current implementation fetches 100 items at a time (`PERSON_FETCH_SIZE = 100`)
We could implement a dynamic fetch size based on user's screen size and resolution

### Implement Data Prefetching:

Since we know the total number of items (`PERSON_TOTAL_COUNT = 2000`), we could refetch the next page of data while the user is viewing the current page.

### Implement Error Handling and Retry Logic

Add exponential backoff for failed requests, implement smart retry logic based on error types and add fallback data when requests fail.

### Backend data limiting and formatting

Return only required fields in API responses or use field query parameters to let client specify needed fields and flatten nested objects when possible.

### Implement JWT

JWT (JSON Web Token) is ideal for security and scalable auth that carries user info and permissions, works across systems without server storage, and expires automatically.