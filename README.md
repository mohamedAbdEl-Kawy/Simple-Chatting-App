# Chatting App

A simple Node.js and Socket.IO chat application built with Express.

## Features

- Real-time messaging using `socket.io`
- Simple Express server
- Browser-based UI served from `views/index.html`

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

### Development

```bash
npm run dev
```

## Build and Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/nodejs-deploy.yml`.

The workflow:

- installs dependencies
- runs the build step
- runs test verification
- deploys to Heroku on pushes to `main`

### Required GitHub Secrets

Configure these repository secrets before deployment:

- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

## Deployment Link

Once deployed, update this section with your live app URL.

Example:

`https://your-chat-app.herokuapp.com`

## Notes

- Use `npm run dev` if you want a local development server with auto-reload (requires `nodemon`).
- The repository is configured to ignore `node_modules`, environment files, and common temporary files.
