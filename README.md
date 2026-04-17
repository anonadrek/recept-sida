# Receptdatabas
# Albin Abrahamsson

En fullstack-applikation för att hantera recept. Byggd med FastAPI (backend) och React + Vite (frontend).

---

## Starta backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

API körs på: http://localhost:8000  
Interaktiv dokumentation: http://localhost:8000/docs

---

## Starta frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend körs på: http://localhost:5173

---

## Endpoints

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| POST | /recipes | Skapa nytt recept |
| GET | /recipes | Hämta alla recept |
| GET | /recipes/{id} | Hämta ett recept |
| PUT | /recipes/{id} | Uppdatera recept |
| DELETE | /recipes/{id} | Ta bort recept |

---

## Projektstruktur

```
backend/
├── app.py              # FastAPI app, CORS, router registration
├── database.py         # SQLAlchemy engine + session
├── requirements.txt
├── models/
│   └── recipe.py       # SQLAlchemy model
├── schemas/
│   └── recipe.py       # Pydantic schemas (in/out)
└── routes/
    └── recipes.py      # CRUD endpoints

frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx         # Full CRUD UI med Axios
```

---

## Teknisk stack

- **Backend:** FastAPI, SQLAlchemy, Pydantic, SQLite, Uvicorn
- **Frontend:** React 18, Vite, Axios
- **Databas:** SQLite (skapas automatiskt vid start)
