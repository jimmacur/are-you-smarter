import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {ResponseModalComponent} from '../response-modal/response-modal.component';

@Component({
  selector: 'app-question',
  imports: [NgFor, ResponseModalComponent],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  // State

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
      case 1: return { questionPool: this.firstGradeQuestions, gradeLevel: '1st' };
      case 2: return { questionPool: this.secondGradeQuestions, gradeLevel: '2nd' };
      case 3: return { questionPool: this.thirdGradeQuestions, gradeLevel: '3rd' };
      case 4: return { questionPool: this.fourthGradeQuestions, gradeLevel: '4th' };
      case 5: return { questionPool: this.fifthGradeQuestions, gradeLevel: '5th' };
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
      if (this.questionCount === 6) {
        this.modalTitle = 'You Win!!!';
        this.modalMessage = 'Congratulations, you are smarter than a 6th grader!';
        this.isGameComplete = true;
        this.showModal = true;
      } else {
        this.modalTitle = 'Correct!!!';
        this.modalMessage = this.currentQuestion.statement;
        this.showModal = true;
        this.questionCount++;
      }
    } else {
      this.modalTitle = 'Incorrect!!!';
      this.modalMessage = `The correct answer was: ${this.currentQuestion.correctAnswer}.`;
    
      if (this.currentQuestion.statement) {
        this.modalMessage += ` ${this.currentQuestion.statement}`;
      }
    
      this.showModal = true;
    }

    this.selectedAnswer = null;
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
  }

  // Data

  firstGradeQuestions = [
    {
      question: "What do plants need to make food?",
      correctAnswer: "Sunlight",
      incorrectAnswers: ["Water", "Soil", "Air"],
      statement: "Plants need sunlight to make food through a process called photosynthesis."
    },
    {
      question: "What is 5 + 3?",
      correctAnswer: "8",
      incorrectAnswers: ["6", "7", "9"],
      statement: "The sum of 5 and 3 is 8."
    },
    {
      question: "Which planet is known as the Red Planet?",
      correctAnswer: "Mars",
      incorrectAnswers: ["Earth", "Jupiter", "Venus"],
      statement: "Mars is called the Red Planet because of its reddish appearance."
    },
    {
      question: "What is the tallest animal in the world?",
      correctAnswer: "Giraffe",
      incorrectAnswers: ["Elephant", "Lion", "Kangaroo"],
      statement: "The giraffe is the tallest animal in the world, with its long neck helping it reach leaves on tall trees."
    },
    {
      question: "How many legs does a spider have?",
      correctAnswer: "8",
      incorrectAnswers: ["6", "10", "12"],
      statement: "Spiders have 8 legs, which help them move and catch prey."
    }
  ];

  secondGradeQuestions = [
    {
      question: "How many hours are there in a day?",
      correctAnswer: "24",
      incorrectAnswers: ["12", "30", "48"],
      statement: "There are 24 hours in a day, divided equally between day and night."
    },
    {
      question: "What is 10 + 5?",
      correctAnswer: "15",
      incorrectAnswers: ["12", "13", "17"],
      statement: "The sum of 10 and 5 is 15."
    },
    {
      question: "What is the largest mammal in the world?",
      correctAnswer: "Blue Whale",
      incorrectAnswers: ["Elephant", "Giraffe", "Hippopotamus"],
      statement: "The Blue Whale is the largest mammal in the world, growing up to 100 feet long."
    },
    {
      question: "What is the fastest land animal?",
      correctAnswer: "Cheetah",
      incorrectAnswers: ["Lion", "Tiger", "Leopard"],
      statement: "The cheetah is the fastest land animal, capable of running up to 70 miles per hour."
    },
    {
      question: "What is the largest planet in our solar system?",
      correctAnswer: "Jupiter",
      incorrectAnswers: ["Saturn", "Mars", "Earth"],
      statement: "Jupiter is the largest planet in our solar system, known for its massive size and red spot."
    }
  ];

  thirdGradeQuestions = [
    {
      question: "What is the name of the process by which plants make their own food?",
      correctAnswer: "Photosynthesis",
      incorrectAnswers: ["Respiration", "Evaporation", "Condensation"],
      statement: "Photosynthesis is the process by which plants use sunlight to make their own food."
    },
    {
      question: "What is 7 x 8?",
      correctAnswer: "56",
      incorrectAnswers: ["54", "64", "48"],
      statement: "The product of 7 and 8 is 56."
    },
    {
      question: "What is the longest river in the world?",
      correctAnswer: "Nile",
      incorrectAnswers: ["Amazon", "Mississippi", "Yangtze"],
      statement: "The Nile River is the longest river in the world, stretching over 4,100 miles."
    },
    {
      question: "Which part of the human body pumps blood?",
      correctAnswer: "Heart",
      incorrectAnswers: ["Lungs", "Stomach", "Brain"],
      statement: "The heart pumps blood throughout the body, supplying oxygen and nutrients to tissues."
    },
    {
      question: "Who is the author of 'Charlotte's Web'?",
      correctAnswer: "E.B. White",
      incorrectAnswers: ["Dr. Seuss", "Roald Dahl", "Beverly Cleary"],
      statement: "E.B. White is the author of 'Charlotte's Web,' a beloved children's classic."
    }
  ];

  fourthGradeQuestions = [
    {
      question: "What is the name of the largest ocean on Earth?",
      correctAnswer: "Pacific",
      incorrectAnswers: ["Atlantic", "Indian", "Arctic"],
      statement: "The Pacific Ocean is the largest ocean on Earth, covering more than 63 million square miles."
    },
    {
      question: "What is 9 x 7?",
      correctAnswer: "63",
      incorrectAnswers: ["54", "72", "81"],
      statement: "The product of 9 and 7 is 63."
    },
    {
      question: "What is the capital of France?",
      correctAnswer: "Paris",
      incorrectAnswers: ["London", "Berlin", "Rome"],
      statement: "Paris is the capital of France and is known as the 'City of Light.'"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      correctAnswer: "Diamond",
      incorrectAnswers: ["Gold", "Platinum", "Silver"],
      statement: "Diamond is the hardest natural substance on Earth, often used in cutting tools and jewelry."
    },
    {
      question: "What is the largest desert in the world?",
      correctAnswer: "Antarctica",
      incorrectAnswers: ["Sahara", "Arabian", "Gobi"],
      statement: "Antarctica is the largest desert in the world because of its extremely low precipitation levels."
    }
  ];

  fifthGradeQuestions = [
    {
      question: "What is the name of the largest rainforest in the world?",
      correctAnswer: "Amazon",
      incorrectAnswers: ["Congo", "Daintree", "Taiga"],
      statement: "The Amazon Rainforest is the largest rainforest in the world, covering much of South America."
    },
    {
      question: "What is the largest ocean on Earth?",
      correctAnswer: "Pacific",
      incorrectAnswers: ["Atlantic", "Indian", "Arctic"],
      statement: "The Pacific Ocean is the largest ocean on Earth, covering more than 63 million square miles."
    },
    {
      question: "What is the largest country in the world by land area?",
      correctAnswer: "Russia",
      incorrectAnswers: ["Canada", "China", "United States"],
      statement: "Russia is the largest country in the world by land area, spanning over 17 million square kilometers."
    },
    {
      question: "What is the largest organ in the human body?",
      correctAnswer: "Skin",
      incorrectAnswers: ["Liver", "Heart", "Lungs"],
      statement: "The skin is the largest organ in the human body, providing protection and regulating temperature."
    },
    {
      question: "Which planet is known as the 'Gas Giant'?",
      correctAnswer: "Jupiter",
      incorrectAnswers: ["Saturn", "Neptune", "Uranus"],
      statement: "Jupiter is known as a 'Gas Giant' due to its large size and composition of mostly hydrogen and helium."
    }
  ];
}
