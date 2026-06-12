# Location Intelligence - Frontend

This is the frontend component of the Location Intelligence application. It provides an intuitive, dynamic, and visually appealing map interface to help users evaluate the accessibility and convenience of specific locations in New Zealand.

## Features

- **Interactive Map:** Powered by React Leaflet, offering a sleek geographical overview centered natively on New Zealand.
- **Location Search:** Search for any address to instantly see nearby facilities, public transport, schools, and healthcare options.
- **Location Scoring:** View computed overall and category-specific scores (Transport, Education, Healthcare) to evaluate location convenience.
- **Premium UI:** Designed using Tailwind CSS with glassmorphism touches and carefully selected brand colors for a modern aesthetic.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Mapping:** React Leaflet & Leaflet
- **Icons:** Lucide React

## Setup & Execution

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Type Checking & Building
```bash
npm run build
```
*Note: Ensure `import type` is used when importing TypeScript interfaces or types (due to `verbatimModuleSyntax` being enabled in `tsconfig`).*
