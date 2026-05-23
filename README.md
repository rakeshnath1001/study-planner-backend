# Study Planner Backend

A Node.js/Express backend that generates AI-powered study plans using Google's Gemini API.

## Features

- **Health Check API:** Verify if the server is running.
- **AI Study Plan Generation:** Uses the `@google/genai` SDK and the `gemini-2.5-flash` model to generate structured, day-by-day study plans based on a specified goal and timeframe.

## Prerequisites

- Node.js (v18+ recommended)
- A Google Gemini API Key

## Installation

1. Clone the repository and navigate to the backend directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

## Running the Server

To start the server for development:

```bash
npm run dev
```

The server will be available at `http://localhost:<PORT>`.

## API Endpoints

### 1. Health Check
- **URL:** `/api/health`
- **Method:** `GET`
- **Response:**
  ```json
  { "status": "ok" }
  ```

### 2. Hello World
- **URL:** `/api/hello`
- **Method:** `GET`
- **Response:**
  ```json
  { "message": "Hello from backend", "time": "2026-05-23T10:00:00.000Z" }
  ```

### 3. Generate Study Plan
Generates a day-by-day study schedule using Gemini 2.5 Flash.
- **URL:** `/api/ai/generate-plan`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "goal": "Learn React",
    "startDate": "2026-06-01",
    "endDate": "2026-06-07"
  }
  ```
- **Response (Success):** JSON array of study topics.
  ```json
  [
    {
      "date": "2026-06-01",
      "title": "Introduction to React and JSX",
      "duration": 60
    },
    ...
  ]
  ```
