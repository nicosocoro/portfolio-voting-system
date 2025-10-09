# Portfolio - Voting system

A lightweight and modern web app to create and share online votes or polls.

This project is designed as a `portfolio` piece to showcase full-stack engineering skills, from frontend development to backend API design and infrastructure setup.

# 🚀 Project Overview

The Voting System allows users to create votes with multiple options, share a public link, and collect responses from participants.

## Design and infrastructure

- Static frontend
   - Built with Vue.js + TypeScript, deployed as a static website.

- Backend API
   - Node.js + TypeScript REST API.
   - PostgreSQL database for persistence.

- Monitoring
   - TODO: Define

## MVP Features

- Create a new vote
   - Provide a title, list of options, and an optional end date.
   - The backend returns a unique URL for sharing the vote.

- Vote on an existing poll
   - Access the shared link and choose one of the available options.
   - IP-based restriction: users can only vote once per poll (no authentication required).

- View results (basic)
   - Display current results after voting.
   - No real-time updates — results are refreshed only when reloading the page.

