import { Component } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  githubUsername = '';
  data: any;
  error = '';
  loading = false;

  constructor(private githubService: GithubService) {}

  search() {
    /**
     * Calls backend, handles logic
     */
    this.error = '';
    this.data = null;

    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username.';
      return;
    }

    this.loading = true;

    this.githubService.getUser(this.githubUsername).subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.detail || 'Something went wrong.';
        this.loading = false;
      },
    });
  }
}
