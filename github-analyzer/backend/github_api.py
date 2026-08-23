import requests


BASE_URL = "https://api.github.com"


def get_user_data(username):
    """
    Calls the GitHub API and returns a dict with data or None
    """
    response = requests.get(f"{BASE_URL}/users/{username}")
    if response.status_code != 200:
        return None
    return response.json()


def get_user_repos(username):
    """
    Calls the GitHub API and returns a list of dicts(repos name, language/technology) with data or None
    """
    response = requests.get(
        f"{BASE_URL}/users/{username}/repos",
        params={"per_page": 100},
    )
    if response.status_code != 200:
        return None

    return [
        {"name": repo["name"], "language": repo.get("language")}
        for repo in response.json()
    ]