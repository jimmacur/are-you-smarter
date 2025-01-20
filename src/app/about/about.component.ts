import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <main class="about">
      <div class="background">
        <h1>How to Play</h1>
        <div class="instructions">
          <ul>
            <li>Answer questions of increasing difficulty, starting from 1st grade and progressing to 6th grade.</li>
            <li>Each correct answer earns you points and gets you closer to the final challenge..</li>
            <li>If you answer incorrectly, the game ends, and you'll have to start over.</li>
            <li>The final 6th-grade question is the ultimate challenge—can you ace it?</li>
          </ul>
        </div>
        <button class="about-button" (click)="goHome()">Home</button>
      </div>
    </main>
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
