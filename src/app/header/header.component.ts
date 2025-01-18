import { Component } from '@angular/core';
import { QuestionComponent } from "../question/question.component";

@Component({
  selector: 'app-header',
  imports: [QuestionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isGameStarted = false;
  
  startGame() {
    this.isGameStarted = true;
    console.log('Game started');
  }
}
