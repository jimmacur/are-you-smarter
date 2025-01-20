import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResponseModalComponent } from '../response-modal/response-modal.component';
import { TotalWinningsComponent } from '../total-winnings/total-winnings.component';
import { firstGradeQuestions, secondGradeQuestions, thirdGradeQuestions, fourthGradeQuestions, fifthGradeQuestions } from '../shared/question-pools';

@Component({
  selector: 'app-question',
  imports: [NgFor, ResponseModalComponent, TotalWinningsComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  // State
  currentWinnings = 0;
  questionCount = 1;
  isQuestionAnswered = false;
  currentQuestion: any;
  shuffledAnswers: string[] = [];
  selectedAnswer: string | null = null;
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  isGameComplete = false;
  headerText = 'Are you smarter than a 1st grader?';
  apiUrl = 'https://opentdb.com/api.php?amount=1&category=27&difficulty=medium&type=multiple'

  constructor(private http: HttpClient) {}

  // Methods

  updateWinnings(amount: number) {
    this.currentWinnings = amount;
  }

  ngOnInit() {
    this.getQuestion();
  }

  decodeHtmlEntities(encodedString: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  getQuestion() {
    if (this.questionCount === 6) {
      this.handleFinalQuestion();
    } else {
      this.handleGradeLevelQuestion();
    }
  }

  private handleFinalQuestion() {
    this.headerText = 'Are you smarter than a 6th grader?';
  
    this.http.get<any>(this.apiUrl).subscribe((response) => {
      const apiQuestion = response.results[0];
  
      this.currentQuestion = this.createQuestionObject(apiQuestion);
      this.shuffledAnswers = this.shuffle([
        this.currentQuestion.correctAnswer,
        ...this.currentQuestion.incorrectAnswers,
      ]);
    });
  }
  
  private handleGradeLevelQuestion() {
    const { questionPool, gradeLevel } = this.getQuestionPoolAndGradeLevel();
    
    if (!questionPool.length) {
      console.log('No more questions.');
      return;
    }
  
    this.headerText = `Are you smarter than a ${gradeLevel} grader?`;
  
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    this.currentQuestion = questionPool[randomIndex];
  
    this.shuffledAnswers = this.shuffle([
      this.currentQuestion.correctAnswer,
      ...this.currentQuestion.incorrectAnswers,
    ]);
  }
  
  private getQuestionPoolAndGradeLevel() {
    switch (this.questionCount) {
      case 1: return { questionPool: firstGradeQuestions, gradeLevel: '1st' };
      case 2: return { questionPool: secondGradeQuestions, gradeLevel: '2nd' };
      case 3: return { questionPool: thirdGradeQuestions, gradeLevel: '3rd' };
      case 4: return { questionPool: fourthGradeQuestions, gradeLevel: '4th' };
      case 5: return { questionPool: fifthGradeQuestions, gradeLevel: '5th' };
      default: return { questionPool: [], gradeLevel: '' };
    }
  }

  private createQuestionObject(apiQuestion: any) {
    return {
      question: this.decodeHtmlEntities(apiQuestion.question),
      correctAnswer: this.decodeHtmlEntities(apiQuestion.correct_answer),
      incorrectAnswers: apiQuestion.incorrect_answers.map((answer: string) =>
        this.decodeHtmlEntities(answer)
      ),
    };
  }

  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // 
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  checkAnswer() {
    if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  
    this.selectedAnswer = null;
  }

  private handleCorrectAnswer() {
    const winnings = this.calculateWinnings(this.questionCount);
    this.updateWinnings(winnings);
    
    if (this.questionCount === 6) {
      this.modalTitle = 'You Win!!!';
      this.modalMessage = `Congratulations, you are smarter than a 6th grader!<br>Your total winnings are $${this.currentWinnings}.`;
      this.isGameComplete = true;
    } else {
      this.modalTitle = 'Correct!!!';
      this.modalMessage = this.currentQuestion.statement + `<br>You have won $${this.currentWinnings} so far.`;
      this.questionCount++;
    }
    this.showModal = true;
  }

  private calculateWinnings(grade: number): number {
    switch (grade) {
      case 1: return 100;
      case 2: return 250;
      case 3: return 500;
      case 4: return 1000;
      case 5: return 5000;
      case 6: return 10000;
      default: return 0;
    }
  }
  
  private handleIncorrectAnswer() {
    this.modalTitle = 'Incorrect!!!';
    this.modalMessage = `The correct answer was: ${this.currentQuestion.correctAnswer}.` + `<br>You won $${this.currentWinnings}.`;
    if (this.currentQuestion.statement) {
      this.modalMessage += ` ${this.currentQuestion.statement}` + `<br>You won $${this.currentWinnings}.`;
    }
    this.showModal = true;
  }

  nextQuestion() {
    this.showModal = false;
    this.getQuestion();
  }

  resetGame() {
    this.showModal = false;
    this.questionCount = 1;
    this.isGameComplete = false;
    this.getQuestion();
    this.updateWinnings(0);
  }
}
