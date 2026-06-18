# Kitch n Break — React prototype

This is a minimal React (Vite) prototype implementing the provided wireframes: home, recipe list, recipe details, create recipe, and login pages.

It now includes Firebase integration (Auth, Firestore, Storage). The `src/firebase.js` file contains the configuration and exports `auth`, `db`, `storage`, and `analytics`.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Pages and features:
- Home (`/`) — loads recipes from Firestore.
- Recipe details (`/recipe/:id`) — shows recipe details and uploaded image.
- Create recipe (`/create`) — upload an image and save recipe to Firestore.
- Login (`/login`) — sign in / register with email & password using Firebase Auth.

Files of interest:
- [src/firebase.js](src/firebase.js)
- [src/services/recipes.js](src/services/recipes.js)
- [src/pages/CreateRecipe.jsx](src/pages/CreateRecipe.jsx)

Next steps you can ask for:
- Add categories, filters, and search.
- Improve mobile styling to match your exact wireframes.
- Add user-specific favorites and authorization rules.

## Deploy to Vercel

This project is Vite + React and is ready for deployment to Vercel.

Quick steps:

1. Commit and push your repository to GitHub (or connect your Git provider to Vercel).

2. In the Vercel Dashboard, click "New Project" → Import Git Repository → choose this repo.

3. Set the build settings (Vercel usually detects them automatically):

	- Build command: `npm run build`
	- Output directory: `dist`

4. Add the Firebase environment variables in the Vercel Project Settings → Environment Variables. Use the following names:

	- `VITE_FIREBASE_API_KEY`
	- `VITE_FIREBASE_AUTH_DOMAIN`
	- `VITE_FIREBASE_PROJECT_ID`
	- `VITE_FIREBASE_STORAGE_BUCKET`
	- `VITE_FIREBASE_MESSAGING_SENDER_ID`
	- `VITE_FIREBASE_APP_ID`
	- `VITE_FIREBASE_MEASUREMENT_ID` (optional)

	If you don't set them, the values compiled into `src/firebase.js` will be used as a fallback (useful for quick demos).

5. Deploy. Vercel will run `npm install` and `npm run build` and publish the `dist` folder.

Notes:

- SPA routing: `vercel.json` is included to route all requests to `index.html` so client-side routing works.
- If you want automatic seeded content in Firestore, either enable the database in Firebase console or provide a Service Account and run the seeder from a trusted environment (not from client-side).


