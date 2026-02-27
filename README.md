# CalGen

A small webapp for generating printable monthly calendar PDFs.

## Features

- Select any month and year
- Choose week start day (Sunday or Monday)
- Live calendar preview that updates in real-time
- Download clean, printable US Letter landscape PDFs
- Each day cell includes ruled lines for handwritten notes

## Tech Stack

- **Frontend**: Svelte 5 + Vite
- **Backend**: Node.js + Express
- **PDF generation**: PDFKit

## Getting Started

### Prerequisites

- Node.js 20+

### Install dependencies

```bash
npm run install:all
```

### Run both servers

```bash
npm run dev
```

This starts the backend API on `http://localhost:3001` and the frontend on `http://localhost:5173`. Open the frontend URL in your browser.

### Run individually

```bash
npm run dev:backend   # API server only
npm run dev:frontend  # Frontend dev server only
```

### API

```
GET /api/calendar?year=2026&month=2&startDay=sunday
```

Query parameters:
- `year` (required) — e.g. `2026`
- `month` (required) — 1-12
- `startDay` (optional) — `sunday` (default) or `monday`

Returns a PDF file download.

## Running Tests

```bash
npm test
```

## Project Structure

```
calgen/
  backend/
    src/
      app.js              # Express app setup
      server.js            # Server entry point
      routes/calendar.js   # API route
      services/pdfGenerator.js  # PDF generation logic
  frontend/
    src/
      App.svelte           # Main app component
      components/
        DatePicker.svelte
        WeekStartPicker.svelte
        CalendarPreview.svelte
        DownloadButton.svelte
  docs/
    000-overall-design.md  # Design spec
```
