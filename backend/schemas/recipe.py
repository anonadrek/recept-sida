from pydantic import BaseModel
from typing import Optional

class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None
    ingredients: str
    instructions: str
    cooking_time: Optional[int] = None

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(RecipeBase):
    pass

class RecipeOut(RecipeBase):
    id: int

    class Config:
        from_attributes = True
