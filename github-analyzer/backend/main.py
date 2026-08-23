from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from github_api import get_user_data, get_user_repos
from github_user import GitHubUser


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/user")
def get_user(username: str):
    """
    TODO:
    add logic here adn return meaningful response
    """
    user_data = get_user_data(username)
    print(user_data)
    if user_data is None:
        raise HTTPException(status_code=404, detail=f"User '{username}' does not exist.")


    return {"message": user_data}