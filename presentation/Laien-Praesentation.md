**Kitch n Break — Projektüberblick für Laien**

- **Ziel:** Kurze, verständliche Präsentation über den Code, die Architektur und wie die Web‑App funktioniert. Geeignet für Dozenten oder Nicht‑Programmierer.
- **Dauer:** ~5–10 Minuten beim Vortrag.

---

**1) Was ist Kitch n Break?**

- Eine kleine Web‑App zum Entdecken, Erstellen und Verwalten von Kochrezepten.
- Kernfunktionen: Benutzeranmeldung (E‑Mail + Google), Rezepte ansehen/erstellen/bearbeiten/löschen, Favoriten, Bewertungen und Bild‑Uploads.

---

**2) Für wen ist die App gedacht?**

- Studierende, Hobbyköche und Lehrende, die Rezepte sammeln, teilen oder prototypisch testen möchten.
- Der Dozent kann die Architektur, die Firebase‑Integration und die UI/UX prüfen.

---

**3) Kurzüberblick über die Technik (in einfachen Worten)**

- Frontend: Eine Single‑Page‑Webseite gebaut mit React (eine verbreitete JavaScript‑Bibliothek für Webseiten).
- Daten & Authentifizierung: Firebase — verwaltet Benutzer, Datenbank (Cloud Firestore) und Dateispeicher (Bilder).
- Hosting: Die Seite ist live auf Firebase Hosting (URL wird gezeigt).

---

**4) Wichtige Konzepte (leicht erklärt)**

- Komponenten: Kleine Bausteine der Webseite (z. B. `Navbar`, `RecipeCard`) — wie Lego‑Steine.
- Seiten: Zusammensetzung von Komponenten zu Ansichten (z. B. `Home`, `Dashboard`, `RecipeDetails`).
- Services: Code, der mit der Datenbank spricht (z. B. `services/recipes.js` für Rezepte, `services/users.js` für Nutzerdaten).
- Routing: Wechsel zwischen Seiten ohne die Seite neu zu laden (React Router).

---

**5) Wichtige Dateien (kurze Erklärung)**

- `src/App.jsx` — Hauptsteuerung: definiert die Seitenrouten (welche Seite bei welcher URL gezeigt wird).
- `src/pages/Login.jsx` — Anmelde‑ und Registrierungsformular (inkl. Google‑Anmeldung).
- `src/pages/Home.jsx` — Startseite mit Rezeptliste und Suche.
- `src/pages/RecipeDetails.jsx` — Detailansicht für ein Rezept, hier sind jetzt auch Bewertungen möglich.
- `src/components/RecipeCard.jsx` — Darstellung einzelner Rezept‑Karten in der Liste.
- `src/services/recipes.js` — Funktionen, die Rezepte in die Datenbank schreiben/lesen; hier wurden auch Review‑Funktionen ergänzt.
- `src/firebase.js` — Verbindungsdaten zu Firebase (Projekt‑Konfiguration). Diese Datei enthält keine geheimen Schlüssel (nur öffentliche API‑Konfig).
- `src/data/recipes.js` — Beispieldaten, die lokal gebündelt sind, wenn die Datenbank nicht erreichbar ist.

---

**6) Was passiert beim Anmelden mit Google? (vereinfachte Abläufe)**

1. Der Benutzer klickt "Mit Google anmelden".
2. Die App fragt Google, ob die Anmeldung erlaubt ist.
3. Google bestätigt und gibt der App eine Identität des Benutzers.
4. Die App speichert Basisdaten (Name, E‑Mail) in der Firestore‑Datenbank.

Hinweis: Domains und OAuth‑Einstellungen in der Firebase‑Konsole müssen freigeschaltet sein (wurde gemacht).

---

**7) Bewertungen & Reviews (Was wurde ergänzt)**

- Bewertungen werden in einer Unterkollektion `recipes/{id}/reviews` gespeichert.
- Jede Bewertung enthält: `userId`, `displayName`, `rating` (1–5), `text`, `createdAt`.
- In der `RecipeDetails`‑Seite kann man Bewertungen anschauen und neue Bewertungen absenden (angemeldet erforderlich).

---

**8) Hinweise zur Bedienung (Kurzdemo‑Ablauf)**

1. Öffnen: https://kitch-n-break-34666.web.app
2. Anmelden / Registrieren (E‑Mail oder „Mit Google anmelden").
3. Auf "Rezept erstellen" klicken, Bild hochladen, Beschreibung und Schritte ausfüllen.
4. In der Rezeptdetail‑Ansicht Sterne vergeben und kurze Bewertung schreiben.

---

**9) Wie man die App lokal startet (für technikinteressierte Dozenten)**

1. Repository klonen / in das Projektverzeichnis wechseln.
2. Node.js & npm installiert haben.
3. Installieren: `npm install`
4. Entwicklung starten: `npm run dev` (öffnet `http://localhost:5176`)
5. Produktion bauen: `npm run build`
6. Deployment (Firebase): `npx firebase deploy --only hosting:<projekt>` (mit gültigem Token/Account)

---

**10) Sicherheit & Datenschutz (einfach erklärt)**

- Firestore‑Regeln wurden vorbereitet: nur angemeldete Nutzer dürfen schreiben; Nutzer dürfen nur ihre eigenen Rezepte ändern/löschen (Empfehlung — bitte prüfen und veröffentlichen).
- Bild‑Uploads gehen in Firebase Storage (ebenfalls sicher, kann öffentlich oder geschützt gemacht werden).
- In einem realen Einsatz: OAuth‑Client und Sensitive API‑Keys zentral und sicher verwalten.

---

**11) Bekannte Einschränkungen / To‑Dos**

- Einige Bilder stammen aus externen Bildquellen (Unsplash) — für Produktion bitte eigene Bilder oder lizenzierte Quellen verwenden.
- Firestore‑Regeln müssen manuell deployed/aktiviert werden (Konsolen‑Schritt oder `firebase deploy --only firestore:rules`).
- Noch offen: GitHub‑Push (Repo veröffentlichen), erweiterte Tests, mehr UI‑Polish.

---

**12) Nützliche Pfade im Projekt (für Review)**

- `src/firebase.js` — Firebase‑Konfiguration
- `src/services/recipes.js` — Rezept‑API + Reviews
- `src/pages/RecipeDetails.jsx` — Anzeige + Review‑Formular
- `src/pages/Home.jsx` — Startseite + Suche
- `src/data/recipes.js` — Beispieldaten

---

Wenn Sie möchten, kann ich diese Präsentation:

- Als PDF exportieren (zum Ausdrucken / Einreichen),
- In eine PowerPoint/Google Slides Datei konvertieren, oder
- Für eine Live‑Demo vorbereiten (Skript + Screenshots).

Sagen Sie mir kurz, welches Format Sie bevorzugen (PDF / PPTX / Slides), und ich erstelle es.

*** Ende der Präsentation ***
