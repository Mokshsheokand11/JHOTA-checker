Jhota Checker

Jhota Checker is a fun AI-powered web application that analyzes a user's physical strength, lifestyle, and personality traits to determine whether they qualify as a “Jhota” — a slang term for a heavily built, strong, dominant young man.

The app uses Google Gemini API to generate a Jhota Score and provide personalized feedback.

 Features

 Physical strength evaluation

 Personality analysis

 Jhota Score (0–100)

 Categorization:

0–40 → Not a Jhota

41–70 → Semi Jhota

71–100 → Certified Jhota

 Personalized improvement plan (if needed)

 30-Day Jhota Challenge recommendations

 Tech Stack

Frontend: HTML / CSS / JavaScript / React

Backend: Node.js 

AI Integration: Google Gemini API

Environment: Localhost Development


## Run Locally

> The API key is now kept on a simple Node.js server so it isn’t embedded
> in the browser. This prevents accidental exposure when you build for
> production.

**Prerequisites:** Node.js (v18+ recommended)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file at the project root with the following variable:
   ```dotenv
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   _(you can also keep a copy in `VITE_GEMINI_API_KEY` during development, but
   the client won't use it anymore – only the server reads it.)_
3. Start the development servers. You can run them in two terminals:
   ```bash
   npm run dev:server   # starts express backend on port 4000
   npm run dev         # starts Vite frontend on port 3000
   ```
   or use `npm run dev:all` to launch both together (requires `concurrently`).

4. Open `http://localhost:3000` in your browser and submit the form;
   the request will be proxied through `/api/jhota`.


### Production build

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Start the server (it will serve the static files automatically):
   ```bash
   npm run start
   ```
