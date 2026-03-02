# Hotel App

A hotel booking platform built with React, TypeScript, and Supabase. Users can browse hotels, manage favorites, and create reservations. The UI is in French.

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** (build tool + dev server)
- **React Router 7** (client-side routing)
- **Tailwind CSS 3** (styling)
- **Supabase 2** (PostgreSQL backend + authentication)
- **TanStack React Query 5** (server state & caching)
- **React DatePicker** (reservation date selection)
- **React Responsive Modal** (booking/confirmation dialogs)

## Features

- **Authentication** — Sign up, login, logout with Supabase Auth. Protected routes for authenticated users.
- **Hotel Browsing** — Infinite scroll catalog (9 hotels per page) with ratings, pricing, and amenities.
- **Search & Filter** — Search by name/location and filter by country.
- **Favorites** — Add/remove hotels from favorites. Dedicated favorites page.
- **Reservations** — Create, view, and cancel reservations with a date picker.

## Project Structure

```
src/
├── components/       # Reusable UI components (HotelCard, NavBar, SearchBar, modals, etc.)
├── pages/            # Page components (Home, Login, SignUp, Favorites, MyReservations, HotelDetails/)
├── context/          # AuthContext + SearchContext providers
├── queries/          # React Query hooks (hotels, reservations, favorites, search)
├── services/         # Supabase client initialization
├── types/            # TypeScript interfaces (Hotel, Reservation, Favorite)
├── utils/            # Validators (email, password) with French error messages
├── data/             # Mock hotel data (20 hotels) and countries list
└── test/             # Vitest setup with mocked Supabase
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with `hotels`, `reservations`, `favorites`, and `users` tables

### Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key
```

3. Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest test suite |
| `npm run coverage` | Generate test coverage report |
| `npm run preview` | Preview production build locally |

## Testing

Tests use **Vitest** + **React Testing Library** with a JSDOM environment and a mocked Supabase client.

- 16 test files covering components and pages
- Run all tests: `npm run test`
- Generate coverage: `npm run coverage`

## Password Requirements

When signing up, passwords must meet:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (`!@#$%^?&*`)
