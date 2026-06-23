# 🧭 CampusCompass

An interactive, premium college search, side-by-side comparison, admission chance predictor, and student discussion forum web application. Designed to simplify higher education counseling for students across Engineering, Management, Medical, and Law streams.

---

## 🚀 Key Features

*   **🔍 Advanced College Catalog & Filter Engine**
    *   Search colleges by name or location dynamically with a custom input debouncing mechanism.
    *   Filter by education streams (Engineering, Management, Medical, Law), ownership type (Public or Private), state, fees budget, and placement packages (LPA).
*   **⚖️ Side-by-Side College Comparator**
    *   Compare up to 3 selected colleges side-by-side on key parameters (fees, placement metrics, established year, location, facilities).
*   **🔮 Admission Chance Predictor**
    *   Input exam ranks (e.g., JEE Mains, CAT, NEET, CLAT) to estimate admission probability based on past institutional cutoffs.
*   **💬 Community Q&A Forums**
    *   Engage with other students and alumni. Post questions, add multi-user responses, and upvote/downvote discussions.
*   **💾 Saved Bookmarks List**
    *   Save preferred colleges to a personalized dashboard for easy access, synced with `localStorage`.
*   **👤 Authentication & Toast System**
    *   Log in and sign up to access features like college bookmarking and posting to discussion boards.
    *   Interactive, timed toast notifications for smooth user feedback.

---

## 🛠️ Technology Stack

*   **Frontend Library:** React 19 (Functional Components & Context API)
*   **Language:** TypeScript (Type-safe interfaces for Colleges, Courses, Forums, and Users)
*   **Build Tool & Dev Server:** Vite 8 (Ultra-fast Hot Module Replacement)
*   **Routing:** React Router DOM v7
*   **Styling:** Vanilla CSS with custom CSS variables (Design Tokens) for glassmorphism, responsive grids, and smooth animations.

---

## 📁 Project Architecture & Structure

```text
src/
├── main.tsx                # Application entry point; mounts React to the DOM
├── App.tsx                 # Core layout wrapper, page routing & global components
├── App.css                 # Global layout-level CSS rules
├── assets/                 # Static visual assets (images, vectors)
│
├── components/             # Reusable shared UI components (Navbar, Footer, Toast)
│
├── context/                # Global State Management (AppContext with localStorage sync)
│
├── data/                   # Data Layer (mockColleges with extensive specifications)
│
├── hooks/                  # Custom utility hooks (useDebounce for search inputs)
│
├── pages/                  # Main views/routes of the application
│   ├── Home.tsx            # Landing page with hero banner & feature highlights
│   ├── Explore.tsx         # College directory with advanced filters
│   ├── Detail.tsx          # College profile (courses, reviews, cutoffs, facilities)
│   ├── Compare.tsx         # Columnar college comparison matrix
│   ├── Predictor.tsx       # Rank/Exam-based college admission probability predictor
│   ├── Discussions.tsx     # Forum board with threads and voting
│   ├── Saved.tsx           # Bookmarked colleges dashboard
│   └── Login.tsx           # Session authentication page
│
└── styles/                 # Global styles and design variables (variables.css)
```

---

## ⚙️ Setup and Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 2. Run the Development Server
Start the local server with hot reloading enabled:
```bash
npm run dev
```
By default, the server will open on:
👉 **[http://localhost:5173/](http://localhost:5173/)**

### 3. Build for Production
To build the application for deployment, run:
```bash
npm run build
```
This produces a highly optimized bundle inside the `dist/` directory.

---

## 🎨 Theme & Customization
Global design variables are located in `src/styles/variables.css`. You can customize colors, spacing, shadow gradients, or typography tokens to modify the entire theme of the website instantly.
