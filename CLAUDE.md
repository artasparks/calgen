# CalGen

A small webapp for generating printable monthly calendar PDFs.

## Tech Stack

- **Frontend**: Svelte + Vite (`frontend/`)
- **Backend**: Node.js + Express (`backend/`)
- **PDF generation**: pdfkit

## Project Structure

- `docs/` - Design specs and decisions
- `frontend/` - Svelte app
- `backend/` - Express API server
- `.claude/skills/` - Shared Claude Code skills

## Design Docs

See `docs/000-overall-design.md` for the full architecture and feature decisions.

## Guidelines

### Branching and PRs

- Never push directly to `main`. All changes must go through a feature branch and pull request.
- Create a descriptive branch name (e.g. `feature/calendar-preview`, `fix/pdf-layout`).
- PRs require review before merging.

### Before opening a PR

- Run all tests locally and ensure they pass
- Run the linter and fix any issues
- Verify the README is up-to-date if your changes affect setup, usage, or architecture

### Do not check in

- **Binaries** - No compiled binaries, PDFs, images, or other binary blobs. Use `.gitignore` to exclude build output.
- **Secrets** - No API keys, credentials, `.env` files, or tokens. Use environment variables and document required vars in the README.
