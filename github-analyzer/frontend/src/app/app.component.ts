import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';

const HISTORY_KEY = 'gh-search-history';
const MAX_HISTORY = 10;

interface HistoryEntry {
  username: string;
  followers: number;
  mostUsedLanguage: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  githubUsername = '';
  data: any;
  error = '';
  loading = false;
  history: HistoryEntry[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    const saved = localStorage.getItem(HISTORY_KEY);
    this.history = saved ? JSON.parse(saved) : [];
  }

  search() {
    this.error = '';
    this.data = null;

    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username.';
      return;
    }

    this.loading = true;

    this.githubService.getUser(this.githubUsername).subscribe({
      next: (response: any) => {
        this.data = response;
        this.loading = false;
        this.addToHistory(response);
      },
      error: (err) => {
        this.error = err.error?.detail || 'Something went wrong.';
        this.loading = false;
      },
    });
  }

  selectFromHistory(entry: HistoryEntry) {
    this.githubUsername = entry.username;
    this.search();
  }

  private addToHistory(user: any) {
    const entry: HistoryEntry = {
      username: user.username,
      followers: user.followers,
      mostUsedLanguage: user.most_used_language,
    };
    this.history = [
      entry,
      ...this.history.filter(h => h.username.toLowerCase() !== entry.username.toLowerCase()),
    ].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
  }
}
