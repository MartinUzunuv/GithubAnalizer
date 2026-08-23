from collections import Counter

class GitHubUser:
    def __init__(self, username, followers=0, repos=None):
        self.username = username
        self.followers = followers
        self.repos = repos or []

    @property
    def languages(self):
        return [repo["language"] for repo in self.repos if repo.get("language")]

    def get_most_used_language(self):
        """
        Return the most used language from all of the user's repos,
        or none if no repo has language information
        """
        if not self.languages:
            return None
        return Counter(self.languages).most_common(1)[0][0]

    def get_all_languages(self):
        """
        Return the properly sorted list of all technologies used across repos
        """
        return sorted(set(self.languages))

    def get_followers_message(self):
        return None if self.followers else f"{self.username} has no followers yet."

    def get_repos_message(self):
        return None if self.repos else f"{self.username} has no public repositories."

    def to_json(self):
        return {
            "username": self.username,
            "followers": self.followers,
            "followers_message": self.get_followers_message(),
            "repos": [repo["name"] for repo in self.repos],
            "repos_message": self.get_repos_message(),
            "most_used_language": self.get_most_used_language(),
            "all_languages": self.get_all_languages(),
        }