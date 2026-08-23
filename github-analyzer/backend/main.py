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
    Return the github user dara
    """
    user_data = get_user_data(username)
    print(user_data)
    if user_data is None:
        raise HTTPException(status_code=404, detail=f"User '{username}' does not exist.")

    """
    Return the github user repos
    """
    repos = get_user_repos(username) or []

    """
    The github user in a more usable format
    """
    user = GitHubUser(
        username=username,
        followers=user_data.get("followers", 0),
        repos=repos,
    )

    return user.to_json()