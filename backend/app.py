from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models.recipe import Base
from routes.recipes import router as recipe_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Recipe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipe_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
