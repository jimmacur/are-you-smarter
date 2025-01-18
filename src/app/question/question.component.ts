import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-question',
  imports: [NgFor],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  // at this point i am getting a random 1st grade question and the answers are shuffled
  // they are being displayed on the screen
  // i need to make them be selectable on click
  // then I want a separate button to click submit so it is not too easy to accidentally submit
  // then I want to check if the answer is correct
  // then I want to display a message if the answer is correct or incorrect
  // then I want to display the next question if they got it right
  // if they got it wrong, I want to display the correct answer, tell them the game is over and ask if they want to play again
  // if they want to play again, I want to reset the game and start over



  questionCount = 1;
  currentQuestion: any;
  shuffledAnswers: string[] = [];

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion() {
    let questionPool = [];

    switch (this.questionCount) {
      case 1:
        questionPool = this.firstGradeQuestions;
        break;
      case 2:
        questionPool = this.secondGradeQuestions;
        break;
      case 3:
        questionPool = this.thirdGradeQuestions;
        break;
      case 4:
        questionPool = this.fourthGradeQuestions;
        break;
      case 5:
        questionPool = this.fifthGradeQuestions;
        break;
      default:
        console.log("No more questions.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * questionPool.length);
    this.currentQuestion = questionPool[randomIndex];
    console.log("current question:", this.currentQuestion);

    this.shuffledAnswers = this.shuffle([
      this.currentQuestion.correctAnswer,
      ...this.currentQuestion.incorrectAnswers
    ]);
    console.log("Shuffled Answers:", this.shuffledAnswers);
  }

  // getAnswers() {
  //   console.log("Incorrect Answers:", this.currentQuestion.incorrectAnswers);
    
  //   const answers = [
  //     this.currentQuestion.correctAnswer,
  //     ...this.currentQuestion.incorrectAnswers
  //   ];

  //   return this.shuffle(answers);
  // }

  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // 
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  firstGradeQuestions = [
    {
      question: "What do plants need to make food?",
      correctAnswer: "Sunlight",
      incorrectAnswers: ["Water", "Soil", "Air"]
    },
    {
      question: "What is 5 + 3?",
      correctAnswer: "8",
      incorrectAnswers: ["6", "7", "9"]
    },
    {
      question: "Which planet is known as the Red Planet?",
      correctAnswer: "Mars",
      incorrectAnswers: ["Earth", "Jupiter", "Venus"]
    },
    {
      question: "What is the tallest animal in the world?",
      correctAnswer: "Giraffe",
      incorrectAnswers: ["Elephant", "Lion", "Kangaroo"]
    },
    {
      question: "How many legs does a spider have?",
      correctAnswer: "8",
      incorrectAnswers: ["6", "10", "12"]
    }
  ];

  secondGradeQuestions = [
    {
      question: "How many hours are there in a day?",
      correctAnswer: "24",
      incorrectAnswers: ["12", "30", "48"]
    },
    {
      question: "What is 10 + 5?",
      correctAnswer: "15",
      incorrectAnswers: ["12", "13", "17"]
    },
    {
      question: "What is the largest mammal in the world?",
      correctAnswer: "Blue Whale",
      incorrectAnswers: ["Elephant", "Giraffe", "Hippopotamus"]
    },
    {
      question: "What is the fastest land animal?",
      correctAnswer: "Cheetah",
      incorrectAnswers: ["Lion", "Tiger", "Leopard"]
    },
    {
      question: "What is the largest planet in our solar system?",
      correctAnswer: "Jupiter",
      incorrectAnswers: ["Saturn", "Mars", "Earth"]
    }
  ];

  thirdGradeQuestions = [
    {
      question: "What is the name of the process by which plants make their own food?",
      correctAnswer: "Photosynthesis",
      incorrectAnswers: ["Respiration", "Evaporation", "Condensation"]
    },
    {
      question: "What is 7 x 8?",
      correctAnswer: "56",
      incorrectAnswers: ["54", "64", "48"]
    },
    {
      question: "What is the longest river in the world?",
      correctAnswer: "Nile",
      incorrectAnswers: ["Amazon", "Mississippi", "Yangtze"]
    },
    {
      question: "Which part of the human body pumps blood?",
      correctAnswer: "Heart",
      incorrectAnswers: ["Lungs", "Stomach", "Brain"]
    },
    {
      question: "Who is the author of 'Charlotte's Web'?",
      correctAnswer: "E.B. White",
      incorrectAnswers: ["Dr. Seuss", "Roald Dahl", "Beverly Cleary"]
    }
  ];

  fourthGradeQuestions = [
    {
      question: "What is the name of the largest ocean on Earth?",
      correctAnswer: "Pacific",
      incorrectAnswers: ["Atlantic", "Indian", "Arctic"]
    },
    {
      question: "What is 9 x 7?",
      correctAnswer: "63",
      incorrectAnswers: ["54", "72", "81"]
    },
    {
      question: "What is the capital of France?",
      correctAnswer: "Paris",
      incorrectAnswers: ["London", "Berlin", "Rome"]
    },
    {
      question: "What is the hardest natural substance on Earth?",
      correctAnswer: "Diamond",
      incorrectAnswers: ["Gold", "Platinum", "Silver"]
    },
    {
      question: "What is the largest desert in the world?",
      correctAnswer: "Antarctica",
      incorrectAnswers: ["Sahara", "Arabian", "Gobi"]
    }
  ];

  fifthGradeQuestions = [
    {
      question: "What is the name of the largest rainforest in the world?",
      correctAnswer: "Amazon",
      incorrectAnswers: ["Congo", "Daintree", "Taiga"]
    },
    {
      question: "What is the largest ocean on Earth?",
      correctAnswer: "Pacific",
      incorrectAnswers: ["Atlantic", "Indian", "Arctic"]
    },
    {
      question: "What is the largest country in the world by land area?",
      correctAnswer: "Russia",
      incorrectAnswers: ["Canada", "China", "United States"]
    },
    {
      question: "What is the largest organ in the human body?",
      correctAnswer: "Skin",
      incorrectAnswers: ["Liver", "Heart", "Lungs"]
    },
    {
      question: "Which planet is known as the 'Gas Giant'?",
      correctAnswer: "Jupiter",
      incorrectAnswers: ["Saturn", "Neptune", "Uranus"]
    }
  ];
}
