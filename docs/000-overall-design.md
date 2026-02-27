# 000 - Overall Design: CalGen

## Overview

CalGen is a small webapp that generates printable monthly calendar views as downloadable PDFs.

## User Flow

1. User opens the webapp
2. User selects a month and year using a date picker
3. User chooses week start day (Sunday default, or Monday)
4. A live calendar preview updates in real-time as selections change
5. User clicks "Download PDF"
6. A PDF of the selected month's calendar is generated and downloaded

## Architecture

### Frontend (Svelte)

- **Framework**: Svelte (using Vite as the build tool)
- **Components**:
  - `App.svelte` - Main layout
  - `DatePicker.svelte` - Month/year selector (dropdown or native date input, constrained to month granularity)
  - `WeekStartPicker.svelte` - Toggle/dropdown to choose week start day (Sunday or Monday, defaults to Sunday)
  - `DownloadButton.svelte` - Triggers PDF generation and download
  - `CalendarPreview.svelte` - Live preview of the calendar that updates in real-time

### Backend (Node.js)

- **Framework**: Express
- **PDF Generation**: `pdfkit` (or similar library)
- **API Endpoint**:
  - `GET /api/calendar?year=2026&month=2&startDay=sunday` - Returns a PDF file as a download

### PDF Layout

- Page size: US Letter (8.5" x 11"), landscape orientation
- Title: "February 2026" (month name + year)
- 7-column grid: column headers adjust based on chosen start day
  - Sunday start: Sun | Mon | Tue | Wed | Thu | Fri | Sat
  - Monday start: Mon | Tue | Wed | Thu | Fri | Sat | Sun
- Each day cell shows the day number at the top
- Each day cell includes lined space for ~2 lines of handwritten notes
- Cells for days outside the current month are left empty
- Clean, minimal styling suitable for printing

## Tech Stack

| Layer    | Technology       |
|----------|-----------------|
| Frontend | Svelte + Vite   |
| Backend  | Node.js + Express |
| PDF      | pdfkit          |

## Project Structure

```
calgen/
  docs/
    000-overall-design.md
  frontend/
    src/
      App.svelte
      components/
        DatePicker.svelte
        DownloadButton.svelte
        WeekStartPicker.svelte
        CalendarPreview.svelte
      main.js
    index.html
    package.json
    vite.config.js
  backend/
    src/
      server.js
      routes/
        calendar.js
      services/
        pdfGenerator.js
    package.json
  README.md
```

## Decisions

- **Live preview**: Yes - CalendarPreview renders in the browser and updates as the user changes month/year/start day
- **Week start day**: Defaults to Sunday; user can switch to Monday via a picker
- **Notes space**: Each day cell includes room for ~2 lines of handwritten notes (light ruled lines in the PDF)
- **User login**: No authentication for v1. The app is stateless — no user data to persist. Auth could be revisited if features like saved calendars or custom events are added later.
