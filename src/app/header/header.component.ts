import { Component } from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf, QuestionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isGameStarted = false;
  isQuestionAnswered = false;
  
  startGame() {
    this.isGameStarted = true;
    console.log('Game started');
  }
}
