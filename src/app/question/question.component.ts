import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  // this is where the questions and answers will be stored
  // i want objects for individual grade questions and answers like 5 for 1st, 5 for 2nd, 5 for 3rd, 5 for 4th, 5 for 5th
  // The final 6th grade question will come from an API call
  //
  // 1st question will be a random question from 1st grade
  // 2nd question will be a random question from 2nd grade etc through 5th grade
  // 6th question will be from the API

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
