# CV-lista – Frontend (Moment 3.2 Steg 2)

Webbapplikationen är byggd med **Vite + TypeScript**, och kommunicerar med ett REST API som hanterar en MongoDB-databas.

---

## Publicerad version

Webbplatsen är publicerad på **Netlify** och fungerar fristående från backend-API:et som är hostat på **Render**.  
Eftersom API:et ligger på Render och databasen i MongoDB Atlas, behöver man ibland öppna API-länken manuellt först för att “väcka” Render innan Fetch-anropen kan fungera.

- [**Netlify** (frontend):](https://backend-moment32.netlify.app/)
- [**Render** (backend):](https://backend-moment3-1.onrender.com/api/experience)

---

## Funktionalitet

Webbapplikationen är ett CV-system som kommunicerar med ett REST API som i sin tur är kopplat till en NoSQL-databas (MongoDB Atlas).  
Syftet är att skapa, läsa, uppdatera och radera arbetslivserfarenheter med fält som: företagsnamn, arbetsuppgift, plats, inledningsdatum, avgångsdatum och beskrivning.

Frontend är byggd med **Vite + TypeScript**, och använder Fetch API för att göra anrop till backend.  
Användargränssnittet är uppdelat i separata sidor:
- **Startsidan (`index.html`)** visar alla poster (GET) + raderar poster (DELETE) i en tabell.
- **Lägg till-sidan (`add.html`)** innehåller ett formulär där användaren kan skapa en ny post (POST).
- **Redigera-sidan (`edit.html`)** öppnas via en länk från tabellen på startsidan och visar ett ifyllt formulär för uppdatering. Redigera befintlig post med formulär (GET + PUT)
- **Om-sidan (`about.html`)** beskriver lösningen och reflektioner från arbetet.

Funktioner som DELETE och PUT sker direkt från knappar på startsidan eller via länken till `edit.html`.

---
## Felhantering & Slutsats

Applikationen innehåller grundläggande validering både i frontend och backend.  
Frontend visar felmeddelanden vid:
- Tomma obligatoriska fält
- Misslyckade anrop till API:t (t.ex. om servern inte är aktiv)

Alla formulärfält är kontrollerade innan något skickas, och användaren får tydlig feedback direkt på sidan.  
Lyckade åtgärder bekräftas med gröna popup-rutor.

Att arbeta med Vite + TypeScript och Mongoose har visat sig vara ett väldigt effektivt sätt att bygga en modern CRUD-applikation.  
Jag har lärt mig att strukturera kod för återanvändning (t.ex. `edit.ts` och `add.ts`), hantera URL-parametrar för redigering, och bygga en responsiv och tydlig UI.  
Jämfört med relationsdatabasen i tidigare moment var det enklare att komma igång med MongoDB, och det var särskilt smidigt att använda Mongoose för att definiera modeller och validering.
