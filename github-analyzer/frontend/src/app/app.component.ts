import { Component } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {
  githubUsername = '';
  data: any;
  error = '';

  constructor(private githubService: GithubService) {}

  search() {
    /**
     * TODO: call backend, handle logic
     */
    this.error = '';
    this.data = null;

    this.githubService.getUser(this.githubUsername).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        this.error = err.error?.detail || 'Something went wrong.';
      },
    });
  }
}
