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


}
